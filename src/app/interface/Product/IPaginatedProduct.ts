import { IProduct } from "./IProduct";

export interface IPaginatedProduct {
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    totalRecords:number;
    data: IProduct[];
}