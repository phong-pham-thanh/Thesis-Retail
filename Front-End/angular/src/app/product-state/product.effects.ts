import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError, switchMap } from 'rxjs/operators';
/* NgRx */
import { Action } from '@ngrx/store';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { ProductService } from '../services/product.service';
import * as productAction from './product.actions'

@Injectable()
export class ProductEffects {
    constructor(private productService: ProductService, private actions$: Actions) {}

    loadAllProduct$ = createEffect(() =>
        this.actions$.pipe(
          ofType(productAction.ProductActionTypes.LoadAllProduct),
          mergeMap(() =>
            this.productService.getAllProduct().pipe(
              map(result => new productAction.LoadAllProductSuccess(result)),
              catchError(err => of(new productAction.LoadAllProductFail(err)))
            )
          )
        )
      );
}
