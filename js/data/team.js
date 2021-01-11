import JSONData from "./json-data.js";
import Player from "./player.js";
import Area from "./area.js";

class Team extends JSONData{
    setFromJSON(jsonData){
        this.id = jsonData.id;
        if (jsonData.area !== null && jsonData.area !== undefined){
            this.area = new Area();
            this.area.setFromJSON(jsonData.area);
        }
        this.name = jsonData.name;
        this.shortName = jsonData.shortName;
        this.tla = jsonData.tla;
        this.crestUrl = jsonData.crestUrl;
        this.website = jsonData.website;
        this.address = jsonData.address;
        this.phone = jsonData.phone;
        this.email = jsonData.email;
        this.founded = jsonData.founded;
        this.clubColors = jsonData.clubColors;
        this.venue = jsonData.venue;
        if (jsonData.squad !== null && jsonData.squad !== undefined){
            this.squad = new Player();
            this.squad.setFromJSON(jsonData.squad);
        }
    }
    getEmail(){
        if (this.email === null || this.email === undefined || this.email === "null"){
            return "Not available";
        }
        else{
            return this.email;
        }
    }
}
export default Team;