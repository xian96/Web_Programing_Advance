const express = require("express");
const app =express();

app.listen(process.env.PORT||3000, process.env.IP, (req,res)=>{
    console.log("express start listening!");
})