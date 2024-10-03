import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError, switchMap } from 'rxjs/operators';
/* NgRx */
import { Action } from '@ngrx/store';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { BillService } from '../../services/bill.service';
import * as priceProductAction from './bill.actions'

@Injectable()
export class BillEffects {
    constructor(private priceProductService: BillService, private actions$: Actions) {}

    // loadAllBill$ = createEffect(() =>
    //   this.actions$.pipe(
    //     ofType(priceProductAction.BillActionTypes.LoadAllBill),
    //     mergeMap(() =>
    //       this.priceProductService.getAllBill().pipe(
    //         map(result => new priceProductAction.LoadAllBillSuccess(result)),
    //         catchError(err => of(new priceProductAction.LoadAllBillFail(err)))
    //       )
    //     )
    //   )
    // );

    
    addNewBill$ = createEffect(() =>
      this.actions$.pipe(
        ofType(priceProductAction.BillActionTypes.AddNewBill),
        map((action: priceProductAction.AddNewBill) => action.payload),
        mergeMap((newItem) =>
          this.priceProductService.addNewBill(newItem).pipe(
            map(result => new priceProductAction.AddNewBillSuccess(result)),
            catchError(err => of(new priceProductAction.AddNewBillFail(err)))
          )
        )
      )
    );

    
    // updateBill$ = createEffect(() =>
    //   this.actions$.pipe(
    //     ofType(priceProductAction.BillActionTypes.UpdateBill),
    //     map((action: priceProductAction.UpdateBill) => action.payload),
    //     mergeMap((newItem) =>
    //       this.priceProductService.updateItem(newItem).pipe(
    //         map(result => new priceProductAction.UpdateBillSuccess(result)),
    //         catchError(err => of(new priceProductAction.UpdateBillFail(err)))
    //       )
    //     )
    //   )
    // );
    

    
    // deleteBill$ = createEffect(() =>
    //   this.actions$.pipe(
    //     ofType(priceProductAction.BillActionTypes.DeleteBill),
    //     map((action: priceProductAction.DeleteBill) => action.payload),
    //     mergeMap((newItem) =>
    //       this.priceProductService.deleteItem(newItem).pipe(
    //         map(result => new priceProductAction.DeleteBillSuccess(result)),
    //         catchError(err => of(new priceProductAction.DeleteBillFail(err)))
    //       )
    //     )
    //   )
    // );
}
