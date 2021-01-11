import DatabaseHelper from "./db-helper.js";

class CompetitionsDatabase{
    constructor(){
        this.objectStoreName = "competition";
        this.databaseHelper = new DatabaseHelper(this.objectStoreName);        
    }
    getAllCompetitions(){
        return this.databaseHelper.getAllData();
    }
    addCompetition(competition){
        return this.databaseHelper.addData(competition);
    }
    deleteCompetition(id){
        this.databaseHelper.deleteFunction = (store) => {
            store.delete(id);
        };
        return this.databaseHelper.deleteData();
    }
}

export default CompetitionsDatabase;