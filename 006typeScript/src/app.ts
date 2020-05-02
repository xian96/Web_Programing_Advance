import * as express from 'express';
import configRoute from './routes';
import configMiddleware from './middleware';
 
class App {
    public app: express.Application;
    public configRoute = configRoute;
    public configMiddleware = configMiddleware;

	constructor() {
		this.app = express();
		this.config();
        this.configRoute(this.app);
        this.configMiddleware(this.app);
	}

	private config(): void {
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: false }));
	}
}

export default new App().app;