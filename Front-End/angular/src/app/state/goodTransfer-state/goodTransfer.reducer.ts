/* NgRx */
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GoodTransferState } from './goodTransfer.state';
import { GoodTransferActions, GoodTransferActionTypes } from './goodTransfer.actions';

const initialState: GoodTransferState = {
    needRefreshBrowseList: true,
    currentGoodTransfer: null,
    allGoodTransfer: [],
    isLoading: false,
    isLoaded: false,
    isSaving: false,
    error: '',
};

const getGoodTransferFeatureState = createFeatureSelector<GoodTransferState>('goodTransfer');

export const getAllGoodTransfer = createSelector(
    getGoodTransferFeatureState,
    state => state.allGoodTransfer
);


export const getIsLoading = createSelector(
    getGoodTransferFeatureState,
    state => state.isLoading
);


export const getIsLoaded= createSelector(
    getGoodTransferFeatureState,
    state => state.isLoaded
);

export const getError= createSelector(
    getGoodTransferFeatureState,
    state => state.error
);

export const getCurrentGoodTransfer= createSelector(
    getGoodTransferFeatureState,
    state => state.currentGoodTransfer
);

export const getNeedResetBrowseList= createSelector(
    getGoodTransferFeatureState,
    state => state.needRefreshBrowseList
);

// Reducer function
export function goodTransferReducer(state = initialState, action: GoodTransferActions): GoodTransferState {
    switch (action.type) {
        case GoodTransferActionTypes.LoadAllGoodTransfer:
            return {
                ...state,
                needRefreshBrowseList: false,
                isLoading: true
            };

        case GoodTransferActionTypes.LoadAllGoodTransferSuccess:
            return {
                ...state,
                allGoodTransfer: action.payload,
                isLoading: false,
                isLoaded: true,
                error: null,
            };
        
        case GoodTransferActionTypes.LoadAllGoodTransferFail:
            return {
                ...state,
                isLoading: false,
                isLoaded: true,
                error: action.payload
            };
    
        case GoodTransferActionTypes.AddNewGoodTransfer:
            return {
                ...state,
                needRefreshBrowseList: false,
                isLoading: true
            };

        case GoodTransferActionTypes.AddNewGoodTransferSuccess:
            return {
                ...state,
                isLoading: false,
                isLoaded: true,
                needRefreshBrowseList: true,
                error: null,
            };
        
        case GoodTransferActionTypes.AddNewGoodTransferFail:
            return {
                ...state,
                isLoading: false,
                isLoaded: true,
                error: action.payload
            };
    
        case GoodTransferActionTypes.AcceptGoodTransfer:
            return {
                ...state,
                needRefreshBrowseList: false,
                isLoading: true
            };

        case GoodTransferActionTypes.AcceptGoodTransferSuccess:
            return {
                ...state,
                isLoading: false,
                isLoaded: true,
                needRefreshBrowseList: true,
                error: null,
            };
        
        case GoodTransferActionTypes.AcceptGoodTransferFail:
            return {
                ...state,
                isLoading: false,
                isLoaded: true,
                error: action.payload
            };
    
        case GoodTransferActionTypes.CancelGoodTransfer:
            return {
                ...state,
                needRefreshBrowseList: false,
                isLoading: true
            };

        case GoodTransferActionTypes.CancelGoodTransferSuccess:
            return {
                ...state,
                isLoading: false,
                isLoaded: true,
                needRefreshBrowseList: true,
                error: null,
            };
        
        case GoodTransferActionTypes.CancelGoodTransferFail:
            return {
                ...state,
                isLoading: false,
                isLoaded: true,
                error: action.payload
            };
            
        case GoodTransferActionTypes.GetByIdGoodTransfer:
            return {
                ...state,
                isLoading: true
            };

        case GoodTransferActionTypes.GetByIdGoodTransferSuccess:
            return {
                ...state,
                currentGoodTransfer: action.payload,
                isLoading: false,
                isLoaded: true,
                error: null,
            };
        
        case GoodTransferActionTypes.GetByIdGoodTransferFail:
            return {
                ...state,
                isLoading: false,
                isLoaded: true,
                error: action.payload,
                currentGoodTransfer: null,
            };
        
        case GoodTransferActionTypes.UpdateGoodTransfer:
            return {
                ...state,
                needRefreshBrowseList: false,
                isLoading: true
            };

        case GoodTransferActionTypes.UpdateGoodTransferSuccess:
            return {
                ...state,
                isLoading: false,
                isLoaded: true,
                needRefreshBrowseList: true,
                error: null,
            };
        
        case GoodTransferActionTypes.UpdateGoodTransferFail:
            return {
                ...state,
                isLoading: false,
                isLoaded: true,
                error: action.payload
            };    

        case GoodTransferActionTypes.ResetCurrentGoodTransfer:
            return {
                ...state,
                currentGoodTransfer: null,
                needRefreshBrowseList: true,
            };    
        // case GoodTransferActionTypes.DeleteGoodTransfer:
        //     return {
        //         ...state,
        //         needRefreshBrowseList: false,
        //         isLoading: true
        //     };

        // case GoodTransferActionTypes.DeleteGoodTransferSuccess:
        //     return {
        //         ...state,
        //         isLoading: false,
        //         isLoaded: true,
        //         needRefreshBrowseList: true,
        //         error: ''
        //     };
        
        // case GoodTransferActionTypes.DeleteGoodTransferFail:
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