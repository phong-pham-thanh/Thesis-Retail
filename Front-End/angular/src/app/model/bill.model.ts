import { BillDetails } from "./billDetail.model";
import { Customer } from "./customer.model";
import { Users } from "./user.model";
import { Warehouse } from "./warehouse.model";

export class Bill{
    id?: number;
    createdDate: Date;
    customerId?: number;
    wareHouseId?: number;
    userId?: number;
    totalAmount?: number;
    customer?: Customer;
    wareHouse?: Warehouse;
    user?: Users;
    listBillDetails: BillDetails[];
}