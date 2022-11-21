import { VendingMachine } from "./VendingMachine";
import { IChange ,IProduct} from "./interfaces";

// Products in the vending machine
const inventory :Array<IProduct> = [
    
];

// change accepted in the machine
const change: Array<IChange> = [
 
];
const vendingMachine = new VendingMachine(inventory, change);

export {vendingMachine}