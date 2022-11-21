import {Request, Response} from "express";
import { vendingMachine } from "../db";
import {IProduct, TypedRequest } from '../interfaces'
import Product from "../models/Product";



export class Inventory {
    public routes(app:any): void { //received the express instance from app.ts file 
        // fetch the products in the inventory        
        app.route('/api/v1/inventory')
        .get((req: TypedRequest<{uid:string},{}>, res: Response) => {
            const { uid } = req.query;   
            if(uid){
                
                let product = vendingMachine.productInventory.find((item:Product)=>item.uniqueCode.toString()==uid)
                res.status(200).send(JSON.stringify(product));
            }         
            res.status(200).send(JSON.stringify(vendingMachine.productInventory));
        })
        
        // Configur of the inventory
        app.route('/api/v1/inventory')
        .post((req: TypedRequest<{},Array<IProduct>>, res: Response) => { 
            const products = req.body  
            products.forEach(element => {
                vendingMachine.productInventory.push(element)
            });
            res.status(200).send(JSON.stringify({
                message:"successfuly added new products",
                data:products
            }));
        })    
        
        // updating the inventory
        app.route('/api/v1/inventory/:uid')
        .put((req: TypedRequest<{uid:string},{count:number}>, res: Response)=>{
            const {uid } = req.params
            const {count} = req.body
            let productIndex = vendingMachine.productInventory.findIndex((item:Product)=>item.uniqueCode.toString()==uid)
            vendingMachine.productInventory[productIndex].count = count

            res.status(200).send(JSON.stringify(vendingMachine.productInventory[productIndex]))
        })

        // remove a product
        app.route('/api/v1/inventory/:uid')
        .delete((req: TypedRequest<{uid:string},{}>, res: Response)=>{
            const {uid } = req.params
            let productIndex = vendingMachine.productInventory.findIndex((item:Product)=>item.uniqueCode.toString()==uid)
            vendingMachine.productInventory.splice(1, productIndex)

            res.status(200).send(JSON.stringify({
                "message":`removed ${vendingMachine.productInventory[productIndex].name} from the inventory`}))
        })

    }

    
}