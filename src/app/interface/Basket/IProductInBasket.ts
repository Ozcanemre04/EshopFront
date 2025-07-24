import { IProduct } from "../Product/IProduct";

export interface IProductInBasket {
    quantity: number,
    totalPrice: number,
    productId: number,
    baksetId:number,
    id:number,
    productName:string,
    image:string,
    stock:number,
    price:number,
    createdDate: string;
    updatedDate: string | null;
}