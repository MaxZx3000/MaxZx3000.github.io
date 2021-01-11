import "./js/web-components/pages/detail-page/matches_detail-element.js";
import "./js/web-components/pages/detail-page/teams_detail-element.js";
import "./js/web-components/elements/core/detail-header.js";
import "./js/web-components/elements/core/footer.js";
import Navigation from "./js/web-components/pages/navigation/nav.js";

document.addEventListener("DOMContentLoaded", () => {
    let navigation = new Navigation();
    let urlSearchParams = new URLSearchParams(window.location.search);
    let pageName = urlSearchParams.get("page");
    navigation.loadPage(pageName);
});