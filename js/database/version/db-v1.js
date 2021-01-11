import DatabaseVersion from "./db-version.js";
import ObjectStoreProperties from "../object-store/object-store-properties.js";
import IndexProperties from "../object-store/index-properties.js";

class DatabaseV1 extends DatabaseVersion{
    constructor(version){
        super(version);
        let objectStoresV1 = [new ObjectStoreProperties("competition", "id", [new IndexProperties("name", "name", {unique: false})]),
                              new ObjectStoreProperties("match", "id", [new IndexProperties("name", "name", {unique: false})]),
                              new ObjectStoreProperties("player", "id", [new IndexProperties("name", "name", {unique: false})]),
                              new ObjectStoreProperties("team", "id", [new IndexProperties("name", "name", {unique: false})])];
        this.setObjectStores(objectStoresV1);
    }
}
export default DatabaseV1