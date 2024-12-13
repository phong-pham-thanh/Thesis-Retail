import { BillDetails } from "./billDetail.model";
import { Customer } from "./customer.model";
import { GoodTransferDetails } from "./goodTransferDetail.model";
import { NoteStatus } from "./status.enum";
import { Users } from "./user.model";
import { Warehouse } from "./warehouse.model";

export class GoodTransfer{
    id?: number;
    transferDate?: Date;
    fromWareHouseId?: number;
    toWareHouseId?: number;
    userId?: number;
    status?: NoteStatus;
    fromWareHouse?: Warehouse;
    toWareHouse?: Warehouse;
    user?: Users;
    acceptedById?: number;
    acceptedBy?: Users;
    listGoodTransferDetailsModel?: GoodTransferDetails[];
}