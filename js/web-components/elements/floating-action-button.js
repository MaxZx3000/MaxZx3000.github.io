import AbstractElement from "./abstract-element.js";

class FloatingActionButtonElement extends AbstractElement{
    constructor(iconFABProperties){
        super();
        this.iconFABProperties = iconFABProperties;
    }
    setLargeButton(property){
        let largeFloatingButtonElement = document.createElement("button");
        largeFloatingButtonElement.className = `btn-floating btn-large waves-effect waves-light ${property.color}`;
        let largeIconElement = document.createElement("i");
        largeIconElement.className = "large material-icons";
        largeIconElement.innerHTML = property.icon;
        largeFloatingButtonElement.addEventListener("click", () => {
            property.clickListener();
        });
        largeFloatingButtonElement.appendChild(largeIconElement);
        return largeFloatingButtonElement;
    }
    setSmallButton(property){
        let listElement = document.createElement("li");
        let buttonElement = document.createElement("button");
        buttonElement.className = `btn-floating ${property.color}`;
        let iconElement = document.createElement("i");
        iconElement.className = "material-icons";
        iconElement.innerHTML = property.icon;
        buttonElement.appendChild(iconElement);
        listElement.appendChild(buttonElement);
        buttonElement.addEventListener("click", () => {
            property.clickListener();
        });
        return listElement;
    }
    render(){
        this.innerHTML = `
            <div class = "fixed-action-btn"></div>
        `;
        let fixedActionButtonElement = this.querySelector(".fixed-action-btn");
        this.iconFABProperties.forEach((property, index) => {
            if (index == 0){
                fixedActionButtonElement.appendChild(this.setLargeButton(property));
            }
            else{
                let unorderedListElement = document.createElement("ul");
                unorderedListElement.appendChild(this.setSmallButton(property));
                fixedActionButtonElement.appendChild(unorderedListElement);
            }
        });
    }
}
customElements.define("floating-button", FloatingActionButtonElement);
export default FloatingActionButtonElement;