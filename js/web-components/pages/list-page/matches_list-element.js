import AbstractElement from "../../elements/abstract-element.js";
import MatchFetch from "../../../fetch-requests/match-fetch.js";
import GridElement from "../../elements/grid-component.js";
import LoadingElement from "../../elements/loading-element.js";
import CardElement from "../../elements/card-element.js";
import Size from "../../../data/size.js";
import Match from "../../../data/match.js";
import CustomElement from "../../elements/custom-element.js";
import Formatter from "../../../formatter/formatter.js";
import NoDataElement from "../../elements/no_data-element.js";
import MatchesCardElement from "../../template/matches_card-element.js";
import NotificationElement from "../../elements/notification-component.js";

class MatchListElement extends AbstractElement{
    constructor(){
        super();
        this.matchFetch = new MatchFetch();
        this.headingElement = document.createElement("div");
        this.headingElement.id = "heading";
        this.optionsElement = document.createElement("div");
        this.optionsElement.id = "options";
        this.dataContainerElement = document.createElement("div");
        this.dataContainerElement.id = "data";
        this.notificationElement = new NotificationElement("rounded");
        this.loadingElement = new LoadingElement();
        this.noDataElement = new NoDataElement();
    }
    renderHeadingElement(){
        let headerElement = document.createElement("h1");
        headerElement.innerHTML = `Matches`;
        this.headingElement.appendChild(headerElement);
        this.appendChild(this.headingElement);
    }
    renderOptionsElement(){
        let cardElement = new CardElement();
        cardElement.setDataElement((dataElement) => {
            dataElement.innerHTML = `
                <h1>Options</h1>
            `;
            let divContentContainer = document.createElement("div");
            divContentContainer.id = "content-container";
            
            let startDateCustomElement = new CustomElement();
            startDateCustomElement.setElementRender(() => {
                let divStartDateElement = document.createElement("div");
                divStartDateElement.innerHTML = `
                    <p>Start Date</p>
                    <input type = "date" id = "startDatePicker">
                `;
                let datePicker = divStartDateElement.querySelector("#startDatePicker");
                let formatter = new Formatter();
                let todayDate = formatter.getYYYYMMDDString(new Date().toString());
                datePicker.defaultValue = todayDate;
                return divStartDateElement;
            });
            let endDateCustomElement = new CustomElement();
            endDateCustomElement.setElementRender(() => {
                let divEndDateElement = document.createElement("div");
                divEndDateElement.innerHTML = `
                    <p>End Date Range</p>
                    <input type = "number" min="1" max="30" id = "txtRange">
                `;
                let rangeElement = divEndDateElement.querySelector("#txtRange");
                rangeElement.defaultValue = 0;
                return divEndDateElement;
            });
            let elements = [startDateCustomElement, endDateCustomElement];
            let gridElement = new GridElement(elements);
            let gridSize = new Size(12, 6, 6);
            gridElement.setIndividualSize(gridSize);
            gridElement.render();
            divContentContainer.appendChild(gridElement);
            dataElement.appendChild(divContentContainer);
        });
        cardElement.setActionElement((actionElement) => {
            actionElement.innerHTML = `
                <div id = "right-position">
                    <button type = "button" class = "btn waves-effect waves-light" id = "btnSearchNow"><i class = "material-icons left">search</i>Search Now!</button>
                    <button type = "button" class = "btn waves-effect waves-light" id = "btnGetTodayMatch">Get Today's Match!</button>
                </div>
            `;
            let btnSearchNow = actionElement.querySelector("#btnSearchNow");
            btnSearchNow.addEventListener("click", () => {
                let formatter = new Formatter();
                let startDate = this.querySelector("#startDatePicker").value;
                let range = parseInt(this.querySelector("#txtRange").value);
                if (!(range >= 0 && range <= 10)){
                    this.notificationElement.setContentNotification("Range must be between 0 and 10 days!");
                    this.notificationElement.render();
                    return;
                }
                let formattedStartDate = formatter.getYYYYMMDDString(startDate);
                let formattedEndDate = formatter.getYYYYMMDDString(formatter.getAddedDateString(startDate, parseInt(range)));
                let parameter = `?dateFrom=${formattedStartDate}&dateTo=${formattedEndDate}`;
                this.renderProcessData(parameter);
            });
            let btnGetTodayMatch = actionElement.querySelector("#btnGetTodayMatch");
            btnGetTodayMatch.addEventListener("click", () => {
                this.renderProcessData();
            });
        });
        let containerGridElement = new GridElement([cardElement]);
        let containerGridSize = new Size(12, 12, 12);     
        containerGridElement.setIndividualSize(containerGridSize);
        containerGridElement.render();
        this.optionsElement.appendChild(containerGridElement);
        this.appendChild(this.optionsElement);
    }
    renderLoadingElement(){
        this.appendChild(this.loadingElement);
    }
    renderAsync(matches){
        let cardElements = [];
        matches.forEach((match) => {
            let matchData = new Match();
            matchData.setFromJSON(match);
            let cardElement = new MatchesCardElement(matchData);
            cardElement.setActionElement((actionElement) => {
                actionElement.innerHTML = `
                    <a href="./detail.html?page=details/matches_detail&id=${matchData.id}&saved=false" class = "btn light-blue darken-4 waves-effect waves-light" id = "btnViewData">View Detail</button>
                `;
            });
            cardElements.push(cardElement);
        });
        let cardSize = new Size(12, 6, 4);
        let dataGridElement = new GridElement(cardElements);
        dataGridElement.setIndividualSize(cardSize);
        dataGridElement.render();
        this.removeChild(this.loadingElement);
        this.dataContainerElement.appendChild(dataGridElement);
    }
    render(){
        this.loadingElement.render();
        this.renderHeadingElement();
        this.renderOptionsElement();
        this.renderProcessData();
    }
    renderProcessData(parameter=""){
        this.dataContainerElement.textContent = "";
        try{
            this.removeChild(this.loadingElement);
        }catch{};
        try{
            this.removeChild(this.noDataElement);
        }catch{};
        this.renderLoadingElement();
        this.getData(parameter);
    }
    getData(parameter=""){
        this.matchFetch.getAllMatches(parameter)
        .then((json) => {
            if (JSON.stringify(json.matches) === "[]"){
                this.appendChild(this.noDataElement);
                return;
            }
            this.renderAsync(json.matches);
            this.appendChild(this.dataContainerElement);
        })
    }
    connectedCallback(){
        this.render();
    }
}

customElements.define("match_list-element", MatchListElement);