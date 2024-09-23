// product.state.ts
import { Product } from '../../model/product.model';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export interface ProductState extends EntityState<Product> {
  loading: boolean;
  error: string | null;
}

export const adapter: EntityAdapter<Product> = createEntityAdapter<Product>();

export const initialState: ProductState = adapter.getInitialState({
  loading: false,
  error: null,
});
