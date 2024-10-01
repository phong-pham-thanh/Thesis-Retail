import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError, switchMap } from 'rxjs/operators';
/* NgRx */
import { Action } from '@ngrx/store';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { CustomerService } from '../services/customer.service';
import * as customerAction from './customer.actions'

@Injectable()
export class CustomerEffects {
    constructor(private customerService: CustomerService, private actions$: Actions) {}

    loadAllCustomer$ = createEffect(() =>
      this.actions$.pipe(
        ofType(customerAction.CustomerActionTypes.LoadAllCustomer),
        mergeMap(() =>
          this.customerService.getAllCustomer().pipe(
            map(result => new customerAction.LoadAllCustomerSuccess(result)),
            catchError(err => of(new customerAction.LoadAllCustomerFail(err)))
          )
        )
      )
    );
}
