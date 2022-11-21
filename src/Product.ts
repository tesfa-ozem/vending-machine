class Product {
    uniqueCode: number;
    name: String;
    unitPrice: number;
    count: number;
    constructor(name: String, unitPrice: number, uniqueCode: number, count:number) {
      this.name = name;
      this.unitPrice = unitPrice;
      this.uniqueCode = uniqueCode;
      this.count = count;
    }
  }

  export default Product