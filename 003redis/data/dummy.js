// const axios = require('axios');

async function getAll() {
    //axios not work:
    //const {dummy} = await axios.get('https://gist.githubusercontent.com/philbarresi/5cf15393d245b38a2d86ce8207d5076c/raw/d529fb474c1af347702ca4d7b992256237fa2819/lab5.json');// the data read from the web resources professor gived;
    
    //using the local data:
    const dummy = require('./localData').data;
    // console.log(typeof dummy);
    
    return dummy;
}

async function getById(id){
    try{
        // console.log('get by id ' + id);
        const data = await getAll();
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // find project
                if (!id)
                    reject(new Error(`You must provide an id for person. what you provide:${id}`));;
                for (let i = 0; i < data.length; i++) {//loop through each person, if id not sorted;
                    // console.log(typeof data[i].id + " " + typeof id);
                    // console.log(data[i].id === id);
                    if (data[i].id === id){
                        resolve(data[i]);
                    }
                }
                reject(new Error(`person in id:${id} is Not found!`));
            }, 5000);
        })
    }catch(e){
        throw e;
    }
}

module.exports = {
    getById
};