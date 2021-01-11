import DatabaseHelper from "./db-helper.js";

class MatchesDatabase{
    constructor(){
        this.objectStoreName = "match";
        this.databaseHelper = new DatabaseHelper(this.objectStoreName);
    }
    getAllMatches(){
        return this.databaseHelper.getAllData();
    }
    getMatchById(id){
        return this.databaseHelper.getSpecificData(id);
    }
    addOneMatch(match){
        return this.databaseHelper.addData(match);
    }
    deleteMatch(id){
        this.databaseHelper.deleteFunction = (store) => {
            store.delete(id);
        }
        return this.databaseHelper.deleteData();
    }
}
export default MatchesDatabase;