import { IProductInBasket } from "./IProductInBasket";

export interface IBasket {
    UserId: string;
    basketProductDtoResponses: IProductInBasket[];
}