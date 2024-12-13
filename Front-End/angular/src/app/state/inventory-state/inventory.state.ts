import { Inventory } from '../../model/inventory.model';

export interface State{
    inventory: InventoryState;
}

export interface InventoryState {
    allInventory: Inventory[];
    currentInventory: Inventory;
    needRefreshBrowseList: boolean;
    isLoading: boolean;
    isLoaded: boolean;
    isSaving: boolean;
    error: any;
}