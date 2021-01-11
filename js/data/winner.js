import JSONData from "./json-data.js";

class Winner extends JSONData{
    constructor(){
        super();
    }
    setFromJSON(json){
        this.id = json.id;
        this.name = json.name;
        this.shortName = json.shortName;
        this.tla = json.tla;
        this.crestUrl = json.crestUrl;
    }
}
export default Winner;