import Express from 'express'


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
interface TypedRequestBody<T> extends Express.Request {
    body: T
}
export {
    IChange,IProduct,TypedRequestBody
}