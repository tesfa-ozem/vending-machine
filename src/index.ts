import { IChange, IProductInventory } from './interfaces';
import Product from './Product'
import { VendingMachine } from './VendingMachine';

const inventory: Array<IProductInventory> = [
  { product: new Product("Coke", 50, 1), count: 3 },
  { product: new Product("Fanta", 50, 2), count: 3 },
  { product: new Product("Lanch bar", 100, 3), count: 3 },
  { product: new Product("Cookies", 200, 4), count: 3 },
];
const change: Array<IChange> = [
  { denomination: 1, count: 0 },
  { denomination: 10, count: 1 },
  { denomination: 20, count: 100 },
  { denomination: 50, count: 100 },
  { denomination: 100, count: 100 },
  { denomination: 200, count: 100 },
  { denomination: 500, count: 100 },
  { denomination: 1000, count: 100 },
];
const vendingMachine = new VendingMachine(inventory, change);

console.log(vendingMachine.buyProduct([1000], 1));
