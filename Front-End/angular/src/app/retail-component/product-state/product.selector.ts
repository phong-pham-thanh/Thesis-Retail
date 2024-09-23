// product.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectAll } from './product.reducer';
import { ProductState } from './product.state';

export const selectProductState = createFeatureSelector<ProductState>('products');

export const selectAllProducts = createSelector(selectProductState, selectAll);

export const selectLoading = createSelector(
  selectProductState,
  (state: ProductState) => state.loading
);

export const selectError = createSelector(
  selectProductState,
  (state: ProductState) => state.error
);
