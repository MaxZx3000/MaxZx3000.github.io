import FetchHelper from "./fetch-helpers.js";

class MatchFetch extends FetchHelper{
    constructor(){
        super();
    }
    getAllMatches(parameters=""){
        return this.getJSONData(this.baseURL + `matches${parameters}`);
    }
    getMatchById(id){
        return this.getJSONData(this.baseURL + `matches/${id}`);
    }
}
export default MatchFetch;