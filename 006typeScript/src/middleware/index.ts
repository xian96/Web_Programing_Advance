// import { Request, Response } from 'express';
import requestMiddleware from "./request";

let configMiddleware = (app) =>{
    console.log("heloo test this is an middleware!");
    app.use(requestMiddleware);
};

export default configMiddleware;