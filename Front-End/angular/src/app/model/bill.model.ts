import { BillDetails } from "./billDetail.model";

export class Bill{
    id: number;
    createdDate: Date;
    customerId: number;
    billDetails?: BillDetails[];
}