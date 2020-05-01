const express       = require("express");
const exphbs        = require('express-handlebars');
const routeConfig   = require("./routes");
const app           = express();

app.engine('handlebars', exphbs());
app.use(express.static(__dirname+ "/public"));
app.set("view engine", "handlebars");

routeConfig(app);

app.listen(3000, ()=>{
    console.log("We've now got a server!");
    console.log("listen on: http://localhost:3000");
});