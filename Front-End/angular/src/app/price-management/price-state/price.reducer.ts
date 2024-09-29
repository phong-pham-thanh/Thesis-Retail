/* NgRx */
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PriceProductState } from './price.state';
import { EntityMemberActions, PriceProductActionTypes } from './price.actions';

const initialState: PriceProductState = {
    needRefreshBrowseList: false,
    allPriceProduct: [],
    isLoading: false,
    isLoaded: false,
    isSaving: false,
    error: '',
};

const getPriceProductFeatureState = createFeatureSelector<PriceProductState>('price-product');

export const getAllPriceProduct = createSelector(
    getPriceProductFeatureState,
    state => state.allPriceProduct
);


export const getIsLoading = createSelector(
    getPriceProductFeatureState,
    state => state.isLoading
);


export const getIsLoaded= createSelector(
    getPriceProductFeatureState,
    state => state.isLoaded
);

// Reducer function
export function priceReducer(state = initialState, action: EntityMemberActions): PriceProductState {
    switch (action.type) {
        case PriceProductActionTypes.LoadAllPriceProduct:
            return {
                ...state,
                needRefreshBrowseList: false,
                isLoading: true
            };

        case PriceProductActionTypes.LoadAllPriceProductSuccess:
            return {
                ...state,
                allPriceProduct: action.payload,
                isLoading: false,
                isLoaded: true,
                error: ''
            };
        
        case PriceProductActionTypes.LoadAllPriceProductFail:
            return {
                ...state,
                isLoading: false,
                isLoaded: true,
                error: action.payload
            };
    
        case PriceProductActionTypes.AddNewPriceProduct:
            return {
                ...state,
                needRefreshBrowseList: false,
                isLoading: true
            };

        case PriceProductActionTypes.AddNewPriceProductSuccess:
            return {
                ...state,
                isLoading: false,
                isLoaded: true,
                needRefreshBrowseList: true,
                error: ''
            };
        
        case PriceProductActionTypes.AddNewPriceProductFail:
            return {
                ...state,
                isLoading: false,
                isLoaded: true,
                error: action.payload
            };
    
        case PriceProductActionTypes.UpdatePriceProduct:
            return {
                ...state,
                needRefreshBrowseList: false,
                isLoading: true
            };

        case PriceProductActionTypes.UpdatePriceProductSuccess:
            return {
                ...state,
                isLoading: false,
                isLoaded: true,
                needRefreshBrowseList: true,
                error: ''
            };
        
        case PriceProductActionTypes.UpdatePriceProductFail:
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