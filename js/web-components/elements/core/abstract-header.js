import AbstractElement from "../abstract-element.js";
class AbstractHeaderElement extends AbstractElement{
    constructor(){
        super();
        this.wrapperElement = "";
    }
    render(){
        this.innerHTML = `
            <nav role = "navigation">
                <div class = "nav-wrapper container">
                    <div class="brand-logo" id="logo-container">
                        <i id = "sports-icon" class = "material-icons">sports_soccer</i>
                        <span id = "title">My Soccer App</span>
                    </div>
                </div>
            </nav>
        `;
        this.wrapperElement = this.querySelector(".nav-wrapper");
    }
    connectedCallback(){
        this.render();
    }
}
export default AbstractHeaderElement;