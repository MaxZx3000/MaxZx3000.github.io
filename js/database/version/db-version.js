class DatabaseVersion{
    constructor(version){
        this.version = version;
        this.objectStores = []; 
    }
    setObjectStores(objectStores){
        this.objectStores = objectStores;
    }
    checkVersion(dbVersion, upgradeDB){
        if (this.version === dbVersion){
            this.initializeObjectStores(upgradeDB);
        }
    }
    initializeObjectStores(upgradeDB){
        this.objectStores.forEach((objectStore) => {
            let dbObjectStore = upgradeDB.createObjectStore(objectStore.name, {keyPath: objectStore.keyPath});
            objectStore.indexProperties.forEach((index) => {
                dbObjectStore.createIndex(index.name, index.keyPath, index.options);
            });
        });
    }
}
export default DatabaseVersion;