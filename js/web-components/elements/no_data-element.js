import AbstractElement from "./abstract-element.js";

class NoDataElement extends AbstractElement{
    constructor(){
        super();
    }
    render(){
        this.innerHTML = `
            <i class = "material-icons">help</i>
            <h1>No Data Available!</h1>
            <p>Well, let's try searching something else!</p>
        `;
    }
}
customElements.define("no_data-element", NoDataElement);
export default NoDataElement;