import { GoodTransfer } from '../../model/goodTransfer.model';

export interface State{
    bill: GoodTransferState;
}

export interface GoodTransferState {
    allGoodTransfer: GoodTransfer[];
    currentGoodTransfer: GoodTransfer;
    needRefreshBrowseList: boolean;
    isLoading: boolean;
    isLoaded: boolean;
    isSaving: boolean;
    error: any;
}