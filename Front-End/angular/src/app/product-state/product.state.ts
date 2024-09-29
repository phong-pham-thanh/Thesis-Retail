import { Product } from '../model/product.model';

export interface State{
    priceProduct: ProductState;
}

export interface ProductState {
    allProduct: Product[]
    needRefreshBrowseList: boolean;
    isLoading: boolean;
    isLoaded: boolean;
    isSaving: boolean;
    error: string;
}