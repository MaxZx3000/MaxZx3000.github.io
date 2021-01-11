import AbstractElement from "../../elements/abstract-element.js";
import TeamFetch from "../../../fetch-requests/team-fetch.js";
import Team from "../../../data/team.js";
import LoadingElement from "../../elements/loading-element.js";
import GridElement from "../../elements/grid-component.js";
import Size from "../../../data/size.js";
import TeamsCardElement from "../../template/teams_card-element.js";

class TeamsListElement extends AbstractElement{
    constructor(){
        super();
        this.headingElement = document.createElement("div");
        this.headingElement.id = "heading";
        this.dataContainerElement = document.createElement("div");
        this.dataContainerElement.id = "data";
        this.loadingElement = new LoadingElement();
    }
    renderAsync(teams){
        let cardElements = [];
        teams.forEach((team) => {
            let teamData = new Team();
            teamData.setFromJSON(team);
            let cardElement = new TeamsCardElement(teamData);
            cardElement.setActionElement((actionElement) => {
                actionElement.innerHTML = `
                    <a href="./detail.html?page=details/teams_detail&id=${teamData.id}&saved=false" class = "btn light-blue darken-4 waves-effect waves-light" id = "btnViewDetail">View Detail</button>
                `;
            });
            cardElements.push(cardElement);
        });
        let cardSize = new Size(12, 6, 4);
        let gridElement = new GridElement(cardElements);
        gridElement.setIndividualSize(cardSize);
        gridElement.render();
        this.removeChild(this.loadingElement);
        this.dataContainerElement.appendChild(gridElement);
    }
    renderHeadingElement(){
        this.headingElement.innerHTML = `
            <i class = "material-icons" id = "iconSoccer">sports_soccer</i>
            <i class = "material-icons" id = "iconFlag">flag</i>
            <h1>Teams in the world</h1>
        `;
        this.appendChild(this.headingElement);  
    }
    renderLoadingElement(){
        this.loadingElement.render();
        this.appendChild(this.loadingElement);
    }
    getData(){
        let areaFetch = new TeamFetch();
        areaFetch.getAllTeams()
        .then((json) => {
            this.renderAsync(json.teams);
            this.appendChild(this.dataContainerElement);
        })
        .catch((err) => {
            console.error(err);
        });
    }
    render(){
        this.renderHeadingElement();
        this.renderLoadingElement();
        this.getData();
    }
    connectedCallback(){
        this.render();
    }
}

customElements.define("teams_list-element", TeamsListElement);