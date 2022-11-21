import { Request, Response } from "express";
import { vendingMachine } from "../db";
import { IProduct, TypedRequest } from "../interfaces";
import Change from "../models/Change";

export class CashRegister {
  public routes(app: any): void {
    // get the change in the machine
    app
      .route("/api/v1/change")
      .get((req: TypedRequest<{}, {}>, res: Response) => {
        res.status(200).send(JSON.stringify(vendingMachine.change));
      });

    // replenish the change in the machine
    app
      .route("/api/v1/inventory")
      .put(
        (
          req: TypedRequest<{ cents: string }, { count: number }>,
          res: Response
        ) => {
          const { cents } = req.query;
          const { count } = req.body;

          let changeIndex = vendingMachine.change.findIndex(
            (item: Change) => item.cents.toString() == cents
          );
          vendingMachine.change[changeIndex].count = count;
          res.status(200).send(
            JSON.stringify({
              message: `Successfuly updated ${vendingMachine.change[changeIndex].name}`,
            })
          );
        }
      );

    // withdraw change in the systm
    app
      .route("/api/v1/withdraw")
      .post((req: TypedRequest<{}, {amount:number,unit?:string}>, res: Response) => {
        const { amount,unit } = req.body;
        let withdrawnAmount:any
        try{
        if(unit=="doller"){
          withdrawnAmount = vendingMachine.getChange(amount*100)
        }else{
          withdrawnAmount = vendingMachine.getChange(amount)
        }
      
        res.status(200).send(JSON.stringify({
          "message":`withdrawn successful`,
          data:withdrawnAmount
        }));

      }catch(e){
        res.status(400).send(JSON.stringify({
          error:e
        }))
      }
      });
  }
}
