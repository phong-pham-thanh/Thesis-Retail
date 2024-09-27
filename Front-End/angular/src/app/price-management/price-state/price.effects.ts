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
}
