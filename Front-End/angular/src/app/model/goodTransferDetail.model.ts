import { GoodTransfer } from "./goodTransfer.model";
import { Product } from "./product.model";

export class GoodTransferDetails{
    id?: number;
    productId: number;
    quantity: number;
    goodTransferId?: number;
    product?: Product;
    goodTransfer?: GoodTransfer;
}