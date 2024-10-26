import { Users } from "./user.model";
import { Warehouse } from "./warehouse.model";

export class UserWareHouse{
    id?: number;
    userId?: number;
    wareHouseId?: number;
    userModel?: Users;
    wareHouseModel?: Warehouse;
}
