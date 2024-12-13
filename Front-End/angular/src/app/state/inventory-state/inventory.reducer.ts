/* NgRx */
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { InventoryState } from './inventory.state';
import { InventoryActions, InventoryActionTypes } from './inventory.actions';

const initialState: InventoryState = {
    needRefreshBrowseList: true,
    currentInventory: null,
    allInventory: [],
    isLoading: false,
    isLoaded: false,
    isSaving: false,
    error: '',
};

const getInventoryFeatureState = createFeatureSelector<InventoryState>('inventory');

export const getAllInventory = createSelector(
    getInventoryFeatureState,
    state => state.allInventory
);


export const getIsLoading = createSelector(
    getInventoryFeatureState,
    state => state.isLoading
);


export const getIsLoaded= createSelector(
    getInventoryFeatureState,
    state => state.isLoaded
);

export const getError= createSelector(
    getInventoryFeatureState,
    state => state.error
);

export const getNeedResetBrowseList= createSelector(
    getInventoryFeatureState,
    state => state.needRefreshBrowseList
);

// Reducer function
export function inventoryReducer(state = initialState, action: InventoryActions): InventoryState {
    switch (action.type) {
        case InventoryActionTypes.LoadAllInventory:
            return {
                ...state,
                needRefreshBrowseList: false,
                isLoading: true
            };

        case InventoryActionTypes.LoadAllInventorySuccess:
            return {
                ...state,
                allInventory: action.payload,
                isLoading: false,
                isLoaded: true,
                error: null,
            };
        
        case InventoryActionTypes.LoadAllInventoryFail:
            return {
                ...state,
                isLoading: false,
                isLoaded: true,
                error: action.payload
            };
    
        // case InventoryActionTypes.AddNewInventory:
        //     return {
        //         ...state,
        //         needRefreshBrowseList: false,
        //         isLoading: true
        //     };

        // case InventoryActionTypes.AddNewInventorySuccess:
        //     return {
        //         ...state,
        //         isLoading: false,
        //         isLoaded: true,
        //         needRefreshBrowseList: true,
        //         error: null,
        //     };
        
        // case InventoryActionTypes.AddNewInventoryFail:
        //     return {
        //         ...state,
        //         isLoading: false,
        //         isLoaded: true,
        //         error: action.payload
        //     };
    
        // case InventoryActionTypes.AcceptInventory:
        //     return {
        //         ...state,
        //         needRefreshBrowseList: false,
        //         isLoading: true
        //     };

        // case InventoryActionTypes.AcceptInventorySuccess:
        //     return {
        //         ...state,
        //         isLoading: false,
        //         isLoaded: true,
        //         needRefreshBrowseList: true,
        //         error: null,
        //     };
        
        // case InventoryActionTypes.AcceptInventoryFail:
        //     return {
        //         ...state,
        //         isLoading: false,
        //         isLoaded: true,
        //         error: action.payload
        //     };
    
        // case InventoryActionTypes.CancelInventory:
        //     return {
        //         ...state,
        //         needRefreshBrowseList: false,
        //         isLoading: true
        //     };

        // case InventoryActionTypes.CancelInventorySuccess:
        //     return {
        //         ...state,
        //         isLoading: false,
        //         isLoaded: true,
        //         needRefreshBrowseList: true,
        //         error: null,
        //     };
        
        // case InventoryActionTypes.CancelInventoryFail:
        //     return {
        //         ...state,
        //         isLoading: false,
        //         isLoaded: true,
        //         error: action.payload
        //     };
        
        // case InventoryActionTypes.DeleteInventory:
        //     return {
        //         ...state,
        //         needRefreshBrowseList: false,
        //         isLoading: true
        //     };

        // case InventoryActionTypes.DeleteInventorySuccess:
        //     return {
        //         ...state,
        //         isLoading: false,
        //         isLoaded: true,
        //         needRefreshBrowseList: true,
        //         error: null,
        //     };
        
        // case InventoryActionTypes.DeleteInventoryFail:
        //     return {
        //         ...state,
        //         isLoading: false,
        //         isLoaded: true,
        //         error: action.payload
        //     };

        case InventoryActionTypes.GetByIdInventory:
            return {
                ...state,
                isLoading: true
            };

        case InventoryActionTypes.GetByIdInventorySuccess:
            return {
                ...state,
                currentInventory: action.payload,
                isLoading: false,
                isLoaded: true,
                error: null,
            };
        
        case InventoryActionTypes.GetByIdInventoryFail:
            return {
                ...state,
                isLoading: false,
                isLoaded: true,
                error: action.payload,
                currentInventory: null,
            };
        
        // case InventoryActionTypes.UpdateInventory:
        //     return {
        //         ...state,
        //         needRefreshBrowseList: false,
        //         isLoading: true
        //     };

        // case InventoryActionTypes.UpdateInventorySuccess:
        //     return {
        //         ...state,
        //         isLoading: false,
        //         isLoaded: true,
        //         needRefreshBrowseList: true,
        //         error: null,
        //     };
        
        // case InventoryActionTypes.UpdateInventoryFail:
        //     return {
        //         ...state,
        //         isLoading: false,
        //         isLoaded: true,
        //         error: action.payload
        //     };    

        // case InventoryActionTypes.ResetCurrentInventory:
        //     return {
        //         ...state,
        //         currentInventory: null,
        //         needRefreshBrowseList: true,
        //     };    
        // case InventoryActionTypes.DeleteInventory:
        //     return {
        //         ...state,
        //         needRefreshBrowseList: false,
        //         isLoading: true
        //     };

        // case InventoryActionTypes.DeleteInventorySuccess:
        //     return {
        //         ...state,
        //         isLoading: false,
        //         isLoaded: true,
        //         needRefreshBrowseList: true,
        //         error: ''
        //     };
        
        // case InventoryActionTypes.DeleteInventoryFail:
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