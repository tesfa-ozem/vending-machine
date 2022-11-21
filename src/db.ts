import { VendingMachine } from "./VendingMachine";
import { IChange ,IProduct} from "./interfaces";

// Products in the vending machine
const inventory :Array<IProduct> = [
    {name:"Lanch bar",unitPrice:124,uniqueCode:10001,count:6},
    {name:"Cokies",unitPrice:399,uniqueCode:10002,count:6},
    {name:"Milk bar",unitPrice:250,uniqueCode:10003,count:6},
    {name:"Jelly beans",unitPrice:26,uniqueCode:10004,count:6},
    {name:"Mars",unitPrice:124,uniqueCode:10005,count:6},
    {name:"Rice cake",unitPrice:302,uniqueCode:10006,count:6},
    {name:"Water",unitPrice:35,uniqueCode:10007,count:6}
];

// change accepted in the machine
const change: Array<IChange> = [
  { name: "$1", cents: 100, count: 10 },
  {name:"5$", cents:500,count:1},
  { name: "$10", cents: 1000, count: 1 },
  { name: "$20", cents: 2000, count: 1 },
  { name: "$50", cents: 5000, count: 1 },
  { name: "$100", cents: 10000, count: 1 },
  { name: "$200", cents: 20000, count: 1 },
  { name: "$500", cents: 50000, count: 1 },
  { name: "$1000", cents: 100000, count: 1 },
  { name: "Quarter", cents: 25, count: 100 },
  { name: "Dime", cents: 10, count: 100 },
  { name: "Nickel", cents: 5, count: 100 },
  { name: "Penny", cents: 1, count: 10 },
];
const vendingMachine = new VendingMachine(inventory, change);

export {vendingMachine}