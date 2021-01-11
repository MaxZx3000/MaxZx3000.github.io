import Formatter from "../formatter/formatter.js";
import Competition from "./competition.js";
import JSONData from "./json-data.js";
import Score from "./score.js";
import Season from "./season.js";
import Team from "./team.js";

class Match extends JSONData{
    constructor(){
        super();
    }
    setFromJSON(json){
        this.id = json.id;
        this.competition = new Competition();
        this.competition.setFromJSON(json.competition);
        this.season = new Season();
        this.season.setFromJSON(json.season);
        this.utcDate = json.utcDate;
        this.status = json.status;
        this.matchday = json.matchday;
        this.stage = json.stage;
        this.group = json.group;
        this.score = new Score();
        this.score.setFromJSON(json.score);
        this.homeTeam = new Team();
        this.homeTeam.setFromJSON(json.homeTeam);
        this.awayTeam = new Team();
        this.awayTeam.setFromJSON(json.awayTeam);
        this.referees = json.referees;
    }
    getStatus(){
        let formatter = new Formatter();
        let newText = formatter.getSentenceCase(this.status);
        return newText;
    }
    getMatchDate(){
        let date = this.utcDate;
        let formatter = new Formatter();
        let leftStringDate = formatter.getDateOnly(date)
        let finalText =  formatter.getHumanReadableDate(leftStringDate);                       
        return finalText;
    }
    getStage(){
        if (this.stage !== null){
            let splittedText = this.stage.split('_');
            let formatter = new Formatter();
            let finalText = formatter.getSentenceCase(splittedText[0]) + " " + formatter.getSentenceCase(splittedText[1]);
            return finalText;
        }
        else{
            return "Unknown";
        }
    }
}
export default Match;