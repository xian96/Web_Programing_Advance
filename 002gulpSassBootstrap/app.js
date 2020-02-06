const express = require("express");
const app = express();
const handlebar = require("")

app.get("/", (req, res)=>{
    try{
        res.json("hello world");
    }catch(e){
        res.status(404).json(`error: ${e}`)
    }
})

app.listen(3000, (req, res)=>{
    console.log("listen on: http://localhost:3000");
})