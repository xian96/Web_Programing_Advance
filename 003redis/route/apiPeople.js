const express = require("express");
const router = express.Router();
const dummyData = require("../data").dummy;

const redis = require("redis");
const client = redis.createClient();
const bluebird = require("bluebird");

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

router.get("/history", async (req, res)=>{
    //This route will respond with an array of the last 20 users in the cache from the recently viewed list.
    try{
        const ids = await client.lrangeAsync("users", 0, 19);
        const result = [];
        for(let i = 0; i < ids.length; i++){
            result.push(JSON.parse(await client.getAsync(ids[i])));
        }
        res.json(result);
    }catch(e){
        res.status(500).json(`error 500 : ${e}`);        
    }
});

router.get("/:id", async (req, res)=>{
    try{
        let id = req.params.id;
        // console.log(typeof id);
        if(!id || isNaN(id)){
            throw `You must provide an number type of id for person. You provide is:${id}`;
        }
        id = parseInt(id);
        // console.log( typeof id);

        // 1) Check if the user has a cache entry in redis. If so, render the result from that cache entry
        let person = await client.getAsync(id);
        if (person) {
            await client.lpushAsync("users", id);//push to first
            res.json(JSON.parse(person));
        }else{
        // 2) If not, query the data module for the person and fail the request if they are not found, or send JSON and cache the result if they are found.
            person = await dummyData.getById(id);

            await client.setAsync(id, JSON.stringify(person)); //JSON.stringyfy(personFind)
            await client.lpushAsync("users", id);//push to first
            person = await client.getAsync(id);
            res.json(JSON.parse(person));
        }
    }catch(e){
        res.status(500).json(`error 500 : ${e}`);
    }
});

module.exports = router;