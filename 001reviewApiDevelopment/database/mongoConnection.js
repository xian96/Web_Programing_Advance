const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;
const mongoConfig = {
    "serverUrl": "mongodb://localhost:27017",
    "database": "Xing_Jiaxian_cs554_lab1"
}

let _connection = undefined;
let _db = undefined;

async function constructor(){
    if(!_connection){
        _connection = await mongoClient.connect(mongoConfig.serverUrl, { useUnifiedTopology: true } );
        _db = await _connection.db(mongoConfig.database);
    }
    return _db;
}

module.exports = constructor;