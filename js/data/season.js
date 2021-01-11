import JSONData from "./json-data.js";
import Winner from "./winner.js";
import Score from "./score.js";

class Season extends JSONData{
    constructor(){
        super();
    }
    setFromJSON(json){
        this.id = json.id;
        this.startDate = json.startDate;
        this.endDate = json.endDate;
        this.currentMatchday = json.currentMatchday;
        if (json.winner !== null && json.winner !== undefined){
            this.winner = new Winner();
            this.winner.setFromJSON(json.winner);
        }
        else{
            this.winner = null;
        }
        this.utcDate = json.utcDate;
        this.status = json.status;
        this.venue = json.venue;
        this.matchday = json.matchday;
        this.stage = json.stage;
        this.group = json.group;
        if (json.score !== undefined && json.score !== null){
            this.score = new Score();
            this.score.setFromJSON(json.score);
        }
        else{
            this.score = null;
        }
    }
}
export default Season;