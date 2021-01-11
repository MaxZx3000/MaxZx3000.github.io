import AbstractElement from "../../elements/abstract-element.js";
import SelectElement from "../../elements/select-element.js";
import MatchDatabase from "../../../database/db-matches.js";
import TeamsDatabase from "../../../database/db-teams.js";
import PlayerDatabase from "../../../database/db-player.js";
import CompetitionsDatabase from "../../../database/db-competitions.js";
import NotificationElement from "../../elements/notification-component.js";
import CardElement from "../../elements/card-element.js";
import LoadingElement from "../../elements/loading-element.js";
import GridElement from "../../elements/grid-component.js";
import Match from "../../../data/match.js";
import Size from "../../../data/size.js";
import Team from "../../../data/team.js";
import Competition from "../../../data/competition.js";
import Player from "../../../data/player.js";
import NoDataElement from "../../elements/no_data-element.js";

import TeamsCardElement from "../../template/teams_card-element.js";
import MatchesCardElement from "../../template/matches_card-element.js";
import CompetitionsCardElement from "../../template/competitions_card-element.js";
import PlayersCardElement from "../../template/players_card-element.js";

class SavedListElement extends AbstractElement{
    constructor(){
        super();
        this.loadingElement = new LoadingElement();
        this.noDataElement = new NoDataElement();
        this.matchDatabase = new MatchDatabase();
        this.notificationElement = new NotificationElement("rounded");
        this.competitionDatabase = new CompetitionsDatabase();
        this.teamsDatabase = new TeamsDatabase();
        this.playerDatabase = new PlayerDatabase();
        this.optionsElement = document.createElement("div");
        this.optionsElement.id = "options";
        this.dataListElement = document.createElement("div");
        this.dataListElement.id = "data";
        this.dataElementsFunctions = [() => this.renderMatchesDataElement(),
                                      () => this.renderCompetitionsDataElement(),
                                      () => this.renderTeamsDataElement(),
                                      () => this.renderPlayersDataElement()];
    }
    renderLoadingPage(){
        this.loadingElement.render();
    }
    renderNoDataElement(){
        this.noDataElement.render();
    }
    renderOptionsElement(){
        let cardOptionsElement = new CardElement();
        cardOptionsElement.setDataElement((dataElement) => {
            let headingElement = document.createElement("h1");
            headingElement.innerHTML = `Options`;
            
            let divContentContainer = document.createElement("div");
            divContentContainer.id = "content-container";

            let selectHeaderElement = document.createElement("p");
            selectHeaderElement.innerText = `Category Name`;
            let captions = ["Matches", "Competitions", "Teams", "Players"];
            let indexes = [0, 1, 2, 3];
            let selectElement = new SelectElement(captions, indexes, "data-category", "data-category");
            selectElement.render();
            divContentContainer.appendChild(selectHeaderElement);
            divContentContainer.appendChild(selectElement);
            dataElement.appendChild(headingElement);
            dataElement.appendChild(divContentContainer);
        });
        cardOptionsElement.setActionElement((actionElement) => {
            actionElement.innerHTML = `
                <div id = "right-position " class = "saved">
                    <button type = "button" id ="goButton" class = "btn waves-effect waves-light right-position"><i class = "material-icons left">search</i>Go!</button>
                </div>
            `;
            let goButton = actionElement.querySelector("#goButton");
            goButton.addEventListener("click", () => {
                let selectValue = parseInt(cardOptionsElement.querySelector("#data-category").value);
                this.refreshDataElement(selectValue);
            });
        });
        cardOptionsElement.render();
        this.optionsElement.appendChild(cardOptionsElement);
        
    }
    refreshDataElement(value){
        this.dataListElement.textContent = ``;
        try{
            this.removeChild(this.noDataElement);
        }
        catch{}
        this.appendChild(this.loadingElement);
        this.dataElementsFunctions[value]()
            .then(() => {
                this.removeChild(this.loadingElement);
            });
    }
    renderMatchesDataElement(){
        return this.matchDatabase.getAllMatches()
            .then((matches) => {
                if (JSON.stringify(matches) === "[]"){
                    this.appendChild(this.noDataElement);
                    return;
                }
                let cardElements = [];
                matches.forEach((match) => {
                    let matchData = new Match();
                    matchData.setFromJSON(match);
                    let cardElement = new MatchesCardElement(matchData);
                    cardElement.setActionElement((actionElement) => {
                        actionElement.innerHTML = `
                            <button type = "button" class = "btn red waves-effect waves-light" id = "btnRemoveData">Remove Data</button>
                            <a href="./detail.html?page=details/matches_detail&id=${matchData.id}&saved=true" class = "btn waves-effect waves-light" id = "btnViewDetail">View Detail</button>
                        `;
                        let removeDataButtonElement = actionElement.querySelector("#btnRemoveData");
                        removeDataButtonElement.addEventListener("click", () => {
                            this.matchDatabase.deleteMatch(matchData.id)
                                .then((resolveMessage) => {
                                    this.notificationElement.setContentNotification(`${matchData.competition.name} ${resolveMessage}`);
                                    this.notificationElement.render();
                                    this.refreshDataElement(0);
                                })
                                .catch((rejectedMessage) =>{
                                    this.notificationElement.setContentNotification(`${matchData.competition.name} ${rejectedMessage}`);
                                    this.notificationElement.render();
                                    this.refreshDataElement(0);
                                })
                        });
                    });
                    cardElements.push(cardElement);
                });
                let cardSize = new Size(12, 6, 4);
                let gridElement = new GridElement(cardElements);
                gridElement.setIndividualSize(cardSize);
                gridElement.render();
                this.dataListElement.appendChild(gridElement);
            })
    }
    renderCompetitionsDataElement(){
        return this.competitionDatabase.getAllCompetitions()
            .then((competitions) => {
                if (JSON.stringify(competitions) === "[]"){
                    this.appendChild(this.noDataElement);
                    return;
                }
                let cardElements = [];
                competitions.forEach((competition) => {
                    let competitionData = new Competition();
                    competitionData.setFromJSON(competition);
                    let cardElement = new CompetitionsCardElement(competitionData);
                    cardElement.setActionElement((actionElement) => {
                        actionElement.innerHTML = `
                            <button class = "btn red waves-effect waves-light" id = "btnRemoveData">Remove Data</button>
                        `;
                        let removeButton = actionElement.querySelector("#btnRemoveData");
                        removeButton.addEventListener("click", () => {
                            this.competitionDatabase.deleteCompetition(competitionData.id)
                                .then((resolveMessage) => {
                                    this.notificationElement.setContentNotification(`${competitionData.name} (${competitionData.getPlan()}) ${resolveMessage}`);
                                    this.notificationElement.render();
                                    this.refreshDataElement(1);
                                })
                                .catch((rejectedMessage) => {
                                    this.notificationElement.setContentNotification(`${competitionData.name} (${competitionData.getPlan()}) ${rejectedMessage}`);
                                    this.notificationElement.render();
                                    this.refreshDataElement(1);
                                });
                        });
                    });
                    cardElement.render();
                    cardElements.push(cardElement);
                });
                let gridElement = new GridElement(cardElements);
                let gridSize = new Size(12, 6, 4);
                gridElement.setIndividualSize(gridSize);
                gridElement.render();
                this.dataListElement.appendChild(gridElement);
            })
    }
    renderTeamsDataElement(){
        return this.teamsDatabase.getAllTeams()
            .then((teams) => {
                if (JSON.stringify(teams) === "[]"){
                    this.appendChild(this.noDataElement);
                    return;
                }
                let cardElements = [];
                teams.forEach((team) => {
                    let teamData = new Team();
                    teamData.setFromJSON(team);
                    let cardElement = new TeamsCardElement(teamData);
                    cardElement.setActionElement((actionElement) => {
                        actionElement.innerHTML = `
                            <button class = "btn red waves-effect waves-light" id = "btnRemoveData">Remove Data</button>
                            <a href="./detail.html?page=details/teams_detail&id=${teamData.id}&saved=true" class = "btn light-blue darken-4 waves-effect waves-light" id = "btnViewDetail">View Detail</button>
                        `;
                        let removeDataButton = actionElement.querySelector("#btnRemoveData");
                        removeDataButton.addEventListener("click", () => {
                            this.teamsDatabase.deleteTeam(teamData.id)
                                .then((resolveMessage) => {
                                    this.notificationElement.setContentNotification(`${teamData.name} ${resolveMessage}`);
                                    this.notificationElement.render();
                                    this.refreshDataElement(2);
                                })
                                .catch((rejectMessage) => {
                                    this.notificationElement.setContentNotification(`${teamData.name} ${rejectMessage}`);
                                    this.notificationElement.render();
                                    this.refreshDataElement(2);
                                })
                        });
                    });
                    cardElements.push(cardElement);
                });
                let cardSize = new Size(12, 6, 4);
                let gridElement = new GridElement(cardElements);
                gridElement.setIndividualSize(cardSize);
                gridElement.render();
                this.dataListElement.appendChild(gridElement);
            })
    }
    renderPlayersDataElement(){
        return this.playerDatabase.getAllPlayers()
            .then((players) => {
                if (JSON.stringify(players) === "[]"){
                    this.appendChild(this.noDataElement);
                    return;
                }
                let cardPlayers = [];
                players.forEach((player) => {
                    let playerData = new Player();
                    playerData.setFromJSON(player);
                    playerData.setTeamName(player.teamName);
                    let cardElement = new PlayersCardElement(playerData);
                    cardElement.setActionElement((actionElement) => {
                        actionElement.innerHTML = `
                            <button type = "button" class = "btn red waves-effect waves-light" id = "btnRemoveData">Remove Data</button>
                        `;
                        let removeDataButton = actionElement.querySelector("#btnRemoveData");
                        removeDataButton.addEventListener("click", () => {
                            this.playerDatabase.deletePlayer(playerData.id)
                                .then((resolveMessage) => {
                                    this.notificationElement.setContentNotification(`${playerData.name} ${resolveMessage}`);
                                    this.notificationElement.render();
                                    this.refreshDataElement(3);
                                })
                                .catch((rejectedMessage) => {
                                    this.notificationElement.setContentNotification(`${playerData.name} ${rejectedMessage}`);
                                    this.notificationElement.render();
                                    this.refreshDataElement(3);
                                })
                        });
                    });
                    cardPlayers.push(cardElement);
                });
                let gridSize = new Size(12, 6, 4);
                let gridElement = new GridElement(cardPlayers);
                gridElement.setIndividualSize(gridSize);
                gridElement.render();
                this.dataListElement.appendChild(gridElement);
            })
    }
    render(){
        this.renderOptionsElement();
        this.renderNoDataElement();
        this.renderLoadingPage();
    }
    appendElements(){
        this.appendChild(this.optionsElement);
        this.appendChild(this.dataListElement);
    }
    connectedCallback(){
        this.render();
        this.appendElements();
    }
}
customElements.define("saved_list-element", SavedListElement);