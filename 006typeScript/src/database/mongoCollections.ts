import dbConnection from "./mongoConnections";

const getCollectionFn = (collection : any) : any => {
    let _col = undefined;

    return async()=>{
        if(!_col){
            const db = await dbConnection();
            _col = await db.collection(collection);
        }

        return _col;
    }
}

const tasks = getCollectionFn("tasks");

export { tasks };