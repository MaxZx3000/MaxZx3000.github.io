import AbstractElement from "../abstract-element.js";
import GridElement from "../grid-component.js";
import CustomElement from "../custom-element.js";
import Size from "../../../data/size.js";

class FooterElement extends AbstractElement{
    constructor(){
        super();
    }
    render(){
        this.innerHTML = `
            <footer></footer>
        `;
        let footerElement = this.querySelector("footer");
        let firstElement = new CustomElement();
        firstElement.setElementRender(() => {
            let element = document.createElement("div");
            element.innerHTML = `
                <i class = "material-icons" id = "person">directions_run</i>
                <i class = "material-icons" id = "ball">sports_soccer</i>
            `;
            return element;
        });

        let secondElement = new CustomElement();
        secondElement.setElementRender(() => {
            let element = document.createElement("div");
            element.innerHTML = `
                <p>@Copyright 2020 Anthony Kevin Oktavius</p>
                <p>This website is powered by foorball-data.org API.</p>
            `; 
            return element;
        });

        let elements = [firstElement, secondElement];
        let sizes = [new Size(12, 12, 6),
                     new Size(12, 12, 6)];
        let gridElement = new GridElement(elements);
        gridElement.setMultipleSizes(sizes);
        gridElement.render();

        footerElement.appendChild(gridElement);
        this.appendChild(footerElement);
    }
    connectedCallback(){
        this.render();
    }
}
customElements.define("footer-element", FooterElement);