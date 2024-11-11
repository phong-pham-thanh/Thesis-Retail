/* NgRx */
import { Action } from '@ngrx/store';
import { Users } from '../../model/user.model';
// import { UsersDetails } from '../../model/usersDetail.model';


export enum UsersActionTypes {
    AddNewUsers = '[AddNewUsers] Add new Users',
    AddNewUsersSuccess = '[AddNewUsers] Add new Users Success',
    AddNewUsersFail = '[AddNewUsers] Add new Users Fail',
    LoadAllUsers = '[AllUsers] Load All Price Users',
    LoadAllUsersSuccess = '[AllUsers] Load AllUsers Success',
    LoadAllUsersFail = '[AllUsers] Load AllUsers Fail',
    UpdateUsers = '[UpdateUsers] Update Users',
    UpdateUsersSuccess = '[UpdateUsers] Update Users Success',
    UpdateUsersFail = '[UpdateUsers] Update Users Fail',
}

export class LoadAllUsers implements Action {
    readonly type = UsersActionTypes.LoadAllUsers;

    constructor() { }
}

export class LoadAllUsersSuccess implements Action {
    readonly type = UsersActionTypes.LoadAllUsersSuccess;

    constructor(public payload: Users[]) { }
}
  
export class LoadAllUsersFail implements Action {
    readonly type = UsersActionTypes.LoadAllUsersFail;
  
    constructor(public payload: string) { }
}

export class AddNewUsers implements Action {
    readonly type = UsersActionTypes.AddNewUsers;

    constructor(public payload: Users) { }
}

export class AddNewUsersSuccess implements Action {
    readonly type = UsersActionTypes.AddNewUsersSuccess;

    constructor(public payload: Users) { }
}
  
export class AddNewUsersFail implements Action {
    readonly type = UsersActionTypes.AddNewUsersFail;
  
    constructor(public payload: string) { }
}

export class UpdateUsers implements Action {
    readonly type = UsersActionTypes.UpdateUsers;

    constructor(public payload: Users) { }
}

export class UpdateUsersSuccess implements Action {
    readonly type = UsersActionTypes.UpdateUsersSuccess;

    constructor(public payload: Users) { }
}
  
export class UpdateUsersFail implements Action {
    readonly type = UsersActionTypes.UpdateUsersFail;
  
    constructor(public payload: string) { }
}

export type UsersActions = LoadAllUsers
  | LoadAllUsersSuccess
  | LoadAllUsersFail
  | AddNewUsers
  | AddNewUsersSuccess
  | AddNewUsersFail
  | UpdateUsers
  | UpdateUsersSuccess
  | UpdateUsersFail
  | AddNewUsers
  | AddNewUsersSuccess
  | AddNewUsersFail