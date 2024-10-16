/* NgRx */
import { Action } from '@ngrx/store';
import { Bill } from '../../model/bill.model';
import { BillDetails } from '../../model/billDetail.model';


export enum BillActionTypes {
    AddNewBill = '[AddNewBill] Add new Bill',
    AddNewBillSuccess = '[AddNewBill] Add new Bill Success',
    AddNewBillFail = '[AddNewBill] Add new Bill Fail',
    LoadAllBill = '[AllBill] Load All Price Bill',
    LoadAllBillSuccess = '[AllBill] Load AllBill Success',
    LoadAllBillFail = '[AllBill] Load AllBill Fail',
}

export class LoadAllBill implements Action {
    readonly type = BillActionTypes.LoadAllBill;

    constructor() { }
}

export class LoadAllBillSuccess implements Action {
    readonly type = BillActionTypes.LoadAllBillSuccess;

    constructor(public payload: Bill[]) { }
}
  
export class LoadAllBillFail implements Action {
    readonly type = BillActionTypes.LoadAllBillFail;
  
    constructor(public payload: string) { }
}

export class AddNewBill implements Action {
    readonly type = BillActionTypes.AddNewBill;

    constructor(public payload: Bill) { }
}

export class AddNewBillSuccess implements Action {
    readonly type = BillActionTypes.AddNewBillSuccess;

    constructor(public payload: boolean) { }
}
  
export class AddNewBillFail implements Action {
    readonly type = BillActionTypes.AddNewBillFail;
  
    constructor(public payload: string) { }
}

export type BillActions = LoadAllBill
  | LoadAllBillSuccess
  | LoadAllBillFail
  | AddNewBill
  | AddNewBillSuccess
  | AddNewBillFail