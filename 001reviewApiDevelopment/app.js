const express = require("express");
const app =express();
const bodyParser = require("body-parser");

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded());
app.use(express.json());

const configMiddleware = require("./middleware");
configMiddleware(app);

const configRoute = require("./routes");
configRoute(app);

app.listen(process.env.PORT||3000, process.env.IP, (req,res)=>{
    console.log("express start listening!");
    console.log("Your routes will be running on http://localhost:3000");
})