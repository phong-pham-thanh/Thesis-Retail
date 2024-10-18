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

export type GoodTransferActions = LoadAllGoodTransfer
  | LoadAllGoodTransferSuccess
  | LoadAllGoodTransferFail
  | AddNewGoodTransfer
  | AddNewGoodTransferSuccess
  | AddNewGoodTransferFail
  | AcceptGoodTransfer
  | AcceptGoodTransferSuccess
  | AcceptGoodTransferFail