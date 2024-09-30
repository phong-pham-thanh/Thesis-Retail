/* NgRx */
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from './product.state';
import { EntityMemberActions, ProductActionTypes } from './product.actions';

const initialState: ProductState = {
    needRefreshBrowseList: false,
    allProduct: [],
    isLoading: false,
    isLoaded: false,
    isSaving: false,
    error: '',
};

const getProductFeatureState = createFeatureSelector<ProductState>('product');

export const getAllProduct = createSelector(
    getProductFeatureState,
    state => state.allProduct
);


export const getIsLoading = createSelector(
    getProductFeatureState,
    state => state.isLoading
);


export const getIsLoaded= createSelector(
    getProductFeatureState,
    state => state.isLoaded
);

// Reducer function
export function productReducer(state = initialState, action: EntityMemberActions): ProductState {
    switch (action.type) {
        case ProductActionTypes.LoadAllProduct:
            return {
                ...state,
                needRefreshBrowseList: false,
                isLoading: true
            };

        case ProductActionTypes.LoadAllProductSuccess:
            return {
                ...state,
                allProduct: action.payload,
                isLoading: false,
                isLoaded: true,
                error: ''
            };
        
        case ProductActionTypes.LoadAllProductFail:
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