import { Request, Response, NextFunction } from "express";
import { TypedRequest } from "../interfaces";
import { vendingMachine } from "../db";

export class Transaction {
  public routes(app: any): void {
    //received the express instance from app.ts file
    // buy product
    app.route("/api/v1/buy").post(
      (
        req: TypedRequest<{},{
          amount: [],
          uniqueCode: number
        }>,
        res: Response,
        next: NextFunction
      ) => {
        let resp:any
        console.log(req.body.amount,req.body.uniqueCode)
        try{
            resp = vendingMachine.buyProduct(req.body.amount,req.body.uniqueCode)
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
