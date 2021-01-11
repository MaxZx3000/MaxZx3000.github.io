importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

if (workbox){
    console.log("Workbox has been successfully registered!")
}
else{
    console.log("Workbox failed to load!");
}

const cssDirectory = [
    "/css/pages/competition_list-element.css",
    "/css/pages/matches_detail-element.css",
    "/css/pages/matches_list-element.css",
    "/css/pages/saved_list-element.css",
    "/css/pages/teams_detail-element.css",
    "/css/pages/teams_list-element.css",
    "/css/card.css",
    "/css/footer.css",
    "/css/header.css",
    "/css/loading.css",
    "/css/main.css",
    "/css/materialize.min.css",
    "/css/no_data-element.css",
    "/css/status.css"
];
const imageDirectory = [
    "/images/Stadium 1.jpg",
    "/images/no-image-icon.jpg",
    "/images/icons/SoccerAppIcon_192x192.png",
    "/images/icons/SoccerAppIcon_256x256.png",
    "/images/icons/SoccerAppIcon_512x512.png"
];
const jsDirectory = [
    "/js/data/area.js",
    "/js/data/competition.js",
    "/js/data/current-season.js",
    "/js/data/fab-properties.js",
    "/js/data/icon-properties.js",
    "/js/data/json-data.js",
    "/js/data/match-team-score.js",
    "/js/data/match.js",
    "/js/data/player.js",
    "/js/data/score.js",
    "/js/data/season.js",
    "/js/data/size.js",
    "/js/data/status.js",
    "/js/data/team.js",
    "/js/data/winner.js",
    "/js/database/object-store/index-properties.js",
    "/js/database/object-store/object-store-properties.js",
    "/js/database/version/db-v1.js",
    "/js/database/version/db-version.js",
    "/js/database/db-competitions.js",
    "/js/database/db-helper.js",
    "/js/database/db-matches.js",
    "/js/database/db-player.js",
    "/js/database/db-teams.js",
    "/js/database/idb.js",
    "/js/fetch-requests/area-fetch.js",
    "/js/fetch-requests/competition-fetch.js",
    "/js/fetch-requests/fetch-helpers.js",
    "/js/fetch-requests/match-fetch.js",
    "/js/fetch-requests/player-fetch.js",
    "/js/fetch-requests/scorer-fetch.js",
    "/js/fetch-requests/team-fetch.js",
    "/js/formatter/formatter.js",
    "/js/web-components/elements/core/abstract-header.js",
    "/js/web-components/elements/core/detail-header.js",
    "/js/web-components/elements/core/footer.js",
    "/js/web-components/elements/core/list-header.js",
    "/js/web-components/elements/abstract-element.js",
    "/js/web-components/elements/card-element.js",
    "/js/web-components/elements/custom-element.js",
    "/js/web-components/elements/floating-action-button.js",
    "/js/web-components/elements/grid-component.js",
    "/js/web-components/elements/loading-element.js",
    "/js/web-components/elements/no_data-element.js",
    "/js/web-components/elements/notification-component.js",
    "/js/web-components/elements/select-element.js",
    "/js/web-components/pages/detail-page/abstract_detail-element.js",
    "/js/web-components/pages/detail-page/matches_detail-element.js",
    "/js/web-components/pages/detail-page/teams_detail-element.js",
    "/js/web-components/pages/list-page/competition_list-element.js",
    "/js/web-components/pages/list-page/matches_list-element.js",
    "/js/web-components/pages/list-page/saved_list-element.js",
    "/js/web-components/pages/list-page/teams_list-element.js",
    "/js/web-components/template/competitions_card-element.js",
    "/js/web-components/template/matches_card-element.js",
    "/js/web-components/template/players_card-element.js",
    "/js/web-components/template/teams_card-element.js",
    "/js/web-components/pages/navigation/nav.js",
    "/js/materialize.min.js"
];

const pagesDirectory = [
    "/pages/details/matches_detail.html",
    "/pages/details/teams_detail.html",
    "/pages/lists/competitions-list.html",
    "/pages/lists/matches-list.html",
    "/pages/lists/saved-list.html",
    "/pages/lists/teams-list.html",
    "/pages/navigation/nav.html"
];

const rootDirectory = [
    "/detail.html",
    "/details.js",
    "/index.html",
    "/index.js",
    "/manifest.json",
    "/service-worker.js",
    "/service-worker-initializer.js"
]

const fontsURL = [
    "https://fonts.googleapis.com/css2?family=Jura:wght@700&display=swap",
    "https://fonts.gstatic.com/s/jura/v15/z7NOdRfiaC4Vd8hhoPzfb5vBTP266purR_ibHw.woff2",
    "https://fonts.gstatic.com/s/jura/v15/z7NOdRfiaC4Vd8hhoPzfb5vBTP266puiR_ibHw.woff2",
    "https://fonts.gstatic.com/s/jura/v15/z7NOdRfiaC4Vd8hhoPzfb5vBTP266puqR_ibHw.woff2",
    "https://fonts.gstatic.com/s/jura/v15/z7NOdRfiaC4Vd8hhoPzfb5vBTP266pulR_ibHw.woff2",
    "https://fonts.gstatic.com/s/jura/v15/z7NOdRfiaC4Vd8hhoPzfb5vBTP266pupR_ibHw.woff2",
    "https://fonts.gstatic.com/s/jura/v15/z7NOdRfiaC4Vd8hhoPzfb5vBTP266puoR_ibHw.woff2",
    "https://fonts.gstatic.com/s/jura/v15/z7NOdRfiaC4Vd8hhoPzfb5vBTP266pumR_g.woff2",
    "https://fonts.googleapis.com/icon?family=Material+Icons",
    "https://fonts.gstatic.com/s/materialicons/v70/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2"
]

const convertToPrecaches = (urls, revision) => {
    let cacheProperties = [];
    urls.forEach((urlCache) => {
        cacheProperties.push({url: urlCache, revision: revision});
    });
    return cacheProperties;
}

const urlsToCache = [
    ...convertToPrecaches(fontsURL, '1'),
    ...convertToPrecaches(rootDirectory, '1'),
    ...convertToPrecaches(pagesDirectory, '1'),
    ...convertToPrecaches(imageDirectory, '1'),
    ...convertToPrecaches(cssDirectory, '1'),
    ...convertToPrecaches(imageDirectory, '1'),
    ...convertToPrecaches(jsDirectory, '1'),
];

workbox.precaching.precacheAndRoute([
    ...urlsToCache
],
{ignoreUrlParametersMatching: [/.*/]})

workbox.routing.registerRoute(
    new RegExp('https://api.football-data.org/v2/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: "football-cache",
    })
)

self.addEventListener("push", (event) => {
    let body;
    if (event.data){
        body = event.data.text();
    }
    else{
        body = "Push message with no payload!"
    }

    let options = {
        body: body,
        vibrate: [100, 100, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    }
    event.waitUntil(
        self.registration.showNotification('Soccer App Push Notification', options)
    )
});