/* NgRx */
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BillState } from './bill.state';
import { BillActions, BillActionTypes } from './bill.actions';

const initialState: BillState = {
    needRefreshBrowseList: false,
    allBill: [],
    isLoading: false,
    isLoaded: false,
    isSaving: false,
    error: '',
};

const getBillFeatureState = createFeatureSelector<BillState>('bill');

export const getAllBill = createSelector(
    getBillFeatureState,
    state => state.allBill
);


export const getIsLoading = createSelector(
    getBillFeatureState,
    state => state.isLoading
);


export const getIsLoaded= createSelector(
    getBillFeatureState,
    state => state.isLoaded
);

export const getError= createSelector(
    getBillFeatureState,
    state => state.error
);

// Reducer function
export function billReducer(state = initialState, action: BillActions): BillState {
    switch (action.type) {
        // case BillActionTypes.LoadAllBill:
        //     return {
        //         ...state,
        //         needRefreshBrowseList: false,
        //         isLoading: true
        //     };

        // case BillActionTypes.LoadAllBillSuccess:
        //     return {
        //         ...state,
        //         allBill: action.payload,
        //         isLoading: false,
        //         isLoaded: true,
        //         error: ''
        //     };
        
        // case BillActionTypes.LoadAllBillFail:
        //     return {
        //         ...state,
        //         isLoading: false,
        //         isLoaded: true,
        //         error: action.payload
        //     };
    
        case BillActionTypes.AddNewBill:
            return {
                ...state,
                needRefreshBrowseList: false,
                isLoading: true
            };

        case BillActionTypes.AddNewBillSuccess:
            return {
                ...state,
                isLoading: false,
                isLoaded: true,
                needRefreshBrowseList: true,
                error: ''
            };
        
        case BillActionTypes.AddNewBillFail:
            return {
                ...state,
                isLoading: false,
                isLoaded: true,
                error: action.payload
            };
        // case BillActionTypes.DeleteBill:
        //     return {
        //         ...state,
        //         needRefreshBrowseList: false,
        //         isLoading: true
        //     };

        // case BillActionTypes.DeleteBillSuccess:
        //     return {
        //         ...state,
        //         isLoading: false,
        //         isLoaded: true,
        //         needRefreshBrowseList: true,
        //         error: ''
        //     };
        
        // case BillActionTypes.DeleteBillFail:
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