import Express from 'express'
import { Query } from 'express-serve-static-core';



interface IChange{
    name:string,
    denomination:number;
    count:number;
}
interface IProduct{
name:string,
unitPrice:number,
uniqueCode:number,
count:number
}
interface TypedRequest<T extends Query, U> extends Express.Request {
    body: U,
    query: T
}
export {
    IChange,IProduct,TypedRequest
}