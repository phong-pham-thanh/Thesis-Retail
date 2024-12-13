/* NgRx */
import { Action } from '@ngrx/store';
import { Inventory } from '../../model/inventory.model';


export enum InventoryActionTypes {
    // AddNewInventory = '[AddNewInventory] Add new Inventory',
    // AddNewInventorySuccess = '[AddNewInventory] Add new Inventory Success',
    // AddNewInventoryFail = '[AddNewInventory] Add new Inventory Fail',

    LoadAllInventory = '[AllInventory] Load All Price Inventory',
    LoadAllInventorySuccess = '[AllInventory] Load AllInventory Success',
    LoadAllInventoryFail = '[AllInventory] Load AllInventory Fail',

    // AcceptInventory = '[AcceptInventory] Add new Inventory',
    // AcceptInventorySuccess = '[AcceptInventory] Add new Inventory Success',
    // AcceptInventoryFail = '[AcceptInventory] Add new Inventory Fail',

    // CancelInventory = '[CancelInventory] Add new Inventory',
    // CancelInventorySuccess = '[CancelInventory] Add new Inventory Success',
    // CancelInventoryFail = '[CancelInventory] Add new Inventory Fail',

    GetByIdInventory = '[GetByIdInventory] Add new Inventory',
    GetByIdInventorySuccess = '[GetByIdInventory] Add new Inventory Success',
    GetByIdInventoryFail = '[GetByIdInventory] Add new Inventory Fail',

    // UpdateInventory = '[UpdateInventory] Add new Inventory',
    // UpdateInventorySuccess = '[UpdateInventory] Add new Inventory Success',
    // UpdateInventoryFail = '[UpdateInventory] Add new Inventory Fail',

    // DeleteInventory = '[DeleteInventory] Add new Inventory',
    // DeleteInventorySuccess = '[DeleteInventory] Add new Inventory Success',
    // DeleteInventoryFail = '[DeleteInventory] Add new Inventory Fail',

    // ResetCurrentInventory = '[Reset Current Good transfer] Reset Current Good transfer',
}

export class LoadAllInventory implements Action {
    readonly type = InventoryActionTypes.LoadAllInventory;

    constructor() { }
}

export class LoadAllInventorySuccess implements Action {
    readonly type = InventoryActionTypes.LoadAllInventorySuccess;

    constructor(public payload: Inventory[]) { }
}
  
export class LoadAllInventoryFail implements Action {
    readonly type = InventoryActionTypes.LoadAllInventoryFail;
  
    constructor(public payload: string) { }
}

// export class AddNewInventory implements Action {
//     readonly type = InventoryActionTypes.AddNewInventory;

//     constructor(public payload: Inventory) { }
// }

// export class AddNewInventorySuccess implements Action {
//     readonly type = InventoryActionTypes.AddNewInventorySuccess;

//     constructor(public payload: Inventory) { }
// }
  
// export class AddNewInventoryFail implements Action {
//     readonly type = InventoryActionTypes.AddNewInventoryFail;
  
//     constructor(public payload: string) { }
// }

// export class AcceptInventory implements Action {
//     readonly type = InventoryActionTypes.AcceptInventory;

//     constructor(public payload: number) { }
// }

// export class AcceptInventorySuccess implements Action {
//     readonly type = InventoryActionTypes.AcceptInventorySuccess;

//     constructor(public payload: Inventory) { }
// }
  
// export class AcceptInventoryFail implements Action {
//     readonly type = InventoryActionTypes.AcceptInventoryFail;
  
//     constructor(public payload: string) { }
// }

// export class CancelInventory implements Action {
//     readonly type = InventoryActionTypes.CancelInventory;

//     constructor(public payload: number) { }
// }

// export class CancelInventorySuccess implements Action {
//     readonly type = InventoryActionTypes.CancelInventorySuccess;

//     constructor(public payload: Inventory) { }
// }
  
// export class CancelInventoryFail implements Action {
//     readonly type = InventoryActionTypes.CancelInventoryFail;
  
//     constructor(public payload: string) { }
// }


// export class DeleteInventory implements Action {
//     readonly type = InventoryActionTypes.DeleteInventory;

//     constructor(public payload: number) { }
// }

// export class DeleteInventorySuccess implements Action {
//     readonly type = InventoryActionTypes.DeleteInventorySuccess;

//     constructor(public payload: boolean) { }
// }
  
// export class DeleteInventoryFail implements Action {
//     readonly type = InventoryActionTypes.DeleteInventoryFail;
  
//     constructor(public payload: string) { }
// }

export class GetByIdInventory implements Action {
    readonly type = InventoryActionTypes.GetByIdInventory;

    constructor(public payload: number) { }
}

export class GetByIdInventorySuccess implements Action {
    readonly type = InventoryActionTypes.GetByIdInventorySuccess;

    constructor(public payload: Inventory) { }
}
  
export class GetByIdInventoryFail implements Action {
    readonly type = InventoryActionTypes.GetByIdInventoryFail;
  
    constructor(public payload: string) { }
}

// export class UpdateInventory implements Action {
//     readonly type = InventoryActionTypes.UpdateInventory;

//     constructor(public payload: Inventory) { }
// }

// export class UpdateInventorySuccess implements Action {
//     readonly type = InventoryActionTypes.UpdateInventorySuccess;

//     constructor(public payload: Inventory) { }
// }
  
// export class UpdateInventoryFail implements Action {
//     readonly type = InventoryActionTypes.UpdateInventoryFail;
  
//     constructor(public payload: string) { }
// }

// export class ResetCurrentInventory implements Action {
//     readonly type = InventoryActionTypes.ResetCurrentInventory;
  
//     constructor() { }
// }

export type InventoryActions = LoadAllInventory
  | LoadAllInventorySuccess
  | LoadAllInventoryFail
//   | AddNewInventory
//   | AddNewInventorySuccess
//   | AddNewInventoryFail
//   | AcceptInventory
//   | AcceptInventorySuccess
//   | AcceptInventoryFail
//   | CancelInventory
//   | CancelInventorySuccess
//   | CancelInventoryFail
//   | DeleteInventory
//   | DeleteInventorySuccess
//   | DeleteInventoryFail
  | GetByIdInventory
  | GetByIdInventorySuccess
  | GetByIdInventoryFail
//   | ResetCurrentInventory
//   | UpdateInventory
//   | UpdateInventorySuccess
//   | UpdateInventoryFail