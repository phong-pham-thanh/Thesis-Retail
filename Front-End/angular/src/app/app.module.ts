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
import * as moment from 'moment';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BaseChartDirective } from 'ng2-charts';
import 'chartjs-adapter-date-fns'; // Import this at the top of your component
import {MatTabsModule} from '@angular/material/tabs';


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

import { InventoryEffects } from './state/inventory-state/inventory.effects';
import { inventoryReducer } from './state/inventory-state/inventory.reducer';

import { PriceManagementFormComponent } from './price-management/price-management-form/price-management-form.component';
import { RetailPaymentComponentComponent } from './retail-component/retail-payment-component/retail-payment-component.component';
import { BillListComponent } from './bill-list/bill-list.component';
import { BillDetailComponent } from './bill-list/bill-detail/bill-detail.component';
import { GoodTransferComponent } from './good-transfer/good-transfer.component';
import { GoodTransferDetailComponent } from './good-transfer/good-transfer-detail/good-transfer-detail.component';
import { GoodTransferViewComponent } from './good-transfer/good-transfer-view/good-transfer-view.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-list/user-form/user-form.component';
import { EmptyComponentComponent } from './empty-component/empty-component.component';
import { AnalyseComponent } from './analyse/analyse.component';
import { AnalyseReceiptGoodComponent } from './analyse/analyse-receipt-good/analyse-receipt-good.component';
import { AnalyseExportGoodComponent } from './analyse/analyse-export-good/analyse-export-good.component';
import { AnalyseBillByMonthComponent } from './analyse/analyse-bill-by-month/analyse-bill-by-month.component';
import { AnalysePriceProductComponent } from './analyse/analyse-price-product/analyse-price-product.component';
import { ConfirmDialogComponent } from './common/confirm-dialog/confirm-dialog.component';

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

export function CustomPaginatorIntl() {
  const paginatorIntl = new MatPaginatorIntl();

  paginatorIntl.itemsPerPageLabel = 'Số mục mỗi trang';
  paginatorIntl.nextPageLabel = 'Trang kế tiếp';
  paginatorIntl.previousPageLabel = 'Trang trước';
  paginatorIntl.firstPageLabel = 'Trang đầu';
  paginatorIntl.lastPageLabel = 'Trang cuối';

  return paginatorIntl;
}

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
    UserFormComponent,
    EmptyComponentComponent,
    AnalyseComponent,
    AnalyseReceiptGoodComponent,
    AnalyseExportGoodComponent,
    AnalyseBillByMonthComponent,
    AnalysePriceProductComponent,
    ConfirmDialogComponent,
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
    MatSnackBarModule,
    MatIconModule,
    NgxPaginationModule,
    NgxMaskDirective,
    BrowserAnimationsModule,
    NgbModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
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
    
    StoreModule.forFeature('inventory', inventoryReducer),
    StoreModule.forRoot(inventoryReducer),
    EffectsModule.forRoot([InventoryEffects]),
    EffectsModule.forFeature([InventoryEffects]),

    BaseChartDirective,

  ],
  providers: [
    provideNgxMask(),
    CookieService,
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: MatPaginatorIntl, useFactory: CustomPaginatorIntl }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
