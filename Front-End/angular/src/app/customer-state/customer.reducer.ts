/* NgRx */
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CustomerState } from './customer.state';
import { CustomerActions, CustomerActionTypes } from './customer.actions';

const initialState: CustomerState = {
    needRefreshBrowseList: false,
    allCustomer: [],
    isLoading: false,
    isLoaded: false,
    isSaving: false,
    error: '',
};

const getCustomerFeatureState = createFeatureSelector<CustomerState>('customer');

export const getAllCustomer = createSelector(
    getCustomerFeatureState,
    state => state.allCustomer
);


export const getIsLoading = createSelector(
    getCustomerFeatureState,
    state => state.isLoading
);


export const getIsLoaded= createSelector(
    getCustomerFeatureState,
    state => state.isLoaded
);

// Reducer function
export function customerReducer(state = initialState, action: CustomerActions): CustomerState {
    switch (action.type) {
        case CustomerActionTypes.LoadAllCustomer:
            return {
                ...state,
                needRefreshBrowseList: false,
                isLoading: true
            };

        case CustomerActionTypes.LoadAllCustomerSuccess:
            return {
                ...state,
                allCustomer: action.payload,
                isLoading: false,
                isLoaded: true,
                error: ''
            };
        
        case CustomerActionTypes.LoadAllCustomerFail:
            return {
                ...state,
                isLoading: false,
                isLoaded: true,
                error: action.payload
            };
        default:
          return state;
        }
}