class Product {
    uniqueCode: number;
    name: String;
    unitPrice: number;
    constructor(name: String, unitPrice: number, uniqueCode: number) {
      this.name = name;
      this.unitPrice = unitPrice;
      this.uniqueCode = uniqueCode;
    }
  }

  export default Product