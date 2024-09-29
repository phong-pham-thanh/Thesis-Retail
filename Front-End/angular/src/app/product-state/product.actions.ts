/* NgRx */
import { Action } from '@ngrx/store';
import { Product } from '../model/product.model';


export enum ProductActionTypes {
    LoadAllProduct = '[AllProduct] Load All Price Product',
    LoadAllProductSuccess = '[AllProduct] Load AllProduct Success',
    LoadAllProductFail = '[AllProduct] Load AllProduct Fail',
}

export class LoadAllProduct implements Action {
    readonly type = ProductActionTypes.LoadAllProduct;

    constructor() { }
}

export class LoadAllProductSuccess implements Action {
    readonly type = ProductActionTypes.LoadAllProductSuccess;

    constructor(public payload: Product[]) { }
}
  
export class LoadAllProductFail implements Action {
    readonly type = ProductActionTypes.LoadAllProductFail;
  
    constructor(public payload: string) { }
}

export type EntityMemberActions = LoadAllProduct
  | LoadAllProductSuccess
  | LoadAllProductFail