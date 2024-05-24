import { Ticker } from "./Ticker"

export type User =  
{
   id:number, 
   firstName:string,
   lastName:string,
   phoneNumber:string,
   email:string,
   registeredStock:Ticker[]
}