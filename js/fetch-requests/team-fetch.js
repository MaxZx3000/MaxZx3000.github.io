import FetchHelper from "./fetch-helpers.js";

class TeamFetch extends FetchHelper{
    constructor(){
        super();
    }
    getAllTeams(){
        return this.getJSONData(this.baseURL + `teams`);
    }
    getIndividualTeamById(id){
        return this.getJSONData(this.baseURL + `teams/${id}`);
    }

}
export default TeamFetch;