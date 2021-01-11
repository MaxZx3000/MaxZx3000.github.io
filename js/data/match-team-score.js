import JSONData from "./json-data.js";

class MatchTeamScore extends JSONData{
    constructor(){
        super();
        this.noScoreMessage = "-";
    }
    setMatchName(name){
        this.name = name;
    }
    setFromJSON(json){
        this.homeTeam = json.homeTeam;
        this.awayTeam = json.awayTeam;
    }
    getHomeTeamScore(){
        if (this.homeTeam === null || this.homeTeam === undefined){
            return this.noScoreMessage;
        }
        else{
            return this.homeTeam;
        }
    }
    getAwayTeamScore(){
        if (this.awayTeam === null || this.awayTeam === undefined){
            return this.noScoreMessage;
        }
        else{
            return this.awayTeam;
        }
    }
}
export default MatchTeamScore;