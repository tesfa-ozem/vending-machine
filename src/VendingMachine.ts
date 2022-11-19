import { IChange, IProductInventory } from "./interfaces";
import { VendingError } from "./enums";
import debug from 'debug';

class VendingMachine {
  productInventory: Array<IProductInventory>;
  change: Array<IChange>;
  selectedProduct: any;
  constructor(
    productInventory: Array<IProductInventory>,
    change: Array<IChange>,
    selectedProduct: any = null
  ) {
    this.productInventory = productInventory;
    this.change = change;
    this.selectedProduct = selectedProduct;
  }
  /**
   * purcheses a product from the vending machine
   *
   * @params amount - an array of denomination that
   * make up the purchesing amount
   * @example amount = [20,50]
   * the denominations have to be valid denominations
   * @throws {@link VendingError.WrongDenomination}
   *
   * @params uniqueCode - the unique id of the product
   *
   * @returns an object with the order details
   */
  public buyProduct = (amount: Array<number>, uniqueCode: number) => {
    this.selectedProduct = this.productInventory.find(
      (item) => item.product.uniqueCode == uniqueCode
    );
    let totalAmount = amount.reduce((a, b) => a + b, 0);
    

    // checks if the product is available
    if (this.selectedProduct == undefined ||this.selectedProduct==-1 ) {
      throw VendingError.ProductNotAvailable;
    }
    let unitPrice = this.selectedProduct.product.unitPrice;
    // checks if the amount paid is sufficient
    if (totalAmount < unitPrice) {
      throw VendingError.InsufficintFunds;
    }

    let changeDue = totalAmount - unitPrice;

    let changeBreakDown = this.getChange(changeDue);

    // Checks if their is sufficient change before completing the transaction
    if (changeBreakDown.length == 0) {
      throw VendingError.InsufficientChange;
    }
    this.updateChange(amount);
    let inventoryIndex = this.productInventory.findIndex(
      (item) => item.product.name == this.selectedProduct.product.name
    );

    this.productInventory[inventoryIndex].count -= 1;

    return {
        "product":this.selectedProduct.product.name,
        "cost_price":this.selectedProduct.product.unitPrice,
        "paid_amount":totalAmount ,
        "change":changeDue,
        "change_breake_down":changeBreakDown
        
    }
  };

  /**
   * @returns a break down of the change due in form of denominations
   *
   * @params amount - takes the change due in whole number form
   *
   * */
  private getChange = (amount: number) => {
    let change_due = [];
    let lenth = this.change.length;

    for (let i = lenth - 1; i >= 0; i--) {
      while (
        this.change[i].denomination <= amount &&
        this.change[i].count != 0
      ) {
        amount -= this.change[i].denomination;
        change_due.push(this.change[i].denomination);
        // Deduct money from the change register 
        this.change[i].count -=1

      }
    }

    return change_due;
  };
  /**
   * Updates the change in the vending machine with new amounts
   *
   * @example amount = [20,50]
   * the denominations have to be valid denominations else an exception
   * @throws {@link VendingError.WrongDenomination}
   *
   * */
  private updateChange = (amount: Array<number>) => {
    // check if the denominations inserted are valid
    let index = 0;
    for (let i = 0; i <= amount.length - 1; i++) {
      index = this.change.findIndex((j) => j.denomination == amount[i]);

      if (index == -1) {
        throw VendingError.WrongDenomination;
      }
      this.change[index].count += 1;
    }
  };
}

export {
    VendingMachine
}