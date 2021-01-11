import DatabaseHelper from "./db-helper.js";

class TeamsDatabase{
    constructor(){
        this.objectStoreName = "team";
        this.databaseHelper = new DatabaseHelper(this.objectStoreName);
    }
    getAllTeams(){
        return this.databaseHelper.getAllData();
    }
    getTeamById(id){
        return this.databaseHelper.getSpecificData(parseInt(id));
    }
    addOneTeam(team){
        return this.databaseHelper.addData(team);
    }
    deleteTeam(id){
        this.databaseHelper.deleteFunction = (store) => {
            store.delete(id);
        }
        return this.databaseHelper.deleteData();
    }
}
export default TeamsDatabase;