/* NgRx */
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WarehouseState } from './warehouse.state';
import { WarehouseActions, WarehouseActionTypes } from './warehouse.actions';

const initialState: WarehouseState = {
    needRefreshBrowseList: false,
    allWarehouse: [],
    isLoading: false,
    isLoaded: false,
    isSaving: false,
    error: '',
};

const getWarehouseFeatureState = createFeatureSelector<WarehouseState>('warehouse');

export const getAllWarehouse = createSelector(
    getWarehouseFeatureState,
    state => state.allWarehouse
);


export const getIsLoading = createSelector(
    getWarehouseFeatureState,
    state => state.isLoading
);


export const getIsLoaded= createSelector(
    getWarehouseFeatureState,
    state => state.isLoaded
);

// Reducer function
export function warehouseReducer(state = initialState, action: WarehouseActions): WarehouseState {
    switch (action.type) {
        case WarehouseActionTypes.LoadAllWarehouse:
            return {
                ...state,
                needRefreshBrowseList: false,
                isLoading: true
            };

        case WarehouseActionTypes.LoadAllWarehouseSuccess:
            return {
                ...state,
                allWarehouse: action.payload,
                isLoading: false,
                isLoaded: true,
                error: ''
            };
        
        case WarehouseActionTypes.LoadAllWarehouseFail:
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