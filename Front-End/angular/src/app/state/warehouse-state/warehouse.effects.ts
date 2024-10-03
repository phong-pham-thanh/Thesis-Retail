import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError, switchMap } from 'rxjs/operators';
/* NgRx */
import { Action } from '@ngrx/store';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { WarehouseService } from '../../services/warehouse.service';
import * as warehouseAction from './warehouse.actions'

@Injectable()
export class WarehouseEffects {
    constructor(private warehouseService: WarehouseService, private actions$: Actions) {}

    loadAllWarehouse$ = createEffect(() =>
        this.actions$.pipe(
          ofType(warehouseAction.WarehouseActionTypes.LoadAllWarehouse),
          mergeMap(() =>
            this.warehouseService.getAllWarehouse().pipe(
              map(result => new warehouseAction.LoadAllWarehouseSuccess(result)),
              catchError(err => of(new warehouseAction.LoadAllWarehouseFail(err)))
            )
          )
        )
      );
}
