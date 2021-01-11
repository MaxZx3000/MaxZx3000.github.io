import CardElement from "../elements/card-element.js";

class MatchesCardElement extends CardElement{
    constructor(matchData){
        super();
        this.matchData = matchData;
        this.setDataElement((dataElement) => {
            dataElement.innerHTML = `
                <span class = "card-title no-wrap">${this.matchData.competition.name}</span>
                <p>Held Area: ${this.matchData.competition.area.name}</p>
                <p class = "no-wrap">Team: ${this.matchData.homeTeam.name} vs. ${matchData.awayTeam.name}</p>
            `;
        })
    }
}
customElements.define("matches_card-element", MatchesCardElement);
export default MatchesCardElement;