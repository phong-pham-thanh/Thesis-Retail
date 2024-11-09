/* NgRx */
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WarehouseState } from './warehouse.state';
import { WarehouseActions, WarehouseActionTypes } from './warehouse.actions';

const initialState: WarehouseState = {
    needRefreshBrowseList: false,
    allWarehouse: [],
    allWarehouseByRole: [],
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

export const getAllWarehouseByRole = createSelector(
    getWarehouseFeatureState,
    state => state.allWarehouseByRole
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
                isLoaded: false,
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
        
        case WarehouseActionTypes.LoadAllWarehouseByRole:
            return {
                ...state,
                needRefreshBrowseList: false,
                isLoaded: false,
                isLoading: true
            };

        case WarehouseActionTypes.LoadAllWarehouseByRoleSuccess:
            return {
                ...state,
                allWarehouseByRole: action.payload,
                isLoading: false,
                isLoaded: true,
                error: ''
            };
        
        case WarehouseActionTypes.LoadAllWarehouseByRoleFail:
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