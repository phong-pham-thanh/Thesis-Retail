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
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import {NgxPaginationModule} from 'ngx-pagination';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { CookieService } from 'ngx-cookie-service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';


import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { priceReducer } from './price-management/price-state/price.reducer';
import { PriceProductEffects } from './price-management/price-state/price.effects';

import { productReducer } from './product-state/product.reducer';
import { ProductEffects } from './product-state/product.effects';

import { warehouseReducer } from './state/warehouse-state/warehouse.reducer';
import { WarehouseEffects } from './state/warehouse-state/warehouse.effects';

import { CustomerEffects } from './customer-state/customer.effects';
import { customerReducer } from './customer-state/customer.reducer';

import { BillEffects } from './state/bill-state/bill.effects';
import { billReducer } from './state/bill-state/bill.reducer';


import { GoodTransferEffects } from './state/goodTransfer-state/goodTransfer.effects';
import { goodTransferReducer } from './state/goodTransfer-state/goodTransfer.reducer';

import { UsersEffects } from './state/users-state/users.effects';
import { usersReducer } from './state/users-state/users.reducer';

import { PriceManagementFormComponent } from './price-management/price-management-form/price-management-form.component';
import { RetailPaymentComponentComponent } from './retail-component/retail-payment-component/retail-payment-component.component';
import { BillListComponent } from './bill-list/bill-list.component';
import { BillDetailComponent } from './bill-list/bill-detail/bill-detail.component';
import { GoodTransferComponent } from './good-transfer/good-transfer.component';
import { GoodTransferDetailComponent } from './good-transfer/good-transfer-detail/good-transfer-detail.component';
import { GoodTransferViewComponent } from './good-transfer/good-transfer-view/good-transfer-view.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-list/user-form/user-form.component'; // Đảm bảo bạn có reducers


export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MM YYYY',
  },
};

@NgModule({
  declarations: [
    AppComponent,
    RetailComponentComponent,
    PriceManagementComponent,
    PriceManagementFormComponent,
    RetailPaymentComponentComponent,
    BillListComponent,
    BillDetailComponent,
    GoodTransferComponent,
    GoodTransferDetailComponent,
    GoodTransferViewComponent,
    UserListComponent,
    UserFormComponent
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
    ReactiveFormsModule,
    MatMenuModule,
    MatIconModule,
    NgxPaginationModule,
    NgxMaskDirective,
    BrowserAnimationsModule,
    NgbModule,
    MatDatepickerModule,
    MatNativeDateModule,
    EffectsModule.forRoot([]),

    StoreModule.forFeature('price-product', priceReducer),
    StoreModule.forRoot(priceReducer),
    EffectsModule.forRoot([PriceProductEffects]),
    EffectsModule.forFeature([PriceProductEffects]),


    StoreModule.forFeature('product', productReducer),
    StoreModule.forRoot(productReducer),
    EffectsModule.forRoot([ProductEffects]),
    EffectsModule.forFeature([ProductEffects]),


    StoreModule.forFeature('customer', customerReducer),
    StoreModule.forRoot(customerReducer),
    EffectsModule.forRoot([CustomerEffects]),
    EffectsModule.forFeature([CustomerEffects]),
    
    StoreModule.forFeature('bill', billReducer),
    StoreModule.forRoot(billReducer),
    EffectsModule.forRoot([BillEffects]),
    EffectsModule.forFeature([BillEffects]),

    StoreModule.forFeature('warehouse', warehouseReducer),
    StoreModule.forRoot(warehouseReducer),
    EffectsModule.forRoot([WarehouseEffects]),
    EffectsModule.forFeature([WarehouseEffects]),
    
    StoreModule.forFeature('goodTransfer', goodTransferReducer),
    StoreModule.forRoot(goodTransferReducer),
    EffectsModule.forRoot([GoodTransferEffects]),
    EffectsModule.forFeature([GoodTransferEffects]),
    
    StoreModule.forFeature('users', usersReducer),
    StoreModule.forRoot(usersReducer),
    EffectsModule.forRoot([UsersEffects]),
    EffectsModule.forFeature([UsersEffects]),
  ],
  providers: [
    provideNgxMask(),
    CookieService,

    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' } // Đặt locale nếu cần
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
