const cardsRoute = require("./cards");

const constructorMethod = (app) =>{
    app.use("/", cardsRoute);

    app.use("*", (req, res)=>{
        res.status(404).json("404 error!");
    });
};

module.exports = constructorMethod;