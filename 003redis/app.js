const express = require("express");
const app = express();
const routeConfig = require("./route");

app.use(express.json());
app.use(express.urlencoded());

routeConfig(app);

app.listen(3000, ()=>{
    console.log("We've now got a server!");
    console.log("listen on: http://localhost:3000");
})