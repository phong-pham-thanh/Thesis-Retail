import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RetailComponentComponent } from './retail-component/retail-component.component';
import { HttpClientModule } from '@angular/common/http';
import { PriceManagementComponent } from './price-management/price-management.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { priceReducer } from './price-management/price-state/price.reducer';
import { productReducer } from './product-state/product.reducer';
import { PriceProductEffects } from './price-management/price-state/price.effects';
import { PriceManagementFormComponent } from './price-management/price-management-form/price-management-form.component'; // Đảm bảo bạn có reducers
import { ProductEffects } from './product-state/product.effects';

@NgModule({
  declarations: [
    AppComponent,
    RetailComponentComponent,
    PriceManagementComponent,
    PriceManagementFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    NgSelectModule,
    FormsModule,
    MatMenuModule,
    MatIconModule,
    BrowserAnimationsModule,
    EffectsModule.forRoot([]),

    StoreModule.forFeature('price-product', priceReducer),
    StoreModule.forRoot(priceReducer),
    EffectsModule.forRoot([PriceProductEffects]),
    EffectsModule.forFeature([PriceProductEffects]),


    StoreModule.forFeature('product', productReducer),
    StoreModule.forRoot(productReducer),
    EffectsModule.forRoot([ProductEffects]),
    EffectsModule.forFeature([ProductEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
