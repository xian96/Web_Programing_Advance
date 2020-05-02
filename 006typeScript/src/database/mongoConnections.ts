import { MongoClient } from "mongodb";

const mongoConfig: any = {
    "serverUrl": "mongodb://localhost:27017",
    "database": "Xing_Jiaxian_cs554_lab1"
}

let _connection: any = undefined;
let _db: any = undefined;

export default async function constructor(){
    if(!_connection){
        _connection = await MongoClient.connect(mongoConfig.serverUrl, { useUnifiedTopology: true } );
        _db = await _connection.db(mongoConfig.database);
    }
    return _db;
}