import DatabaseV1 from "./version/db-v1.js";

class DatabaseHelper{
    constructor(objectStoreName){
        this.databaseName = "soccer_database";
        this.dbPromised = null;
        this.objectStoreName = objectStoreName;
        this.deleteFunction = (store) => {};
        this.versions = [new DatabaseV1(1)];
        this.openDatabase();
    }
    openDatabase(){
        let dbVersion = 1;
        this.dbPromised = idb.open(this.databaseName, dbVersion, (upgradeDB) => {
            this.versions[dbVersion-1].checkVersion(dbVersion, upgradeDB);
        });
    }
    addData(data){
        return new Promise((resolve, reject) => {
            this.dbPromised
                .then((db) => {
                    let transaction = db.transaction(this.objectStoreName, "readwrite");
                    let store = transaction.objectStore(this.objectStoreName);
                    store.add(data);
                    return transaction.complete;
                })
                .then(() => {
                    resolve(` has been successfully saved!`);
                })
                .catch(() => {
                    reject(` has already been saved!`);
                })
        });
    }
    getAllData(){
        return new Promise((resolve, reject) => {
            this.dbPromised
                .then((db) => {
                    let transaction = db.transaction(this.objectStoreName, "readonly");
                    let store = transaction.objectStore(this.objectStoreName);
                    return store.getAll();
                })
                .then((data) => {
                    resolve(data);
                })
        });
    }
    getSpecificData(property){
        return new Promise((resolve, reject) => {
            this.dbPromised
                .then((db) => {
                    let transaction = db.transaction(this.objectStoreName, "readonly");
                    let store = transaction.objectStore(this.objectStoreName);
                    return store.get(property);
                })
                .then((data) => {
                    resolve(data);
                })
        })
    }
    deleteData(){
        return new Promise((resolve, reject) => {
            this.dbPromised
                .then((db) => {
                    let transaction = db.transaction(this.objectStoreName, "readwrite");
                    let store = transaction.objectStore(this.objectStoreName);
                    this.deleteFunction(store);
                    return transaction.complete;
                })
                .then(() => {
                    resolve(` has been successfully deleted!`);
                })
                .catch(() => {
                    reject(` has already been deleted!`)
                })
        });
    }
}
export default DatabaseHelper;