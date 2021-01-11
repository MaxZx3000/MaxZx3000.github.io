import AbstractElement from "./abstract-element.js";

class SelectElement extends AbstractElement{
    constructor(captions, values, name, id){
        super();
        this.captions = captions;
        this.values = values;
        this.name = name;
        this.selectElement = document.createElement("select");
        this.selectElement.id = id;
    }
    render(){
        this.captions.forEach((caption, index) => {
            let optionElement = document.createElement("option");
            optionElement.value = this.values[index];
            optionElement.innerText = caption;
            this.selectElement.appendChild(optionElement);
        });
        this.appendChild(this.selectElement);
    }
}
customElements.define("select-element", SelectElement);
export default SelectElement;