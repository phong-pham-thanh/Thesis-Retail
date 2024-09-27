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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { priceReducer } from './price-management/price-state/price.reducer'; // Đảm bảo bạn có reducers
import { PriceProductEffects } from './price-management/price-state/price.effects'; // Đảm bảo bạn có reducers

@NgModule({
  declarations: [
    AppComponent,
    RetailComponentComponent,
    PriceManagementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    StoreModule.forFeature('price-product', priceReducer),  // Đảm bảo bạn đăng ký reducer đúng
    StoreModule.forRoot(priceReducer),  // Đảm bảo StoreModule đã được thêm vào
    EffectsModule.forRoot([]),
    EffectsModule.forRoot([PriceProductEffects]), // Thêm EffectsModule và đăng ký PriceProductEffects
    EffectsModule.forFeature([PriceProductEffects]) // Thêm EffectsModule và đăng ký PriceProductEffects
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
