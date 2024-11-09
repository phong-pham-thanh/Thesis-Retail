import { Warehouse } from '../../model/warehouse.model';

export interface State{
    priceWarehouse: WarehouseState;
}

export interface WarehouseState {
    allWarehouse: Warehouse[];
    allWarehouseByRole: Warehouse[];
    needRefreshBrowseList: boolean;
    isLoading: boolean;
    isLoaded: boolean;
    isSaving: boolean;
    error: string;
}