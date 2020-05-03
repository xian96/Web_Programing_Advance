import { Request, Response } from 'express';
import apiRoute from "./api";

let configRoute = (app) =>{
    app.use("/api/tasks", apiRoute);

    app.use("*", (req : Request, res : Response) =>{
        res.status(404).json("Page Not Found");
    });
};

export default configRoute;