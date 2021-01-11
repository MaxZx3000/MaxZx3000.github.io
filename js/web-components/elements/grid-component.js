import AbstractElement from "./abstract-element.js";
class GridElement extends AbstractElement{
    constructor(elements){
        super();
        this.elements = elements;
    }
    setIndividualSize(size){
        this._size = size;
    }
    setMultipleSizes(sizes){
        this._sizes = sizes;
    }
    render(){
        this.innerHTML =  `
            <div class = "row"></div>
        `;
        let rowElement = this.querySelector(".row");
        this.elements.forEach((element, index) => {
            let columnElement = document.createElement("div");
            if (this._size === undefined){
                columnElement.className = `col s${this._sizes[index].small} m${this._sizes[index].medium} l${this._sizes[index].large}`;
            }
            else{
                columnElement.className = `col s${this._size.small} m${this._size.medium} l${this._size.large}`;
            }
            element.render();
            columnElement.append(element);
            rowElement.append(columnElement);
        });
    }
}
customElements.define("grid-element", GridElement);
export default GridElement;