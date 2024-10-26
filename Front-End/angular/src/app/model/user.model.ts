import { UserWareHouse } from "./userWareHouse.model";

export class Users{
    id: number;
    name?: string;
    username?: string;
    password?: string;
    branch?: string;
    address?: string;
    dateOnboard?: Date;
    age?: number;
    dateOfBirth?: Date;
    isAdmin?: boolean;
    listUserWareHouse?: UserWareHouse[];
}