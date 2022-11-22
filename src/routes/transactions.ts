import { Request, Response, NextFunction } from "express";
import { TypedRequest } from "../interfaces";
import { vendingMachine } from "../db";

export class Transaction {
  public routes(app: any): void {
    // buy product
    // endpoint exposed to user
    app.route("/api/v1/buy").post(
      (
        req: TypedRequest<{},{
          amount: [],
          uniqueCode: number,
          unit?: string
        }>,
        res: Response,
      ) => {
        let resp:any
        try{
            const {amount,uniqueCode,unit} =req.body
            if(unit=="doller"){
                /**
                 * 
                 * If uint sumbmitted is in dollers convert to cents
                 * 
                 *  */  
                let computedAmount = amount.map(x=>x*100)
                resp = vendingMachine.buyProduct(computedAmount,uniqueCode)
            }else{
                resp = vendingMachine.buyProduct(amount,uniqueCode)
            }
            
        }catch(e){
            res.status(200).send({
                error:e
            });
        }
        
        res.status(200).send(resp);
      }
    );
    
  }
}
