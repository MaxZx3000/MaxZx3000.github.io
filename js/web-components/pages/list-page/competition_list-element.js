import AbstractElement from "../../elements/abstract-element.js";
import CompetitionFetch from "../../../fetch-requests/competition-fetch.js";
import CardElement from "../../elements/card-element.js";
import Size from "../../../data/size.js";
import GridElement from "../../elements/grid-component.js";
import Competition from "../../../data/competition.js";
import LoadingElement from "../../elements/loading-element.js";
import AreaFetch from "../../../fetch-requests/area-fetch.js";
import SelectElement from "../../elements/select-element.js";
import Area from "../../../data/area.js";
import CompetitionsDatabase from "../../../database/db-competitions.js";
import NotificationElement from "../../elements/notification-component.js";
import NoDataElement from "../../elements/no_data-element.js";
import CompetitionsCardElement from "../../template/competitions_card-element.js";

class CompetitionElement extends AbstractElement{
    constructor(){
        super();
        this.headingElement = document.createElement("div");
        this.headingElement.id = "heading";
        this.optionsElement = document.createElement("div");
        this.optionsElement.id = "options";
        this.dataContainerElement = document.createElement("div");
        this.dataContainerElement.id = "data";
        this.gridElement = null;
        this.notificationElement = new NotificationElement("rounded");
        this.competitionLoadingElement = new LoadingElement();
        this.noDataElement = new NoDataElement();
        this.competitionFetch = new CompetitionFetch();
        this.areaFetch = new AreaFetch();
        this.competitionsDatabase = new CompetitionsDatabase();
    }
    renderOptionsPage(){
        let cardElement = new CardElement();
        let loadingElement = new LoadingElement();
        loadingElement.render();
        cardElement.setDataElement((dataElement) => {
            dataElement.appendChild(loadingElement);
        });
        this.areaFetch.getAllAreas()
            .then((json) => {
                let areaDataId = [];
                let areaDataName = [];
                json.areas.forEach((area) => {
                    let areaDatum = new Area();
                    areaDatum.setFromJSON(area);
                    areaDataId.push(areaDatum.id);
                    areaDataName.push(areaDatum.name);
                });
                cardElement.setDataElement((dataElement) => {
                    let optionsHeaderElement = document.createElement("h1");
                    let divContentContainer = document.createElement("div");
                    divContentContainer.id = "content-container";
                    let areaHeaderElement = document.createElement("p");
                    areaHeaderElement.innerText = "Area Select";
                    optionsHeaderElement.innerText = `Options`;
                    let selectElement = new SelectElement(areaDataName, areaDataId, "areas", "selectArea");
                    selectElement.render();
                    
                    dataElement.appendChild(optionsHeaderElement);
                    divContentContainer.appendChild(areaHeaderElement);
                    divContentContainer.appendChild(selectElement);
                    dataElement.appendChild(divContentContainer);
                });
                cardElement.setActionElement((actionElement) => {
                    actionElement.innerHTML = `
                        <div id = "right-position">
                            <button type = "button" class = "btn waves-effect waves-light blue-color" id = "btnSearchNow"><i class = "material-icons left">search</i>Search Now</button>
                            <button type = "button" class = "btn waves-effect waves-light blue-color" id = "btnGetAllCompetitions">See All Competitions</button>
                        </div>
                    `;
                    let getAllCompetitionButton = actionElement.querySelector("#btnGetAllCompetitions");
                    getAllCompetitionButton.addEventListener("click", () => {
                        this.reloadPage();
                    });
                    let searchNowButton = actionElement.querySelector("#btnSearchNow");
                    searchNowButton.addEventListener("click", () => {
                        let areaSelectElement = cardElement.querySelector("select");
                        let areaSelected = areaSelectElement.value;
                        this.reloadPage(`?areas=${areaSelected}`);
                    });
                });
                cardElement.render();
            });
        cardElement.render();
        this.optionsElement.appendChild(cardElement);
    }
    renderLoadingPage(){
        this.competitionLoadingElement.render();
    }
    renderAsync(competitions){
        let cardElements = [];
        competitions.forEach((competition) => {
            let data = new Competition();
            data.setFromJSON(competition);
            let cardElement = new CompetitionsCardElement(data);
            cardElement.setActionElement((actionElement) => {
                actionElement.innerHTML = `
                    <button class = "btn light-blue darken-4 waves-effect waves-light" id = "btnSaveData">Save Data</button>
                `;
                let saveButton = actionElement.querySelector("#btnSaveData");
                saveButton.addEventListener("click", () => {
                    this.competitionsDatabase.addCompetition(competition)
                    .then((resolveMessage) => {
                        this.notificationElement.setContentNotification(`${data.name} (${data.getPlan()}) ${resolveMessage}`);
                        this.notificationElement.render();
                    })
                    .catch((rejectedMessage) => {
                        this.notificationElement.setContentNotification(`${data.name} (${data.getPlan()}) ${rejectedMessage}`);
                        this.notificationElement.render();
                    });
                });
            });
            cardElement.render();
            cardElements.push(cardElement);
        });
        this.gridElement = new GridElement(cardElements);
        let gridSize = new Size(12, 6, 4);
        this.gridElement.setIndividualSize(gridSize);
        this.gridElement.render();
        this.dataContainerElement.appendChild(this.gridElement);
    }
    renderHeadingPage(){
        this.headingElement.innerHTML = `
            <i class = "material-icons">emoji_events</i>
            <h1>Available Competition Lists</h1>
        `;
    }
    renderNoDataElement(){
        this.noDataElement.render();
    }
    reloadPage(parameter=""){
        try{
            this.removeChild(this.noDataElement);
        }
        catch{}
        this.dataContainerElement.textContent = "";
        try{
            this.removeChild(this.gridElement);
        }
        catch{}
        this.appendChild(this.competitionLoadingElement);
        this.gatherData(parameter);
    }
    render(){
        this.renderHeadingPage();
        this.renderOptionsPage();
        this.renderLoadingPage();
        this.renderNoDataElement();
        this.appendChild(this.headingElement);
        this.appendChild(this.optionsElement);
        this.appendChild(this.dataContainerElement);
        this.appendChild(this.competitionLoadingElement);
        this.gatherData();
    }
    gatherData(parameter=""){
        this.competitionFetch.getAllCompetitions(parameter)
            .then((json) => {
                if (JSON.stringify(json.competitions) === "[]"){
                    this.appendChild(this.noDataElement);
                }
                else{
                    this.renderAsync(json.competitions);
                  
                }
            })
            .then(() => {
                this.removeChild(this.competitionLoadingElement);
            })
    }
    connectedCallback(){
        this.render();
    }
}
customElements.define("competition_list-element", CompetitionElement);