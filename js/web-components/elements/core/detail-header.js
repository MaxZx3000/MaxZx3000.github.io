import AbstractHeaderElement from "./abstract-header.js";

class DetailHeaderElement extends AbstractHeaderElement{
    constructor(){
        super();
    }
    render(){
        super.render();
        let sidenavElement = document.createElement("a");
        let iconElement = `<i class = "material-icons hoverable-icon waves-effect waves-light">arrow_back</i>`;
        sidenavElement.innerHTML = iconElement;
        sidenavElement.className = "sidenav-trigger";
        sidenavElement.dataset.target = "nav-mobile";

        sidenavElement.addEventListener("click", () => {
            this.goBackOnePage();
        });

        let topnavElement = document.createElement("ul");
        topnavElement.className = "topnav right hide-on-med-and-down waves-effect waves-light";
        topnavElement.innerHTML = `<a href="#" id = "btnBack" class = "waves-effect waves-light">Back</a>`;
        let backButton = topnavElement.querySelector("#btnBack");
        backButton.addEventListener("click", () => {
            this.goBackOnePage();
        });
        this.wrapperElement.appendChild(sidenavElement);
        this.wrapperElement.appendChild(topnavElement);
    }
    goBackOnePage(){
        window.history.back(-1);
    }
    connectedCallback(){
        this.render();
    }
}
customElements.define("detail_header-element", DetailHeaderElement);