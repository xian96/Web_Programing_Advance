const peopleRoute = require("./apiPeople");

const constructor = (app) =>{
    app.use("/api/people/", peopleRoute);
    app.use("*", (req, res)=>{
        res.status(404).json("!404 not found!");
    });
}

module.exports = constructor;