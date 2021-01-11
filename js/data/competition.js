import Status from "../data/status.js";
import Formatter from "../formatter/formatter.js";
import Area from "./area.js";
import JSONData from "./json-data.js";
import Season from "./season.js";

class Competition extends JSONData{
    setFromJSON(json){
        this.id = json.id;
        this.area = new Area();
        this.area.setFromJSON(json.area);
        this.name = json.name;
        this.code = json.code;
        this.eblemURL = json.eblemURL;
        this.plan = json.plan;
        if (json.currentSeason !== null && json.currentSeason !== undefined){
            this.currentSeason = new Season();
            this.currentSeason.setFromJSON(json.currentSeason);
        }
        else{
            this.currentSeason = null;
        }
        this.numberOfAvailableSeasons = json.numberOfAvailableSeasons;
    }
    getPlan(){
        let formatter = new Formatter();
        return formatter.getCapitalizedSentence(this.plan, "_")
    }
    getStatusSeason(){
        if (this.currentSeason === null){
            return new Status("Unknown", "gray");
        }
        else{
            let todayDate = new Date();
            let convertedStartDate = new Date(this.currentSeason.startDate);
            let convertedEndDate = new Date(this.currentSeason.endDate);
            if (todayDate < convertedStartDate){
                return new Status("Not ready yet", "red");
            }
            else if (todayDate > convertedStartDate && todayDate < convertedEndDate){
                return new Status("Ongoing", "green");
            }
            else{
                return new Status("Finished", "blue");
            }
        }
        
    }
    getCompetitionCode(code){
        if (code === "null"){
            return code;
        }
        else{
            return "unknown";
        }
    }
}
export default Competition;