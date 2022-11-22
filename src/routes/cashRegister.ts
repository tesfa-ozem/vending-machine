import { Request, Response } from "express";
import { vendingMachine } from "../db";
import { IChange, TypedRequest } from "../interfaces";
import Change from "../models/Change";

export class CashRegister {

  // endpoints exposed to technician
  public routes(app: any): void {

    // setup change in the cash register
    /** 
     * This endpoints will normaly require authentication
     * */ 
    app
      .route("/api/v1/change")
      .post((req: TypedRequest<{}, Array<IChange>>, res: Response) => {
        try{
          const change = req.body
          let error_array :Array<string> = []
          change.forEach((item:any)=>
            {
              let index = vendingMachine.change.findIndex((cg:IChange)=>cg.name==item.name)
              if(index==-1){
                vendingMachine.change.push(item)
              }else{
                error_array.push(`${item.name} already exists, try updating the value`)
              }
            }
            
          )
        
        res.status(200).send(JSON.stringify({message:vendingMachine.change,errors:error_array}));
        }catch(e){
          res.status(400).send(JSON.stringify({
            error:e
          }))
        }
      });

    // get available change in the machine
    app
      .route("/api/v1/change")
      .get((req: TypedRequest<{}, {}>, res: Response) => {
        res.status(200).send(JSON.stringify(vendingMachine.change));
      });

    // replenish the change in the machine
    app
      .route("/api/v1/change")
      .put(
        (
          req: TypedRequest<{  }, Array<{name:string,count:number}>>,
          res: Response
        ) => {
          try {
            const  float  = req.body;
            float.forEach(item=>{
              let changeIndex = vendingMachine.change.findIndex(
                (change: Change) => change.name.toString() == item.name
              );
              vendingMachine.change[changeIndex].count += item.count;
            })
            
            res.status(200).send(
              JSON.stringify({
                message: `Successfuly updated change`,
              })
            );
          } catch (error) {
            res.status(400).send(JSON.stringify({
              error:error
            }))
          }
         
        }
      );

    // withdraw available change in the systme
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

      }catch(error){
        res.status(400).send(JSON.stringify({
          error:error
        }))
      }
      });
  }
}
