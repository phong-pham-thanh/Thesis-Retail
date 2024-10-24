import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product.model';
import { assetUrl } from "../../single-spa/asset-url";
import { BillDetails } from '../model/billDetail.model';
import { Bill } from '../model/bill.model';
import { Store, select } from '@ngrx/store';
import { State } from '../product-state/product.state';
import * as productActions from '../product-state/product.actions';
import * as productSelector from '../product-state/product.reducer';
import * as warehouseActions from '../state/warehouse-state/warehouse.actions';
import * as warehouseSelector from '../state/warehouse-state/warehouse.reducer';
import * as customerActions from '../customer-state/customer.actions';
import * as customerSelector from '../customer-state/customer.reducer';
import * as priceProductActions from '../price-management/price-state/price.actions';
import { PriceProduct } from '../model/price.model';
import * as pricePRoductSelector from '../price-management/price-state/price.reducer';
import { filter, map, mergeMap, take } from 'rxjs';
import { Customer } from '../model/customer.model';
import { CurrencyPipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { RetailPaymentComponentComponent } from './retail-payment-component/retail-payment-component.component'; 
import { CookieService } from 'ngx-cookie-service';
import { Users } from '../model/user.model';
import { Warehouse } from '../model/warehouse.model';
import { UtilitiesService } from '../common/utilities.service';


const imageUrl = assetUrl("images/Cocacola.png");

@Component({
  selector: 'app-retail-component',
  templateUrl: './retail-component.component.html',
  styleUrls: ['./retail-component.component.scss'],
  providers: [CurrencyPipe]
})


export class RetailComponentComponent implements OnInit {

  imageUrl = imageUrl;
  allProduct: Product[] = [];
  allWarehouse: Warehouse[] = [];
  allCustomer: Customer[] = [];
  allPriceProduct: PriceProduct[] = []
  currentBill: Bill;
  currentPage: any;
  currentCustomer: Customer;
  currentWarehouse: Warehouse;
  totalAmountBill: number = 0;

  constructor(protected store: Store<State>, 
    private currencyPipe: CurrencyPipe,
    private dialog: MatDialog,
    private cookieService: CookieService
  ) {
    this.store.dispatch(new productActions.LoadAllProduct());
    this.store.dispatch(new warehouseActions.LoadAllWarehouse());
    this.store.dispatch(new customerActions.LoadAllCustomer());
    this.store.dispatch(new priceProductActions.LoadAllPriceProduct());
  }


  ngOnInit(): void {

    this.store.pipe(select(productSelector.getIsLoaded),
      filter(loaded => loaded === true),
      mergeMap(_ => 
        this.store.pipe(select(productSelector.getAllProduct),
        map(result => {
          this.allProduct = result.filter(pro => pro.currentPrice); 
        }))
      ), take(1)
    ).subscribe();

    this.store.pipe(select(warehouseSelector.getIsLoaded),
      filter(loaded => loaded === true),
      mergeMap(_ => 
        this.store.pipe(select(warehouseSelector.getAllWarehouse),
        map(result => {
          this.allWarehouse = result;
          if(result && result.length > 0){
            this.currentWarehouse = result[0];
          }
        }))
      ), take(1)
    ).subscribe();

    this.store.pipe(select(customerSelector.getIsLoaded),
      filter(loaded => loaded === true),
      mergeMap(_ => 
        this.store.pipe(select(customerSelector.getAllCustomer),
        map(result => {
          this.allCustomer = result; 
        }))
      ), take(1)
    ).subscribe();

    this.store.pipe(select(pricePRoductSelector.getIsLoaded),
      filter(loaded => loaded === true),
      mergeMap(_ => 
        this.store.pipe(select(pricePRoductSelector.getAllPriceProduct),
        map(result => {
          this.allPriceProduct = result; 
        }))
      )
    ).subscribe();

    this.initComponent();

  }

  initComponent(){
    this.currentBill = {
      createdDate: new Date(),
      listBillDetails: [],
    }
    this.totalAmountBill = 0;
  }


  addProductToBill(item: Product){
    
    if(this.currentBill && this.currentBill.listBillDetails && this.currentBill.listBillDetails.find(de => de.product.id === item.id) != null){
      let currentProductDetail: BillDetails = this.currentBill.listBillDetails.find(de => de.product.id === item.id)
      currentProductDetail.quantity += 1;
    }
    else{
      const newBillDetail: BillDetails = {
        productId: item.id,
        product: item,
        quantity: 1,
        billId: -1,
        priceUnit: item.currentPrice,
      }
      this.currentBill.listBillDetails = [...this.currentBill.listBillDetails, UtilitiesService.cloneDeep(newBillDetail)];
    }
    this.getTotalAmount();
  }
  
  changeQuantity(item: BillDetails, isPlus: boolean){
    if(!this.currentBill) return;
    if(isPlus){
      item.quantity += 1;
    }
    else if(!isPlus && item.quantity > 1){
      item.quantity -= 1;
    }
    this.getTotalAmount();

  }

  removeItem(item: BillDetails){
    this.currentBill.listBillDetails = this.currentBill.listBillDetails.filter(bi => bi.product?.id !== item.product?.id);
    this.getTotalAmount();
  }

  getPriceProduct(product: Product){
    if(!product.listPrices || product.listPrices.length == 0){
      return "Chưa có giá";
    }
    return this.currencyPipe.transform(product.listPrices[0].price, 'VND', 'symbol', '1.0-0');
  }

  getTotalAmount(){
    this.totalAmountBill = 0;
    if(!this.currentBill || this.currentBill.listBillDetails.length == 0) return;
    this.currentBill.listBillDetails.forEach(item => {
      if(item.priceUnit){
        this.totalAmountBill += (item.priceUnit * item.quantity)
      }
    })
  }

  onPriceChange(item: any){
    this.getTotalAmount();
  }

  openPaymentDialog() {
    // if(!this.currentBill || !this.currentBill.listBillDetails ||  this.currentBill.listBillDetails.length === 0 ){
    //   alert("Hãy thêm sản phẩm vào giỏ hàng")
    //   return;
    // }

    this.currentBill.wareHouseId = this.currentWarehouse.id;
    this.currentBill.totalAmount = this.totalAmountBill;


    const dialogRef = this.dialog.open(RetailPaymentComponentComponent, {
      data: {
        currentCustomer: this.currentCustomer,
        totalAmountBill: this.totalAmountBill,
        currentBill: this.currentBill,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.initComponent()
      }
    });
  }

}