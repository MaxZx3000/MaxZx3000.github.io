import AbstractElement from "../../elements/abstract-element.js";
import FloatingActionButtonElement from "../../elements/floating-action-button.js";
import FABProperties from "../../../data/fab-properties.js";


class AbstractSavePageElement extends AbstractElement{
    constructor(){
        super();
    }
    initializeFAB(){
        let fabProperties = [new FABProperties("save", () => this.setSaveFloatingActionButtonEvent())];
        this.floatingButtonElement = new FloatingActionButtonElement(fabProperties);
        this.appendChild(this.floatingButtonElement);
    }
    setSaveFloatingActionButtonEvent(){}
    renderSaveFAB(){
        this.floatingButtonElement.render();
    }
}
export default AbstractSavePageElement;