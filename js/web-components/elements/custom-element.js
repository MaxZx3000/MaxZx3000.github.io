import AbstractElement from "./abstract-element.js";

class CustomElement extends AbstractElement{
    constructor(){
        super();
        this.elementRender = () => {};
    }
    setElementRender(elementRender){
        this.elementRender = elementRender;
    }
    render(){
        this.appendChild(this.elementRender());
    }
}
customElements.define("custom-element", CustomElement);
export default CustomElement;