/* NgRx */
import { Action } from '@ngrx/store';
import { PriceProduct } from '../../model/price.model';


export enum PriceProductActionTypes {
    LoadAllPriceProduct = '[AllPriceProduct] Load All Price Product',
    LoadAllPriceProductSuccess = '[AllPriceProduct] Load AllPriceProduct Success',
    LoadAllPriceProductFail = '[AllPriceProduct] Load AllPriceProduct Fail',
    AddNewPriceProduct = '[AddNewProduct] Load All Price Product',
    AddNewPriceProductSuccess = '[AddNewPriceProduct] Load AllPriceProduct Success',
    AddNewPriceProductFail = '[AddNewPriceProduct] Load AllPriceProduct Fail',
    UpdatePriceProduct = '[UpdateProduct] Load All Price Product',
    UpdatePriceProductSuccess = '[UpdatePriceProduct] Load AllPriceProduct Success',
    UpdatePriceProductFail = '[UpdatePriceProduct] Load AllPriceProduct Fail',
    DeletePriceProduct = '[DeleteProduct] Load All Price Product',
    DeletePriceProductSuccess = '[DeletePriceProduct] Load AllPriceProduct Success',
    DeletePriceProductFail = '[DeletePriceProduct] Load AllPriceProduct Fail',
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

export class AddNewPriceProduct implements Action {
    readonly type = PriceProductActionTypes.AddNewPriceProduct;

    constructor(public payload: PriceProduct) { }
}

export class AddNewPriceProductSuccess implements Action {
    readonly type = PriceProductActionTypes.AddNewPriceProductSuccess;

    constructor(public payload: PriceProduct) { }
}
  
export class AddNewPriceProductFail implements Action {
    readonly type = PriceProductActionTypes.AddNewPriceProductFail;
  
    constructor(public payload: string) { }
}

export class UpdatePriceProduct implements Action {
    readonly type = PriceProductActionTypes.UpdatePriceProduct;

    constructor(public payload: PriceProduct) { }
}

export class UpdatePriceProductSuccess implements Action {
    readonly type = PriceProductActionTypes.UpdatePriceProductSuccess;

    constructor(public payload: PriceProduct) { }
}
  
export class UpdatePriceProductFail implements Action {
    readonly type = PriceProductActionTypes.UpdatePriceProductFail;
  
    constructor(public payload: string) { }
}

export class DeletePriceProduct implements Action {
    readonly type = PriceProductActionTypes.DeletePriceProduct;

    constructor(public payload: PriceProduct) { }
}

export class DeletePriceProductSuccess implements Action {
    readonly type = PriceProductActionTypes.DeletePriceProductSuccess;

    constructor(public payload: boolean) { }
}
  
export class DeletePriceProductFail implements Action {
    readonly type = PriceProductActionTypes.DeletePriceProductFail;
  
    constructor(public payload: string) { }
}

export type EntityMemberActions = LoadAllPriceProduct
  | LoadAllPriceProductSuccess
  | LoadAllPriceProductFail
  | AddNewPriceProduct
  | AddNewPriceProductSuccess
  | AddNewPriceProductFail
  | UpdatePriceProduct
  | UpdatePriceProductSuccess
  | UpdatePriceProductFail
  | DeletePriceProduct
  | DeletePriceProductSuccess
  | DeletePriceProductFail