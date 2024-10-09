import { Product } from "./product.model";

export class BillDetails{
    id?: number;
    productId: number;
    quantity: number;
    billId: number;
    priceUnit?: number;
    product?: Product;
}