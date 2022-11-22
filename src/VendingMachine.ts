import { IChange } from "./interfaces";
import { VendingError } from "./enums";
import debug from "debug";
import Product from "./Product";

class VendingMachine {
  productInventory: any;
  change: Array<IChange>;
  selectedProduct: any;
  constructor(
    productInventory: any,
    change: Array<IChange>,
    selectedProduct: any = null
  ) {
    this.productInventory = productInventory;
    this.change = change.sort((a, b) => a.cents - b.cents); // sort the change array
    this.selectedProduct = selectedProduct;
  }
  /**
   * purcheses a product from the vending machine
   *
   * @params amount - an array of cents that
   * make up the purchesing amount
   * @example amount = [20,50]
   * the centss have to be valid centss
   * @throws {@link VendingError.Wrongcents}
   *
   * @params uniqueCode - the unique id of the product
   *
   * @returns an object with the order details
   */
  public buyProduct = (amount: Array<number>, uniqueCode: number) => {
    this.selectedProduct = this.productInventory.find(
      (item: Product) => item.uniqueCode == uniqueCode
    );
    this.storeChange(amount);
    let totalAmount = amount.reduce((a, b) => a + b, 0);

    // checks if the product is available
    if (this.selectedProduct == undefined || this.selectedProduct == -1||this.selectedProduct.count<=0) {
      throw VendingError.ProductNotAvailable;
    }
    let unitPrice = this.selectedProduct.unitPrice;
    // checks if the amount paid is sufficient
    if (totalAmount < unitPrice) {
      throw VendingError.InsufficintFunds;
    }
    
    let inventoryIndex = this.productInventory.findIndex(
      (item: Product) => item.name == this.selectedProduct.name
    );

    this.productInventory[inventoryIndex].count -= 1;

    let changeDue = totalAmount - unitPrice;
    let changeBreakDown = this.getChange(changeDue);

    return {
      product: this.selectedProduct.name,
      cost_price: this.converToDollers(this.selectedProduct.unitPrice),
      paid_amount: this.converToDollers(totalAmount),
      change: this.converToDollers(changeDue),
      change_breake_down: changeBreakDown,
    };
  };

  /**
   * @returns a break down of the change due in form of centss
   *
   * @params amount - takes the change due in whole number form
   *
   * */
  public getChange = (amount: number) => {
    let change_due = [];
    let lenth = this.change.length;
    let computed_change:number
    let tracked_amount = amount

    /** 
     * loop throw the change available
     * */ 
    for (let i = lenth - 1; i >= 0; i--) {

      while (
        this.change[i].cents <= tracked_amount &&
        this.change[i].count != 0
      ) {
        tracked_amount -= this.change[i].cents;
        change_due.push({
          name: this.change[i].name,
          cents: this.change[i].cents,
        });
      }
    }

    // compute change available
    computed_change =change_due.reduce((a,b)=>a + b.cents,0)
    if(amount!=computed_change){
      
      throw VendingError.InsufficientChange
    }

    this.updateChage(change_due)
    return change_due;
  };
  /**
   * Updates the change in the vending machine with new amounts after transacton
   *
   * @example amount = [20,50]
   * the denomination have to be valid currency denomination else an exception
   * @throws {@link VendingError.WrongDenomination}
   *
   * */
  private storeChange = (amount: Array<number>) => {
    
    let index = 0;
    for (let i = 0; i <= amount.length - 1; i++) {
      index = this.change.findIndex((j) => j.cents == amount[i]);

      if (index == -1) {
        throw VendingError.WrongDenomination;
      }
      this.change[index].count += 1;
    }
  };

  private updateChage = (denominations:any)=>{
    denominations.forEach((element:any) => {
      let cashRegisterIndex = this.change.findIndex(item=>item.name==element.name)
      this.change[cashRegisterIndex].count -=1
    });
  }

  public converToDollers = (amount:number)=>{
    return `USD ${(amount/100).toFixed(2)}`
  }
}

export { VendingMachine };
