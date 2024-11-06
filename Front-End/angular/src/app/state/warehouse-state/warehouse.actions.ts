/* NgRx */
import { Action } from '@ngrx/store';
import { Warehouse } from '../../model/warehouse.model';


export enum WarehouseActionTypes {
    LoadAllWarehouse = '[AllWarehouse] Load All Price Warehouse',
    LoadAllWarehouseSuccess = '[AllWarehouse] Load AllWarehouse Success',
    LoadAllWarehouseFail = '[AllWarehouse] Load AllWarehouse Fail',

    
    LoadAllWarehouseByRole = '[AllWarehouseByRole] Load All Price Warehouse',
    LoadAllWarehouseByRoleSuccess = '[AllWarehouseByRole] Load AllWarehouseByRole Success',
    LoadAllWarehouseByRoleFail = '[AllWarehouseByRole] Load AllWarehouseByRole Fail',
}

export class LoadAllWarehouse implements Action {
    readonly type = WarehouseActionTypes.LoadAllWarehouse;

    constructor() { }
}

export class LoadAllWarehouseSuccess implements Action {
    readonly type = WarehouseActionTypes.LoadAllWarehouseSuccess;

    constructor(public payload: Warehouse[]) { }
}
  
export class LoadAllWarehouseFail implements Action {
    readonly type = WarehouseActionTypes.LoadAllWarehouseFail;
  
    constructor(public payload: string) { }
}

export class LoadAllWarehouseByRole implements Action {
    readonly type = WarehouseActionTypes.LoadAllWarehouseByRole;

    constructor() { }
}

export class LoadAllWarehouseByRoleSuccess implements Action {
    readonly type = WarehouseActionTypes.LoadAllWarehouseByRoleSuccess;

    constructor(public payload: Warehouse[]) { }
}
  
export class LoadAllWarehouseByRoleFail implements Action {
    readonly type = WarehouseActionTypes.LoadAllWarehouseByRoleFail;
  
    constructor(public payload: string) { }
}

export type WarehouseActions = LoadAllWarehouse
  | LoadAllWarehouseSuccess
  | LoadAllWarehouseFail
  | LoadAllWarehouseByRole
  | LoadAllWarehouseByRoleSuccess
  | LoadAllWarehouseByRoleFail