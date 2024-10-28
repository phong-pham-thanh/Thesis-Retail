import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError, switchMap } from 'rxjs/operators';
/* NgRx */
import { Action } from '@ngrx/store';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { UserService } from '../../services/user.service';
import * as priceProductAction from './users.actions'

@Injectable()
export class UsersEffects {
    constructor(private priceProductService: UserService, private actions$: Actions) {}

    loadAllUsers$ = createEffect(() =>
      this.actions$.pipe(
        ofType(priceProductAction.UsersActionTypes.LoadAllUsers),
        mergeMap(() =>
          this.priceProductService.getAllUsers().pipe(
            map(result => new priceProductAction.LoadAllUsersSuccess(result)),
            catchError(err => of(new priceProductAction.LoadAllUsersFail(err)))
          )
        )
      )
    );

    
    // addNewUsers$ = createEffect(() =>
    //   this.actions$.pipe(
    //     ofType(priceProductAction.UsersActionTypes.AddNewUsers),
    //     map((action: priceProductAction.AddNewUsers) => action.payload),
    //     mergeMap((newItem) =>
    //       this.priceProductService.addNewUsers(newItem).pipe(
    //         map(result => new priceProductAction.AddNewUsersSuccess(result)),
    //         catchError(err => of(new priceProductAction.AddNewUsersFail(err)))
    //       )
    //     )
    //   )
    // );

    
    updateUsers$ = createEffect(() =>
      this.actions$.pipe(
        ofType(priceProductAction.UsersActionTypes.UpdateUsers),
        map((action: priceProductAction.UpdateUsers) => action.payload),
        mergeMap((newItem) =>
          this.priceProductService.updateUser(newItem).pipe(
            map(result => new priceProductAction.UpdateUsersSuccess(result)),
            catchError(err => of(new priceProductAction.UpdateUsersFail(err)))
          )
        )
      )
    );
    

    
    // deleteUsers$ = createEffect(() =>
    //   this.actions$.pipe(
    //     ofType(priceProductAction.UsersActionTypes.DeleteUsers),
    //     map((action: priceProductAction.DeleteUsers) => action.payload),
    //     mergeMap((newItem) =>
    //       this.priceProductService.deleteItem(newItem).pipe(
    //         map(result => new priceProductAction.DeleteUsersSuccess(result)),
    //         catchError(err => of(new priceProductAction.DeleteUsersFail(err)))
    //       )
    //     )
    //   )
    // );
}
