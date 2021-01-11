import Formatter from "../formatter/formatter.js";
import JSONData from "./json-data.js";
import Status from "../data/status.js";

class Player extends JSONData{
    setFromJSON(json){
        this.id = json.id;
        this.name = json.name;
        this.position = json.position;
        this.dateOfBirth = json.dateOfBirth;
        this.countryOfBirth = json.countryOfBirth;
        this.nationality = json.nationality;
        this.role = json.role;
    }
    setTeamName(teamName){
        this.teamName = teamName;
    }
    getPosition(){
        if (this.position === null || this.position === undefined){
            let formatter = new Formatter();
            let finalText = formatter.getCapitalizedSentence(this.role, "_");
            return finalText;
        }
        else{
            return this.position;
        }
    }
    getBirthDate(){
        if (this.dateOfBirth === null || this.dateOfBirth === undefined){
            return "Unknown";
        }
        else{
            let formatter = new Formatter();
            let finalText = formatter.getDateOnly(this.dateOfBirth);
            let humanReadableDate = formatter.getHumanReadableDate(finalText);
            return humanReadableDate;
        }
    }
    getRoleStatus(){
        let formatter = new Formatter();
        let finalText = formatter.getSentenceCase(this.role);
        let roleStatus;
        if (this.role === "PLAYER"){
            roleStatus = new Status(finalText, "green");
        }
        else if (this.role === "COACH"){
            roleStatus = new Status(finalText, "blue");
        }
        else{
            roleStatus = new Status(finalText, "red");
        }
        return roleStatus;
    }
}
export default Player;