import { PriceProduct } from "./price.model";

export class Product{
    id: number;
    name: string;
    categoryId: number;
    description: string;
    status: boolean;
    currentPrice: number;
    listPrices: PriceProduct[];
    imgPath: string;
    inventory?: number;
    inventoryFrom?: number;
    inventoryTo?: number;
}