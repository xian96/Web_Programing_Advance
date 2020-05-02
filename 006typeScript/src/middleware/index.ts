import { Request, Response } from 'express';
import {routes as requestMiddleware} from "./request";

let configMiddleware = (app) =>{
    requestMiddleware(app);
};

export default configMiddleware;