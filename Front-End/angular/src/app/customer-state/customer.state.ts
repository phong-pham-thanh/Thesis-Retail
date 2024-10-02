import { Customer } from '../model/customer.model';

export interface State{
    priceCustomer: CustomerState;
}

export interface CustomerState {
    allCustomer: Customer[]
    needRefreshBrowseList: boolean;
    isLoading: boolean;
    isLoaded: boolean;
    isSaving: boolean;
    error: string;
}