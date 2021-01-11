import AbstractElement from "./abstract-element.js";
class CardElement extends AbstractElement{
    constructor(){
        super();
        this.imageElement = () => {};
        this.dataElement = () => {};
        this.actionElement = () => {};
        this.isActionElementSet = false;
        this.isImageElementSet = false;
    }
    setImageElement(imageElement){
        this.imageElement = imageElement;
        this.isImageElementSet = true;
    }
    setDataElement(dataElement){
        this.dataElement = dataElement;
    }
    setActionElement(actionElement){
        this.actionElement = actionElement;
        this.isActionElementSet = true;
    }
    render(){
        this.innerHTML = `
            <div class = "card">
            </div>
        `;
        let cardParentElement = this.querySelector("div");
        if (this.isImageElementSet){
            let cardImageElement = document.createElement("div");
            cardImageElement.className = "card-image";
            this.imageElement(cardImageElement);
            cardParentElement.appendChild(cardImageElement);
        }
        let cardElementContent = document.createElement("div");
        cardElementContent.className = "card-content";
        this.dataElement(cardElementContent);
        cardParentElement.appendChild(cardElementContent);
        if (this.isActionElementSet){
            let cardActionElement = document.createElement("div");
            cardActionElement.className = "card-action";
            this.actionElement(cardActionElement);
            cardParentElement.appendChild(cardActionElement);
        }
    }
}
customElements.define("card-element", CardElement);
export default CardElement;