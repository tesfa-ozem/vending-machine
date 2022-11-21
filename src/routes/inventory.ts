import {Request, Response} from "express";
import { vendingMachine } from "../db";



export class Inventory {
    public routes(app:any): void { //received the express instance from app.ts file 
        // fetch the products in the inventory        
        app.route('/api/v1/inventory')
        .get((req: Request, res: Response) => {            
            res.status(200).send(JSON.stringify(vendingMachine.productInventory));
        })  
        app.route('/api/v1/inventory')
        .post((req: Request, res: Response) => {            
            res.status(200).send(JSON.stringify(""));
        })          
    }

    
}