import DatabaseHelper from "./db-helper.js";

class PlayerDatabase{
    constructor(){
        this.objectStoreName = "player";
        this.databaseHelper = new DatabaseHelper(this.objectStoreName);
    }
    getAllPlayers(){
        return this.databaseHelper.getAllData();
    }
    addPlayer(player){
        return this.databaseHelper.addData(player);
    }
    deletePlayer(id){
        this.databaseHelper.deleteFunction = (store) => {
            store.delete(id);
        }
        return this.databaseHelper.deleteData();
    }
}
export default PlayerDatabase;