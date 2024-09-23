import { Product } from "./product.model";

export class BillDetails{
    product: Product;
    quantity: number;
    billId?: number;
}