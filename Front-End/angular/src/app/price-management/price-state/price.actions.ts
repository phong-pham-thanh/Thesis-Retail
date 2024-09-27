/* NgRx */
import { Action } from '@ngrx/store';
import { PriceProduct } from '../../model/price.model';


export enum PriceProductActionTypes {
    LoadAllPriceProduct = '[AllPriceProduct] Load All Price Product',
    LoadAllPriceProductSuccess = '[AllPriceProduct] Load AllPriceProduct Success',
    LoadAllPriceProductFail = '[AllPriceProduct] Load AllPriceProduct Fail',
}

export class LoadAllPriceProduct implements Action {
    readonly type = PriceProductActionTypes.LoadAllPriceProduct;

    constructor() { }
}

export class LoadAllPriceProductSuccess implements Action {
    readonly type = PriceProductActionTypes.LoadAllPriceProductSuccess;

    constructor(public payload: PriceProduct[]) { }
}
  
export class LoadAllPriceProductFail implements Action {
    readonly type = PriceProductActionTypes.LoadAllPriceProductFail;
  
    constructor(public payload: string) { }
}

export type EntityMemberActions = LoadAllPriceProduct
  | LoadAllPriceProductSuccess
  | LoadAllPriceProductFail