import { Bill } from '../../model/bill.model';

export interface State{
    bill: BillState;
}

export interface BillState {
    allBill: Bill[];
    needRefreshBrowseList: boolean;
    isLoading: boolean;
    isLoaded: boolean;
    isSaving: boolean;
    error: any;
}