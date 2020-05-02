import { Request, Response } from 'express';
import { Api as apiRoute} from "./api";

let configRoute = (app) =>{
    app.use("/api/tasks", new apiRoute().routes(app));

    app.use("*", (req : Request, res : Response) =>{
        res.status(404).json("Page Not Found");
    });
};

export default configRoute;