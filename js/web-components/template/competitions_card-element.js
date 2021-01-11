import Formatter from "../../formatter/formatter.js";
import CardElement from "../elements/card-element.js";

class CompetitionsCardElement extends CardElement{
    constructor(competitionData){
        super();
        this.competitionData = competitionData;
        this.setDataElement((dataElement) => {
            let formatter = new Formatter();
            dataElement.innerHTML = `
                <h1 class = "card-title no-wrap">${this.competitionData.name}</h1>
                <h2>${this.competitionData.getPlan()}</h2>
                <p>Available Seasons: ${this.competitionData.numberOfAvailableSeasons}</p>
                <p>Held Area: ${this.competitionData.area.name}</p>`;

                if (this.competitionData.currentSeason !== null && this.competitionData.currentSeason !== undefined){
                    dataElement.innerHTML += `
                        <p>Start Date: ${formatter.getHumanReadableDate(this.competitionData.currentSeason.startDate)}</p>
                        <p>End Date: ${formatter.getHumanReadableDate(this.competitionData.currentSeason.endDate)}</p>  
                    `;
                }
        });
        let seasonStatus = this.competitionData.getStatusSeason();
        this.setImageElement((imageElement) => {
            imageElement.innerHTML = `
                <img id = "border-top" class = "${seasonStatus._color}" style="height: 10px; width: 100%"></img>
            `;
        });
    }
}
customElements.define("competitions_card-element", CompetitionsCardElement);
export default CompetitionsCardElement;