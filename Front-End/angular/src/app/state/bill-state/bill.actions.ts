/* NgRx */
import { Action } from '@ngrx/store';
import { Bill } from '../../model/bill.model';
import { BillDetails } from '../../model/billDetail.model';


export enum BillActionTypes {
    AddNewBill = '[AddNewBill] Add new Bill',
    AddNewBillSuccess = '[AddNewBill] Add new Bill Success',
    AddNewBillFail = '[AddNewBill] Add new Bill Fail',
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

export type BillActions = AddNewBill
  | AddNewBillSuccess
  | AddNewBillFail