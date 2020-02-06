const requestMiddleware = require("./request");

module.exports = (app) => {
    app.use(requestMiddleware);
}