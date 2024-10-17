import { GoodTransfer } from '../../model/goodTransfer.model';

export interface State{
    bill: GoodTransferState;
}

export interface GoodTransferState {
    allGoodTransfer: GoodTransfer[];
    needRefreshBrowseList: boolean;
    isLoading: boolean;
    isLoaded: boolean;
    isSaving: boolean;
    error: string;
}