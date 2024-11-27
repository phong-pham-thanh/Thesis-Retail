/* NgRx */
import { Action } from '@ngrx/store';
import { GoodTransfer } from '../../model/goodTransfer.model';
import { GoodTransferDetails } from '../../model/goodTransferDetail.model';


export enum GoodTransferActionTypes {
    AddNewGoodTransfer = '[AddNewGoodTransfer] Add new GoodTransfer',
    AddNewGoodTransferSuccess = '[AddNewGoodTransfer] Add new GoodTransfer Success',
    AddNewGoodTransferFail = '[AddNewGoodTransfer] Add new GoodTransfer Fail',

    LoadAllGoodTransfer = '[AllGoodTransfer] Load All Price GoodTransfer',
    LoadAllGoodTransferSuccess = '[AllGoodTransfer] Load AllGoodTransfer Success',
    LoadAllGoodTransferFail = '[AllGoodTransfer] Load AllGoodTransfer Fail',

    AcceptGoodTransfer = '[AcceptGoodTransfer] Add new GoodTransfer',
    AcceptGoodTransferSuccess = '[AcceptGoodTransfer] Add new GoodTransfer Success',
    AcceptGoodTransferFail = '[AcceptGoodTransfer] Add new GoodTransfer Fail',

    CancelGoodTransfer = '[CancelGoodTransfer] Add new GoodTransfer',
    CancelGoodTransferSuccess = '[CancelGoodTransfer] Add new GoodTransfer Success',
    CancelGoodTransferFail = '[CancelGoodTransfer] Add new GoodTransfer Fail',

    GetByIdGoodTransfer = '[GetByIdGoodTransfer] Add new GoodTransfer',
    GetByIdGoodTransferSuccess = '[GetByIdGoodTransfer] Add new GoodTransfer Success',
    GetByIdGoodTransferFail = '[GetByIdGoodTransfer] Add new GoodTransfer Fail',

    UpdateGoodTransfer = '[UpdateGoodTransfer] Add new GoodTransfer',
    UpdateGoodTransferSuccess = '[UpdateGoodTransfer] Add new GoodTransfer Success',
    UpdateGoodTransferFail = '[UpdateGoodTransfer] Add new GoodTransfer Fail',

    DeleteGoodTransfer = '[DeleteGoodTransfer] Add new GoodTransfer',
    DeleteGoodTransferSuccess = '[DeleteGoodTransfer] Add new GoodTransfer Success',
    DeleteGoodTransferFail = '[DeleteGoodTransfer] Add new GoodTransfer Fail',

    ResetCurrentGoodTransfer = '[Reset Current Good transfer] Reset Current Good transfer',
}

export class LoadAllGoodTransfer implements Action {
    readonly type = GoodTransferActionTypes.LoadAllGoodTransfer;

    constructor() { }
}

export class LoadAllGoodTransferSuccess implements Action {
    readonly type = GoodTransferActionTypes.LoadAllGoodTransferSuccess;

    constructor(public payload: GoodTransfer[]) { }
}
  
export class LoadAllGoodTransferFail implements Action {
    readonly type = GoodTransferActionTypes.LoadAllGoodTransferFail;
  
    constructor(public payload: string) { }
}

export class AddNewGoodTransfer implements Action {
    readonly type = GoodTransferActionTypes.AddNewGoodTransfer;

    constructor(public payload: GoodTransfer) { }
}

export class AddNewGoodTransferSuccess implements Action {
    readonly type = GoodTransferActionTypes.AddNewGoodTransferSuccess;

    constructor(public payload: GoodTransfer) { }
}
  
export class AddNewGoodTransferFail implements Action {
    readonly type = GoodTransferActionTypes.AddNewGoodTransferFail;
  
    constructor(public payload: string) { }
}

export class AcceptGoodTransfer implements Action {
    readonly type = GoodTransferActionTypes.AcceptGoodTransfer;

    constructor(public payload: number) { }
}

export class AcceptGoodTransferSuccess implements Action {
    readonly type = GoodTransferActionTypes.AcceptGoodTransferSuccess;

    constructor(public payload: GoodTransfer) { }
}
  
export class AcceptGoodTransferFail implements Action {
    readonly type = GoodTransferActionTypes.AcceptGoodTransferFail;
  
    constructor(public payload: string) { }
}

export class CancelGoodTransfer implements Action {
    readonly type = GoodTransferActionTypes.CancelGoodTransfer;

    constructor(public payload: number) { }
}

export class CancelGoodTransferSuccess implements Action {
    readonly type = GoodTransferActionTypes.CancelGoodTransferSuccess;

    constructor(public payload: GoodTransfer) { }
}
  
export class CancelGoodTransferFail implements Action {
    readonly type = GoodTransferActionTypes.CancelGoodTransferFail;
  
    constructor(public payload: string) { }
}


export class DeleteGoodTransfer implements Action {
    readonly type = GoodTransferActionTypes.DeleteGoodTransfer;

    constructor(public payload: number) { }
}

export class DeleteGoodTransferSuccess implements Action {
    readonly type = GoodTransferActionTypes.DeleteGoodTransferSuccess;

    constructor(public payload: boolean) { }
}
  
export class DeleteGoodTransferFail implements Action {
    readonly type = GoodTransferActionTypes.DeleteGoodTransferFail;
  
    constructor(public payload: string) { }
}

export class GetByIdGoodTransfer implements Action {
    readonly type = GoodTransferActionTypes.GetByIdGoodTransfer;

    constructor(public payload: number) { }
}

export class GetByIdGoodTransferSuccess implements Action {
    readonly type = GoodTransferActionTypes.GetByIdGoodTransferSuccess;

    constructor(public payload: GoodTransfer) { }
}
  
export class GetByIdGoodTransferFail implements Action {
    readonly type = GoodTransferActionTypes.GetByIdGoodTransferFail;
  
    constructor(public payload: string) { }
}

export class UpdateGoodTransfer implements Action {
    readonly type = GoodTransferActionTypes.UpdateGoodTransfer;

    constructor(public payload: GoodTransfer) { }
}

export class UpdateGoodTransferSuccess implements Action {
    readonly type = GoodTransferActionTypes.UpdateGoodTransferSuccess;

    constructor(public payload: GoodTransfer) { }
}
  
export class UpdateGoodTransferFail implements Action {
    readonly type = GoodTransferActionTypes.UpdateGoodTransferFail;
  
    constructor(public payload: string) { }
}

export class ResetCurrentGoodTransfer implements Action {
    readonly type = GoodTransferActionTypes.ResetCurrentGoodTransfer;
  
    constructor() { }
}

export type GoodTransferActions = LoadAllGoodTransfer
  | LoadAllGoodTransferSuccess
  | LoadAllGoodTransferFail
  | AddNewGoodTransfer
  | AddNewGoodTransferSuccess
  | AddNewGoodTransferFail
  | AcceptGoodTransfer
  | AcceptGoodTransferSuccess
  | AcceptGoodTransferFail
  | CancelGoodTransfer
  | CancelGoodTransferSuccess
  | CancelGoodTransferFail
  | DeleteGoodTransfer
  | DeleteGoodTransferSuccess
  | DeleteGoodTransferFail
  | GetByIdGoodTransfer
  | GetByIdGoodTransferSuccess
  | GetByIdGoodTransferFail
  | ResetCurrentGoodTransfer
  | UpdateGoodTransfer
  | UpdateGoodTransferSuccess
  | UpdateGoodTransferFail