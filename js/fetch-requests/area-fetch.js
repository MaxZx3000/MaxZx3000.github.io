import FetchHelper from "./fetch-helpers.js";

class AreaFetch extends FetchHelper{
    constructor(){
        super();
    }
    getAllAreas(parameters=""){
        return this.getJSONData(this.baseURL + `areas${parameters}`);
    }
}
export default AreaFetch;