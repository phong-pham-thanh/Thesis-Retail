import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError, switchMap } from 'rxjs/operators';
/* NgRx */
import { Action } from '@ngrx/store';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { PriceProductService } from '../price.service';
import * as priceProductAction from './price.actions'

@Injectable()
export class PriceProductEffects {
    constructor(private priceProductService: PriceProductService, private actions$: Actions) {}

    loadAllPriceProduct$ = createEffect(() =>
      this.actions$.pipe(
        ofType(priceProductAction.PriceProductActionTypes.LoadAllPriceProduct),
        mergeMap(() =>
          this.priceProductService.getAllPriceProduct().pipe(
            map(result => new priceProductAction.LoadAllPriceProductSuccess(result)),
            catchError(err => of(new priceProductAction.LoadAllPriceProductFail(err)))
          )
        )
      )
    );

    
    addNewPriceProduct$ = createEffect(() =>
      this.actions$.pipe(
        ofType(priceProductAction.PriceProductActionTypes.AddNewPriceProduct),
        map((action: priceProductAction.AddNewPriceProduct) => action.payload),
        mergeMap((newItem) =>
          this.priceProductService.addNewItem(newItem).pipe(
            map(result => new priceProductAction.AddNewPriceProductSuccess(result)),
            catchError(err => of(new priceProductAction.AddNewPriceProductFail(err)))
          )
        )
      )
    );

    
    updatePriceProduct$ = createEffect(() =>
      this.actions$.pipe(
        ofType(priceProductAction.PriceProductActionTypes.UpdatePriceProduct),
        map((action: priceProductAction.UpdatePriceProduct) => action.payload),
        mergeMap((newItem) =>
          this.priceProductService.updateItem(newItem).pipe(
            map(result => new priceProductAction.UpdatePriceProductSuccess(result)),
            catchError(err => of(new priceProductAction.UpdatePriceProductFail(err)))
          )
        )
      )
    );
    

    
    deletePriceProduct$ = createEffect(() =>
      this.actions$.pipe(
        ofType(priceProductAction.PriceProductActionTypes.DeletePriceProduct),
        map((action: priceProductAction.DeletePriceProduct) => action.payload),
        mergeMap((newItem) =>
          this.priceProductService.deleteItem(newItem).pipe(
            map(result => new priceProductAction.DeletePriceProductSuccess(result)),
            catchError(err => of(new priceProductAction.DeletePriceProductFail(err)))
          )
        )
      )
    );
}
