import { Users } from "./user.model";

export class Warehouse{
    id: number;
    managerId?: number;
    manager?: Users;
    address?: string;
    status: boolean;
}