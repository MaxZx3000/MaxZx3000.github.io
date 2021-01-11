class Navigation{
    loadNav(navigationName="nav.html"){
        let navigationLocation = `../../../../pages/navigation/${navigationName}`;
        fetch(navigationLocation)
            .then((response) => {
                return response.text();
            })
            .then((responseText) => {
                document.querySelectorAll(".topnav, .sidenav").forEach((element) => {
                    element.innerHTML = `${responseText}`;
                });
                document.querySelectorAll(".topnav a, .sidenav a").forEach((element) => {
                    element.addEventListener("click", (event) => {
                        let sidenav = document.querySelector(".sidenav");
                        M.Sidenav.getInstance(sidenav).close();
                        let link = event.target.getAttribute("href").substr(1);
                        this.loadPage(link);
                    });
                });
            })
            .catch((error) => {
                console.error(`Error rendering page: ${error}`);
            });
    }
    loadPage(page){
        let categoryElement = document.querySelector("#content");
        let pageDirectory = "../../../../pages";
        let destination = page;
        if (destination === "" || destination === undefined) destination = `${pageDirectory}/lists/competitions-list.html`;
        else destination = `${pageDirectory}/${page}.html`;
        fetch(destination)
            .then((response) => {
                return response.text();
            })
            .then((responseText) => {
                categoryElement.innerHTML = responseText;
            })
            .catch((error) => {
                console.error(error);
            });
    }
}
export default Navigation;