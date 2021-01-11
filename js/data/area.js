import JSONData from "./json-data.js";

class Area extends JSONData{
    setIndividually(id, name, countryCode, ensignUrl, parentAreaId, parentArea){
        this.id = id;
        this.name = name;
        this.countryCode = countryCode;
        this.ensignUrl = ensignUrl;
        this.parentAreaId = parentAreaId;
        this.parentArea = parentArea;
    }
    setFromJSON(json){
        this.id = json.id;
        this.name = json.name;
        this.countryCode = json.countryCode;
        this.ensignUrl = json.ensignUrl;
        this.parentAreaId = json.parentAreaId;
        this.parentArea = json.parentArea;
    }
}
export default Area;