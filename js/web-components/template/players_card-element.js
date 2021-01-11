import CardElement from "../elements/card-element.js";

class PlayersCardElement extends CardElement{
    constructor(playerData){
        super();
        this.playerData = playerData;
        let roleStatus = playerData.getRoleStatus();
        this.setImageElement((imageElement) => {
            imageElement.innerHTML = `
                <img id = "border-top" class = "${roleStatus._color}" style="height: 10px; width: 100%"></img>
            `;
        });
        this.setDataElement((dataElement) => {
            dataElement.innerHTML = `
                <span class = "card-title no-wrap">${this.playerData.name} </span>
                <h2>${this.playerData.teamName}</h2>
                <h3>${roleStatus.message}</h3>
                <p>Position: ${this.playerData.getPosition()}</p>
                <p>Birth Date: ${this.playerData.getBirthDate()}</p>
                <p>Birth Country: ${this.playerData.countryOfBirth}</p>
                <p>Nationality: ${this.playerData.nationality}</p>
            `;
        });
        
    }
}
customElements.define("players_card-element", PlayersCardElement);
export default PlayersCardElement;