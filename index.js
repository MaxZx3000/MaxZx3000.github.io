import "./js/web-components/elements/core/footer.js";
import "./js/web-components/elements/core/list-header.js";
import "./js/web-components/pages/navigation/nav.js";
import "./js/web-components/pages/list-page/teams_list-element.js";
import "./js/web-components/pages/list-page/competition_list-element.js";
import "./js/web-components/pages/list-page/matches_list-element.js";
import "./js/web-components/pages/detail-page/matches_detail-element.js";
import "./js/web-components/elements/loading-element.js";
import "./js/web-components/pages/list-page/saved_list-element.js";

import Navigation from "./js/web-components/pages/navigation/nav.js";

document.addEventListener("DOMContentLoaded", () => {
    let sidenavElements = document.querySelectorAll(".sidenav");
    M.Sidenav.init(sidenavElements);
    let navigation = new Navigation();
    navigation.loadNav();
    
    let urlSearchParam = window.location.hash.substr(1)
    navigation.loadPage(urlSearchParam);
});