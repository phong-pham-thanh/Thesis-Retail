/* NgRx */
import { Action } from '@ngrx/store';
import { Customer } from '../model/customer.model';


export enum CustomerActionTypes {
    LoadAllCustomer = '[AllCustomer] Load All Price Customer',
    LoadAllCustomerSuccess = '[AllCustomer] Load AllCustomer Success',
    LoadAllCustomerFail = '[AllCustomer] Load AllCustomer Fail',
}

export class LoadAllCustomer implements Action {
    readonly type = CustomerActionTypes.LoadAllCustomer;

    constructor() { }
}

export class LoadAllCustomerSuccess implements Action {
    readonly type = CustomerActionTypes.LoadAllCustomerSuccess;

    constructor(public payload: Customer[]) { }
}
  
export class LoadAllCustomerFail implements Action {
    readonly type = CustomerActionTypes.LoadAllCustomerFail;
  
    constructor(public payload: string) { }
}

export type CustomerActions = LoadAllCustomer
  | LoadAllCustomerSuccess
  | LoadAllCustomerFail