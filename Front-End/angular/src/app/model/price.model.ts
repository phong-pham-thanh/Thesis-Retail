import { NgbDate } from "@ng-bootstrap/ng-bootstrap";
import { Product } from "./product.model";

export class PriceProduct{
    id: number;
    productId?: number;
    product?: Product;
    price?: number;
    startDate?: Date;
    endDate?: Date;
    active: boolean;
}