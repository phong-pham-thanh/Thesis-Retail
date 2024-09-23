// product.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { adapter, initialState } from './product.state';
import * as ProductActions from './product.actions';

export const productReducer = createReducer(
  initialState,
  on(ProductActions.loadProducts, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ProductActions.loadProductsSuccess, (state, { products }) =>
    adapter.setAll(products, { ...state, loading: false })
  ),
  on(ProductActions.loadProductsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);

// Export các hàm của adapter để giúp truy cập dữ liệu từ state.
export const { selectAll } = adapter.getSelectors();
