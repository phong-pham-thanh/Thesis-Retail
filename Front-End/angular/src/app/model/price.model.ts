import { Product } from "./product.model";

export class PriceProduct{
    id: number;
    productId: number;
    product: Product;
    startDate: Date;
    endDate: Date;
    active: boolean;
}