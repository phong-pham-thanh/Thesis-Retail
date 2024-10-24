import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError, switchMap } from 'rxjs/operators';
/* NgRx */
import { Action } from '@ngrx/store';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { GoodTransferService } from '../../services/goodTransfer.service';
import * as priceProductAction from './goodTransfer.actions'

@Injectable()
export class GoodTransferEffects {
    constructor(private priceProductService: GoodTransferService, private actions$: Actions) {}

    loadAllGoodTransfer$ = createEffect(() =>
      this.actions$.pipe(
        ofType(priceProductAction.GoodTransferActionTypes.LoadAllGoodTransfer),
        mergeMap(() =>
          this.priceProductService.getAllGoodTransfer().pipe(
            map(result => new priceProductAction.LoadAllGoodTransferSuccess(result)),
            catchError(err => of(new priceProductAction.LoadAllGoodTransferFail(err)))
          )
        )
      )
    );

    
    addNewGoodTransfer$ = createEffect(() =>
      this.actions$.pipe(
        ofType(priceProductAction.GoodTransferActionTypes.AddNewGoodTransfer),
        map((action: priceProductAction.AddNewGoodTransfer) => action.payload),
        mergeMap((newItem) =>
          this.priceProductService.addNewGoodTransfer(newItem).pipe(
            map(result => new priceProductAction.AddNewGoodTransferSuccess(result)),
            catchError(err => of(new priceProductAction.AddNewGoodTransferFail(err)))
          )
        )
      )
    );

    acceptGoodTransfer$ = createEffect(() =>
      this.actions$.pipe(
        ofType(priceProductAction.GoodTransferActionTypes.AcceptGoodTransfer),
        map((action: priceProductAction.AcceptGoodTransfer) => action.payload),
        mergeMap((newItem) =>
          this.priceProductService.acceptGoodTransfer(newItem).pipe(
            map(result => new priceProductAction.AcceptGoodTransferSuccess(result)),
            catchError(err => of(new priceProductAction.AcceptGoodTransferFail(err)))
          )
        )
      )
    );

    cancelGoodTransfer$ = createEffect(() =>
      this.actions$.pipe(
        ofType(priceProductAction.GoodTransferActionTypes.CancelGoodTransfer),
        map((action: priceProductAction.CancelGoodTransfer) => action.payload),
        mergeMap((newItem) =>
          this.priceProductService.cancelGoodTransfer(newItem).pipe(
            map(result => new priceProductAction.CancelGoodTransferSuccess(result)),
            catchError(err => of(new priceProductAction.CancelGoodTransferFail(err)))
          )
        )
      )
    );

    getByIdGoodTransfer$ = createEffect(() =>
      this.actions$.pipe(
        ofType(priceProductAction.GoodTransferActionTypes.GetByIdGoodTransfer),
        map((action: priceProductAction.GetByIdGoodTransfer) => action.payload),
        mergeMap((newItem) =>
          this.priceProductService.getByIdGoodTransfer(newItem).pipe(
            map(result => new priceProductAction.GetByIdGoodTransferSuccess(result)),
            catchError(err => of(new priceProductAction.GetByIdGoodTransferFail(err)))
          )
        )
      )
    );

    updateGoodTransfer$ = createEffect(() =>
      this.actions$.pipe(
        ofType(priceProductAction.GoodTransferActionTypes.UpdateGoodTransfer),
        map((action: priceProductAction.UpdateGoodTransfer) => action.payload),
        mergeMap((newItem) =>
          this.priceProductService.updateGoodTransfer(newItem).pipe(
            map(result => new priceProductAction.UpdateGoodTransferSuccess(result)),
            catchError(err => of(new priceProductAction.UpdateGoodTransferFail(err)))
          )
        )
      )
    );

    
    // updateGoodTransfer$ = createEffect(() =>
    //   this.actions$.pipe(
    //     ofType(priceProductAction.GoodTransferActionTypes.UpdateGoodTransfer),
    //     map((action: priceProductAction.UpdateGoodTransfer) => action.payload),
    //     mergeMap((newItem) =>
    //       this.priceProductService.updateItem(newItem).pipe(
    //         map(result => new priceProductAction.UpdateGoodTransferSuccess(result)),
    //         catchError(err => of(new priceProductAction.UpdateGoodTransferFail(err)))
    //       )
    //     )
    //   )
    // );
    

    
    // deleteGoodTransfer$ = createEffect(() =>
    //   this.actions$.pipe(
    //     ofType(priceProductAction.GoodTransferActionTypes.DeleteGoodTransfer),
    //     map((action: priceProductAction.DeleteGoodTransfer) => action.payload),
    //     mergeMap((newItem) =>
    //       this.priceProductService.deleteItem(newItem).pipe(
    //         map(result => new priceProductAction.DeleteGoodTransferSuccess(result)),
    //         catchError(err => of(new priceProductAction.DeleteGoodTransferFail(err)))
    //       )
    //     )
    //   )
    // );
}
