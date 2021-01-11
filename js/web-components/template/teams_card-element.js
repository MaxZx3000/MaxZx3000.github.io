import CardElement from "../elements/card-element.js";

class TeamsCardElement extends CardElement{
    constructor(teamData){
        super();
        this.teamData = teamData;
        this.setDataElement((dataElement) => {
            dataElement.innerHTML = `
                <span class = "card-title no-wrap">${this.teamData.name}</span>
                <p class = "no-wrap">Venue: ${this.teamData.venue}</p>
                <p>Founded: ${this.teamData.founded}</p>
                <p class = "no-wrap">Email: ${this.teamData.getEmail()}</p>
            `;
        })
        this.setImageElement((imageElement) => {
            imageElement.innerHTML = `
                <img src = "${this.teamData.crestUrl}" alt = "${this.teamData.name}">
            `;
            let image = imageElement.querySelector("img");
            image.addEventListener("error", () => {
                image.src = "./images/no-image-icon.jpg";
            })
        });
    }
}
customElements.define("teams_card-element", TeamsCardElement);
export default TeamsCardElement;