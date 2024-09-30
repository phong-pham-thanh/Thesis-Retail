import { PriceProduct } from '../../model/price.model';

export interface State{
    priceProduct: PriceProductState;
}

export interface PriceProductState {
    allPriceProduct: PriceProduct[]
    needRefreshBrowseList: boolean;
    isLoading: boolean;
    isLoaded: boolean;
    isSaving: boolean;
    error: string;
}