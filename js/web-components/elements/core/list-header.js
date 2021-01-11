import AbstractHeaderElement from "./abstract-header.js";
class HeaderElement extends AbstractHeaderElement{
    constructor(){
        super();  
    }
    render(){
        super.render();
        let sidenavTriggerElement = document.createElement("a");
        sidenavTriggerElement.href = "#";
        sidenavTriggerElement.className = "sidenav-trigger";
        sidenavTriggerElement.dataset.target = "nav-mobile";
        sidenavTriggerElement.innerHTML = `<i class = "material-icons hoverable-icon">menu</i>`;
        let topnavElement = document.createElement("ul");
        topnavElement.className = "topnav right hide-on-med-and-down";
        let sidenavElement = document.createElement("ul");
        sidenavElement.className = "sidenav";
        sidenavElement.id = "nav-mobile";

        this.wrapperElement.appendChild(sidenavTriggerElement);
        this.wrapperElement.appendChild(topnavElement);
        this.wrapperElement.appendChild(sidenavElement);
    }
    connectedCallback(){
        this.render();
    }
}
customElements.define("header-element", HeaderElement);