import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError, switchMap } from 'rxjs/operators';
/* NgRx */
import { Action } from '@ngrx/store';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { UserService } from '../../services/user.service';
import * as userAction from './users.actions'

@Injectable()
export class UsersEffects {
    constructor(private userService: UserService, private actions$: Actions) {}

    loadAllUsers$ = createEffect(() =>
      this.actions$.pipe(
        ofType(userAction.UsersActionTypes.LoadAllUsers),
        mergeMap(() =>
          this.userService.getAllUsers().pipe(
            map(result => new userAction.LoadAllUsersSuccess(result)),
            catchError(err => of(new userAction.LoadAllUsersFail(err)))
          )
        )
      )
    );

    
    addNewUsers$ = createEffect(() =>
      this.actions$.pipe(
        ofType(userAction.UsersActionTypes.AddNewUsers),
        map((action: userAction.AddNewUsers) => action.payload),
        mergeMap((newItem) =>
          this.userService.addNewUser(newItem).pipe(
            map(result => new userAction.AddNewUsersSuccess(result)),
            catchError(err => of(new userAction.AddNewUsersFail(err)))
          )
        )
      )
    );

    
    updateUsers$ = createEffect(() =>
      this.actions$.pipe(
        ofType(userAction.UsersActionTypes.UpdateUsers),
        map((action: userAction.UpdateUsers) => action.payload),
        mergeMap((newItem) =>
          this.userService.updateUser(newItem).pipe(
            map(result => new userAction.UpdateUsersSuccess(result)),
            catchError(err => of(new userAction.UpdateUsersFail(err)))
          )
        )
      )
    );
    

    
    // deleteUsers$ = createEffect(() =>
    //   this.actions$.pipe(
    //     ofType(userAction.UsersActionTypes.DeleteUsers),
    //     map((action: userAction.DeleteUsers) => action.payload),
    //     mergeMap((newItem) =>
    //       this.userService.deleteItem(newItem).pipe(
    //         map(result => new userAction.DeleteUsersSuccess(result)),
    //         catchError(err => of(new userAction.DeleteUsersFail(err)))
    //       )
    //     )
    //   )
    // );
}
