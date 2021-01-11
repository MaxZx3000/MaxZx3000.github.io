import JSONData from "./json-data.js";
import MatchTeamScore from "./match-team-score.js";

class Score extends JSONData{
    constructor(){
        super();
    }
    setFromJSON(jsonData){
        this.winner = jsonData.winner;
        this.duration = jsonData.duration;
        this.fullTime = new MatchTeamScore();
        this.fullTime.setMatchName("Full Time");
        this.fullTime.setFromJSON(jsonData.fullTime);
        
        this.halfTime = new MatchTeamScore();
        this.halfTime.setMatchName("Half Time");
        this.halfTime.setFromJSON(jsonData.halfTime);
        
        this.extraTime = new MatchTeamScore();
        this.extraTime.setMatchName("Extra Time");
        this.extraTime.setFromJSON(jsonData.extraTime);
        
        this.penalties = new MatchTeamScore();
        this.penalties.setMatchName("Penalties");
        this.penalties.setFromJSON(jsonData.penalties);
    }
    getWinner(){
        if (this.winner === null || this.winner === undefined){
            return "Not yet announced";
        }
        else{
            return this.winner;
        }
    }
}
export default Score;