/* NgRx */
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersState } from './users.state';
import { UsersActions, UsersActionTypes } from './users.actions';

const initialState: UsersState = {
    needRefreshBrowseList: false,
    allUsers: [],
    currentUser: null,
    isLoading: false,
    isLoaded: false,
    isSaving: false,
    error: '',
};

const getUsersFeatureState = createFeatureSelector<UsersState>('users');

export const getAllUsers = createSelector(
    getUsersFeatureState,
    state => state.allUsers
);

export const getCurrentUser = createSelector(
    getUsersFeatureState,
    state => state.currentUser
);

export const getIsLoading = createSelector(
    getUsersFeatureState,
    state => state.isLoading
);


export const getIsLoaded= createSelector(
    getUsersFeatureState,
    state => state.isLoaded
);

export const getError= createSelector(
    getUsersFeatureState,
    state => state.error
);

// Reducer function
export function usersReducer(state = initialState, action: UsersActions): UsersState {
    switch (action.type) {
        case UsersActionTypes.LoadAllUsers:
            return {
                ...state,
                needRefreshBrowseList: false,
                isLoading: true
            };

        case UsersActionTypes.LoadAllUsersSuccess:
            return {
                ...state,
                allUsers: action.payload,
                isLoading: false,
                isLoaded: true,
                error: ''
            };
        
        case UsersActionTypes.LoadAllUsersFail:
            return {
                ...state,
                isLoading: false,
                isLoaded: true,
                error: action.payload
            };
    
        case UsersActionTypes.AddNewUsers:
            return {
                ...state,
                needRefreshBrowseList: false,
                isLoading: true
            };

        case UsersActionTypes.AddNewUsersSuccess:
            return {
                ...state,
                isLoading: false,
                isLoaded: true,
                needRefreshBrowseList: true,
                error: ''
            };
        
        case UsersActionTypes.AddNewUsersFail:
            return {
                ...state,
                isLoading: false,
                isLoaded: true,
                error: action.payload
            };
        
        case UsersActionTypes.UpdateUsers:
            return {
                ...state,
                needRefreshBrowseList: false,
                isLoading: true
            };

        case UsersActionTypes.UpdateUsersSuccess:
            return {
                ...state,
                isLoading: false,
                isLoaded: true,
                needRefreshBrowseList: true,
                error: ''
            };
        
        case UsersActionTypes.UpdateUsersFail:
            return {
                ...state,
                isLoading: false,
                isLoaded: true,
                error: action.payload
            };
        
        case UsersActionTypes.LoadCurrentuser:
            return {
                ...state,
                needRefreshBrowseList: false,
                isLoaded: false,
                isLoading: true
            };

        case UsersActionTypes.LoadCurrentuserSuccess:
            return {
                ...state,
                currentUser: action.payload,
                isLoading: false,
                isLoaded: true,
                error: ''
            };
        
        case UsersActionTypes.LoadCurrentuserFail:
            return {
                ...state,
                isLoading: false,
                isLoaded: true,
                error: action.payload
            };
        // case UsersActionTypes.DeleteUsers:
        //     return {
        //         ...state,
        //         needRefreshBrowseList: false,
        //         isLoading: true
        //     };

        // case UsersActionTypes.DeleteUsersSuccess:
        //     return {
        //         ...state,
        //         isLoading: false,
        //         isLoaded: true,
        //         needRefreshBrowseList: true,
        //         error: ''
        //     };
        
        // case UsersActionTypes.DeleteUsersFail:
        //     return {
        //         ...state,
        //         isLoading: false,
        //         isLoaded: true,
        //         error: action.payload
        //     };
        default:
          return state;
        }
}