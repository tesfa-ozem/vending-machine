import express from 'express'
import * as bodyParser from 'body-parser'; //used to parse the form data that you pass in the request
import {Inventory} from './routes/inventory'
import {Transaction } from './routes/transactions'

class App {

    public app: express.Application;
    public inventoryRoutes: Inventory = new Inventory()
    public transactionRoutes: Transaction = new Transaction()

    constructor() {
        this.app = express(); //run the express instance and store in app
        this.config();
        this.inventoryRoutes.routes(this.app)
        this.transactionRoutes.routes(this.app)
    }

    private config(): void {
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({
            extended: false
        }));
    }

}

export default new App().app;