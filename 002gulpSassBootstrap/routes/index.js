const cardsRoute = require("./cards");

const constructorMethod = (app) =>{
    app.use("/", cardsRoute);

    app.use("*", (req, res)=>{
        res.redirect("/");
    });
};

module.exports = constructorMethod;