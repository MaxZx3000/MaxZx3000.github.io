class ObjectStoreProperties{
    constructor(name, keyPath, indexProperties=[]){
        this.name = name;
        this.keyPath = keyPath;
        this.indexProperties = indexProperties;
    }
}
export default ObjectStoreProperties;