import { VendingMachine } from "./VendingMachine";
import { IChange ,IProduct} from "./interfaces";

const inventory :Array<IProduct> = [
    {name:"Lanch bar",unitPrice:1.24,uniqueCode:10001,count:6},
    {name:"Cokies",unitPrice:3.99,uniqueCode:10002,count:6},
    {name:"Milk bar",unitPrice:2.50,uniqueCode:10003,count:6},
    {name:"Jelly beans",unitPrice:0.26,uniqueCode:10004,count:6},
    {name:"Mars",unitPrice:1.24,uniqueCode:10005,count:6},
    {name:"Rice cake",unitPrice:3.02,uniqueCode:10006,count:6},
    {name:"Water",unitPrice:0.35,uniqueCode:10007,count:6}
];
const change: Array<IChange> = [
  { name: "$1", denomination: 1, count: 0 },
  { name: "$10", denomination: 10, count: 1 },
  { name: "$20", denomination: 20, count: 100 },
  { name: "$50", denomination: 50, count: 100 },
  { name: "$100", denomination: 100, count: 100 },
  { name: "$200", denomination: 200, count: 1 },
  { name: "$500", denomination: 500, count: 100 },
  { name: "$1000", denomination: 1000, count: 100 },
  { name: "Quarter", denomination: 0.25, count: 100 },
  { name: "Dime", denomination: 0.1, count: 100 },
  { name: "Nickel", denomination: 0.05, count: 100 },
  { name: "Penny", denomination: 0.01, count: 0 },
];
const vendingMachine = new VendingMachine(inventory, change);

export {vendingMachine}