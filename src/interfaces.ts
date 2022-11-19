import Product from './Product'
interface IProductInventory{
    product:Product;
    count:number
}

interface IChange{
    denomination:number;
    count:number;
}

export {
    IProductInventory,IChange
}