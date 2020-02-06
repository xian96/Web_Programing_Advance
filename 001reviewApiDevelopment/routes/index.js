const apiRoute = require("./api");

module.exports = (app) =>{
    app.use("/api/tasks", apiRoute);

    app.use("*", (req, res) =>{
        res.status(404).json("Page Not Found");
    })
}