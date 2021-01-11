import MatchFetch from "../../../fetch-requests/match-fetch.js";
import CardElement from "../../elements/card-element.js";
import LoadingElement from "../../elements/loading-element.js";
import GridElement from "../../elements/grid-component.js";
import Size from "../../../data/size.js";
import Competition from "../../../data/competition.js";
import Match from "../../../data/match.js";
import Score from "../../../data/score.js";
import Season from "../../../data/season.js";
import CustomElement from "../../elements/custom-element.js";
import Formatter from "../../../formatter/formatter.js";
import AbstractSavePageElement from "./abstract_detail-element.js";
import MatchDatabase from "../../../database/db-matches.js";
import NotificationElement from "../../elements/notification-component.js";

class MatchesDetailElement extends AbstractSavePageElement{
    constructor(){
        super();
        this.loadingElement = new LoadingElement();
        this.notificationElement = new NotificationElement("rounded");
        this.matchElement = document.createElement("div");
        this.matchElement.id = "match";
        this.competitionElement = document.createElement("div");
        this.competitionElement.id = "competition";
        this.seasonElement = document.createElement("div");
        this.seasonElement.id = "season";
        this.scoreElement = document.createElement("div");
        this.scoreElement.id = "score";
        this.match = null;
        this.matchDatabase = new MatchDatabase();
        this.initializeFAB();
    }
    setSaveFloatingActionButtonEvent(){
        this.matchDatabase.addOneMatch(this.match)
            .then((resolveMessage) => {
                this.notificationElement.setContentNotification(`This match ${resolveMessage}`);
                this.notificationElement.render();
            })
            .catch((rejectedMessage) => {
                this.notificationElement.setContentNotification(`This match ${rejectedMessage}`);
                this.notificationElement.render();
            });   
    }
    renderLoadingElement(){
        this.loadingElement = new LoadingElement();
        this.loadingElement.render();
        this.appendChild(this.loadingElement);
    }
    renderCompetitionElement(competitionJSON){
        let competition = new Competition();
        competition.setFromJSON(competitionJSON);
        let cardElement = new CardElement();
        cardElement.setDataElement((dataElement) => {
            dataElement.innerHTML = `
                <span class = "card-title card-focus-title-blue"><i class = "material-icons">emoji_events</i>Competition Name</span>
                <h1 class = "content-center">${competition.name}</h1>
                <p class = "content-center">Held area: ${competition.area.name}</p>
            `;
        });
        let size = new Size(12, 12, 12);
        let gridElement = new GridElement([cardElement]);
        gridElement.setIndividualSize(size);
        gridElement.render();
        this.competitionElement.appendChild(gridElement);
        this.appendChild(this.competitionElement);
    }
    renderScoreElement(scoreJSON){
        if (scoreJSON !== null && scoreJSON !== undefined){
            let score = new Score();
            score.setFromJSON(scoreJSON);
            this.scoreElement.innerHTML = `
                <h1 class = "content-center">Winner: ${score.getWinner()}</h1>
                <h2 class = "content-center">Scores are described below</h2>
                `;
            let scoreDetails = [score.fullTime, score.halfTime, score.extraTime, score.penalties];
            let cardScoreDetailsElements = [];
            scoreDetails.forEach((scoreDetail) => {
                let scoreDetailElement = new CardElement();
                scoreDetailElement.setDataElement((dataElement) => {
                    dataElement.innerHTML = `
                    <h1 class = "card-title content-center card-focus-title-blue">${scoreDetail.name}</h1>    
                    <h2 class = "content-center content-focus-description">Home | Away</h2>
                `;
                dataElement.innerHTML += `<h2 class = "content-center content-focus-description">${scoreDetail.getHomeTeamScore()} | ${scoreDetail.getAwayTeamScore()}</h2>`;
                });
                cardScoreDetailsElements.push(scoreDetailElement);
            });
            let gridSize = new Size(12, 6, 4);
            let gridElement = new GridElement(cardScoreDetailsElements);
            gridElement.setIndividualSize(gridSize);
            gridElement.render();
            this.scoreElement.appendChild(gridElement);
        }
        else{
            this.scoreElement.innerHTML += `
                <i class = "material-icons content-center">help_outline</i>
                <p class = "content-center">No detail yet, as the match hasn't begun yet...</p>
            `;
        }
        this.appendChild(this.scoreElement);
    }
    renderSeasonElement(seasonJSON){
        let season = new Season();
        season.setFromJSON(seasonJSON);
        let customTitleElement = new CustomElement();
        customTitleElement.setElementRender(() => {
            let containerElement = document.createElement("div");
            containerElement.id = "resize-card"
            let iconElement = document.createElement("i");
            iconElement.id = `clock-icon`;
            iconElement.className = `material-icons`;
            iconElement.innerText = `schedule`;
            let headerTextElement = document.createElement("h1");
            headerTextElement.className = "content-center";
            headerTextElement.id = "season-text";
            headerTextElement.innerHTML = `Season`;
            containerElement.appendChild(iconElement);
            containerElement.appendChild(headerTextElement);
            return containerElement;
        });
        let cardStartDateElement = new CardElement();
        let formatter = new Formatter();
        let [startYear, startMonth, startDate] = formatter.getIndividualDates(season.startDate);
        let [endYear, endMonth, endDate] = formatter.getIndividualDates(season.endDate);
        cardStartDateElement.setDataElement((dataElement) => {
            dataElement.innerHTML = `
                <span class = "card-title card-focus-title-yellow content-center">Start Date</span>
                <p class = "content-center emphasize-date">${startDate}</p>
                <p class = "content-center emphasize-date-bottom-green">${formatter.getNamedMonth(startMonth)} ${startYear}</p>
            `;
        });
        let cardEndDateElement = new CardElement();
        cardEndDateElement.setDataElement((dataElement) => {
            dataElement.innerHTML = `
                <span class = "card-title card-focus-title-green content-center">End Date</span>
                <p class = "content-center emphasize-date">${endDate}</p>
                <p class = "content-center emphasize-date-bottom-red">${formatter.getNamedMonth(endMonth)} ${endYear}</p>
            `;
        });
        let elements = [customTitleElement, cardStartDateElement, cardEndDateElement];
        let gridSize = new Size(12, 4, 4);
        let gridElement = new GridElement(elements);
        gridElement.setIndividualSize(gridSize);
        gridElement.render();
        this.seasonElement.appendChild(gridElement);
        this.appendChild(this.seasonElement);
    }
    renderMatchElement(matchJSON){
        let match = new Match();
        match.setFromJSON(matchJSON);
        this.matchElement.innerHTML = `
            <h1>Detail Match</h1>
            <div class = "detail-match-container">
                <span id = "homeTeam">${match.homeTeam.name}</span>
                <span id = "versus">vs.</span> 
                <span id = "awayTeam">${match.awayTeam.name}</span>
            </div>
        `;
        let blueBorderInnerHTML = `<div class = "blue-border"></div>`;
        let cardMatchDateElement = new CardElement();
        cardMatchDateElement.setImageElement((imageElement) => {
            imageElement.innerHTML = `${blueBorderInnerHTML}`;
        });
        cardMatchDateElement.setDataElement((dataElement) => {
            dataElement.innerHTML = `
                <span class = "card-title">Match Date</span>
                <p class = "content-center">${match.getMatchDate()}</p>
            `;
        });
        let cardStatusElement = new CardElement();
        cardStatusElement.setImageElement((imageElement) => {
            imageElement.innerHTML = `${blueBorderInnerHTML}`;
        });
        cardStatusElement.setDataElement((dataElement) => {
            dataElement.innerHTML = `
                <span class = "card-title">Status</span>
                <p class = "content-center">${match.getStatus()}</p>
            `;
        });
        let cardStageElement = new CardElement();
        cardStageElement.setImageElement((imageElement) => {
            imageElement.innerHTML = `${blueBorderInnerHTML}`;
        });
        cardStageElement.setDataElement((dataElement) => {
            dataElement.innerHTML = `
                <span class = "card-title">Stage</span>
                <p class = "content-center">${match.getStage()}</p>
            `;
        });
        let gridElements = [cardMatchDateElement, cardStatusElement, cardStageElement];
        let gridSize = new Size(12, 4, 4);
        let gridElement = new GridElement(gridElements);
        gridElement.setIndividualSize(gridSize);
        gridElement.render();
        this.matchElement.appendChild(gridElement);
        this.appendChild(this.matchElement);
    }
    gatherData(){
        let location = new URLSearchParams(window.location.search);
        let id = parseInt(location.get("id"));
        let saved = location.get("saved");
        this.appendChild(this.loadingElement);
        if (saved === "true"){
            let matchDatabase = new MatchDatabase();
            matchDatabase.getMatchById(id)
                .then((json) => {
                    this.setFetchedElements(json);
                })
        }
        else{
            let competitionFetch = new MatchFetch();
            competitionFetch.getMatchById(id)
            .then((json) => {
                this.match = json.match;
                this.setFetchedElements(json.match);
                this.renderSaveFAB();
            })
        }
    }
    setFetchedElements(match){
        let matchData = new Match();
        matchData.setFromJSON(match);
        this.renderMatchElement(matchData);
        this.renderCompetitionElement(matchData.competition);
        this.renderSeasonElement(matchData.season);
        this.renderScoreElement(matchData.score);
        this.removeChild(this.loadingElement);
    }
    render(){
        this.renderLoadingElement();
        this.gatherData();
    }
    connectedCallback(){
        this.render();
    }
}
customElements.define("matches_detail-element", MatchesDetailElement);