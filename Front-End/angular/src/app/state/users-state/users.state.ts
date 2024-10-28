import { Users } from '../../model/user.model';

export interface State{
    users: UsersState;
}

export interface UsersState {
    allUsers: Users[];
    needRefreshBrowseList: boolean;
    isLoading: boolean;
    isLoaded: boolean;
    isSaving: boolean;
    error: any;
}