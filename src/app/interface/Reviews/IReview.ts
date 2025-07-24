export interface IReview {
    reviews: string,
    stars: number,
    productId: number,
    userId: string,
    id: number,
    createdDate: string,
    updatedDate: string | null;
}