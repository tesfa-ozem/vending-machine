import {Request, Response} from "express";
import { vendingMachine } from "../db";
import {TypedRequest } from '../interfaces'
import Product from "../Product";



export class Inventory {
    public routes(app:any): void { //received the express instance from app.ts file 
        // fetch the products in the inventory        
        app.route('/api/v1/inventory:uid')
        .get((req: TypedRequest<{uid:string},{}>, res: Response) => {   
            if(req.query.uid!= undefined){
                let product = vendingMachine.productInventory.find((item:Product)=>item.uniqueCode.toString()==req.query.uid)
                res.status(200).send(JSON.stringify(product));
            }         
            res.status(200).send(JSON.stringify(vendingMachine.productInventory));
        })
        
        // initil setting of the inventory
        app.route('/api/v1/inventory')
        .post((req: Request, res: Response) => {            
            res.status(200).send(JSON.stringify(""));
        })    
        
        // updating the inventory
        app.route('/api/v1/inventory')
        .patch(())
    }

    
}