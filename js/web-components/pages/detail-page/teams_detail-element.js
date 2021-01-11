import TeamFetch from "../../../fetch-requests/team-fetch.js";
import Team from "../../../data/team.js";
import Player from "../../../data/player.js";
import CardElement from "../../../web-components/elements/card-element.js";
import GridElement from "../../../web-components/elements/grid-component.js";
import Size from "../../../data/size.js";
import CustomElement from "../../elements/custom-element.js";
import AbstractSavePageElement from "./abstract_detail-element.js";
import TeamsDatabase from "../../../database/db-teams.js";
import NotificationElement from "../../elements/notification-component.js";
import PlayerDatabase from "../../../database/db-player.js";
import PlayersCardElement from "../../template/players_card-element.js";

class TeamsDetailElement extends AbstractSavePageElement{
    constructor(){
        super();
        this.detailTeamElement = document.createElement("div");
        this.detailTeamElement.id = "detail";
        this.notificationElement = new NotificationElement("rounded");
        this.squadsListElement = document.createElement("div");
        this.squadsListElement.id = "squads";
        this.teamsDatabase = new TeamsDatabase();
        this.playerDatabase = new PlayerDatabase();
        this.team = null;
        this.initializeFAB();
    }
    setSaveFloatingActionButtonEvent(){
        this.teamsDatabase.addOneTeam(this.team)
            .then((resolveMessage) => {
                this.notificationElement.setContentNotification(`This team${resolveMessage}`);
                this.notificationElement.render();
            })
            .catch((rejectMessage) => {
                this.notificationElement.setContentNotification(`This team ${rejectMessage}`);
                this.notificationElement.render();
            });
    }
    renderDetailTeamElement(team){
        let teamData = new Team();
        teamData.setFromJSON(team);
        let cardElement = new CardElement();
        cardElement.setDataElement((dataElement) => {
            let dataLeftContainer = new CustomElement();
            dataLeftContainer.setElementRender(() => {
                let element = document.createElement("div");
                element.innerHTML = `
                    <span class = "card-title">${teamData.name}</span>
                    <p>Location: ${teamData.area.name}</p>
                    <p>Address: ${teamData.address}</p>
                    <p>Phone Number: ${teamData.phone}</p>
                    <p>Email: ${teamData.getEmail()}</p>
                    <p>Founded: ${teamData.founded}</p>
                    <p>Club Colors: ${teamData.clubColors}</p>
                    <p>Venue: ${teamData.venue}</p>
                `;
                return element;
            });
            let dataRightContainer = new CustomElement();
            dataRightContainer.setElementRender(() => {
                let element = document.createElement("div");
                element.innerHTML = `
                    <img src = "${teamData.crestUrl}" alt="${teamData.name}">
                `;
                let imageElement = element.querySelector("img");
                imageElement.addEventListener("error", () =>{
                    imageElement.src = "./images/no-image-icon.jpg";
                });
                return element;
            });
            let elements = [dataLeftContainer, dataRightContainer];
            let gridElement = new GridElement(elements);
            let gridSize = new Size(12, 6, 6);
            gridElement.setIndividualSize(gridSize);
            gridElement.render();
            dataElement.appendChild(gridElement); 
        });
        
        cardElement.render();
        this.detailTeamElement.appendChild(cardElement);
        this.appendChild(this.detailTeamElement);
    }
    renderSquadElement(squads){
        let headerElement = document.createElement("h1");
        headerElement.innerHTML = `List of People`;
        let cardElements = [];
        squads.forEach((squad) => {
            let squadDatum = new Player();
            squadDatum.setFromJSON(squad);
            squadDatum.setTeamName(this.team.name);
            let cardElement = new PlayersCardElement(squadDatum);     
            cardElement.setActionElement((actionElement) => {
                actionElement.innerHTML = `
                    <button type = "button" class = "btn waves-effect waves-light" id = "btnAddPlayer">Save Data</button>
                `;
                let addPlayerButton = actionElement.querySelector("#btnAddPlayer");
                addPlayerButton.addEventListener("click", () => {
                    this.playerDatabase.addPlayer(squadDatum)
                        .then((resolveMessage) => {
                            this.notificationElement.setContentNotification(`${squadDatum.name} ${resolveMessage}`);
                            this.notificationElement.render();
                        })
                        .catch((rejectMessage) => {
                            this.notificationElement.setContentNotification(`${squadDatum.name} ${rejectMessage}`);
                            this.notificationElement.render();
                        });
                })
            });
            cardElements.push(cardElement);
        });
        let gridElement = new GridElement(cardElements);
        let gridSize = new Size(12, 6, 4);
        gridElement.setIndividualSize(gridSize);
        gridElement.render();
        this.squadsListElement.appendChild(headerElement);
        this.squadsListElement.appendChild(gridElement);
        this.appendChild(this.squadsListElement);
    }
    gatherData(){
        let urlParam = new URLSearchParams(window.location.search);
        let id = urlParam.get("id");
        let saved = urlParam.get("saved");
        if (saved === "true"){
            let teamsDatabase = new TeamsDatabase();
            teamsDatabase.getTeamById(id)
                .then((json) => {
                    this.team = json;
                    this.setFetchedData(json);
                });
        }
        else{
            let teamFetch = new TeamFetch();
            teamFetch.getIndividualTeamById(id)
                .then((json) => {
                    this.team = json;
                    this.setFetchedData(json);
                    this.renderSaveFAB();
                });
        }
    }
    setFetchedData(json){
        this.renderDetailTeamElement(json);
        this.renderSquadElement(json.squad);
    }
    render(){
        this.gatherData();
    }
    connectedCallback(){
        this.render();
    }
}
customElements.define("teams_detail-element", TeamsDetailElement);