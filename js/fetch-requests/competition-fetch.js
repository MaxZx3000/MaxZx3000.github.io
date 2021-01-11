import FetchHelper from "./fetch-helpers.js";

class CompetitionFetch extends FetchHelper{
    constructor(){
        super();
    }
    getAllCompetitions(parameters){
        return this.getJSONData(this.baseURL + `competitions${parameters}`);
    }
    getCompetitionById(id){
        return this.getJSONData(this.baseURL + `competitions/${id}`);
    }
}
export default CompetitionFetch;