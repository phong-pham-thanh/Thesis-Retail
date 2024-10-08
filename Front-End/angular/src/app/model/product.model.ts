import { PriceProduct } from "./price.model";

export class Product{
    id: number;
    name: string;
    categoryId: number;
    description: string;
    status: boolean;
    currentPrice: number;
    listPrices: PriceProduct[];
}