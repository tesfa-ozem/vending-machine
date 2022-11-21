import { IChange } from "./interfaces";
import { VendingError } from "./enums";
import debug from "debug";
import Product from "./models/Product";

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
    let totalAmount = amount.reduce((a, b) => a + b, 0);

    // checks if the product is available
    if (this.selectedProduct == undefined || this.selectedProduct == -1) {
      throw VendingError.ProductNotAvailable;
    }
    let unitPrice = this.selectedProduct.unitPrice;
    // checks if the amount paid is sufficient
    if (totalAmount < unitPrice) {
      throw VendingError.InsufficintFunds;
    }

    let changeDue = totalAmount - unitPrice;

    let changeBreakDown = this.getChange(changeDue);

    this.updateChange(amount);
    let inventoryIndex = this.productInventory.findIndex(
      (item: Product) => item.name == this.selectedProduct.name
    );

    this.productInventory[inventoryIndex].count -= 1;

    return {
      product: this.selectedProduct.name,
      cost_price: this.selectedProduct.unitPrice,
      paid_amount: totalAmount,
      change: changeDue,
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
        // Deduct money from the change register
        this.change[i].count -= 1;
      }
    }

    // compute change available
    computed_change =change_due.reduce((a,b)=>a + b.cents,0)
    console.log(amount,computed_change)
    if(amount!=computed_change){
      
      throw VendingError.InsufficientChange
    }
    return change_due;
  };
  /**
   * Updates the change in the vending machine with new amounts after transacton
   *
   * @example amount = [20,50]
   * the centss have to be valid centss else an exception
   * @throws {@link VendingError.Wrongcents}
   *
   * */
  private updateChange = (amount: Array<number>) => {
    // check if the centss inserted are valid
    let index = 0;
    for (let i = 0; i <= amount.length - 1; i++) {
      index = this.change.findIndex((j) => j.cents == amount[i]);

      if (index == -1) {
        throw VendingError.Wrongcents;
      }
      this.change[index].count += 1;
    }
  };
}

export { VendingMachine };
