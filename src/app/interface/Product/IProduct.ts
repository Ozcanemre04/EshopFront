export interface IProduct {
    name: string;
    description: string;
    price: number;
    stock: number;
    image: string;
    ratings: number;
    categoryName: string;
    categoryId: number;
    id: number;
    createdDate: string;
    updatedDate: string | null;
}