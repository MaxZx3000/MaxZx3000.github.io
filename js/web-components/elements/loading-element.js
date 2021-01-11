import AbstractElement from "./abstract-element.js";
import GridElement from "./grid-component.js";
import CustomElement from "./custom-element.js";
import Size from "../../data/size.js";
class LoadingElement extends AbstractElement{
    constructor(){
        super();
        this.message = "Loading...";
        this.icon = "sports_soccer";
    }
    setMessage(message){
        this.message = message;
    }
    render(){
        let customElementLoading = new CustomElement();
        customElementLoading.setElementRender(() => {
            let divElement = document.createElement("div");
            divElement.className = "lds-ring";
            divElement.innerHTML = `
                <div>
                </div>
                <div>
                </div>
                <div>
                </div>
                <div>
                </div>
                <i class = "material-icons" id = "iconLoading">${this.icon}</i>
            `;
            return divElement;
        });
        let customElementMessage = new CustomElement();
        customElementMessage.setElementRender(() => {
            let messageElement = document.createElement("p");
            messageElement.id = "message";
            messageElement.innerHTML = `${this.message}`;
            return messageElement;
        });
        let size = [new Size(6, 6, 6), new Size(6, 6, 6)];
        let elements = [customElementLoading, customElementMessage];
        let gridElement = new GridElement(elements);
        gridElement.setMultipleSizes(size);
        gridElement.render();
        this.appendChild(gridElement);
    }
}
customElements.define("loading-element", LoadingElement);
export default LoadingElement;