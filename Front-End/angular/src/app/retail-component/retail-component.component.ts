import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product.model';
import { assetUrl } from "../../single-spa/asset-url";
import { BillDetails } from '../model/billDetail.model';
import { Bill } from '../model/bill.model';
import { Store, select } from '@ngrx/store';
import { State } from '../product-state/product.state';
import * as productActions from '../product-state/product.actions';
import * as productSelector from '../product-state/product.reducer';
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
  allCustomer: Customer[] = [];
  allPriceProduct: PriceProduct[] = []
  currentBill: Bill;
  currentPage: any;
  currentCustomer: Customer;
  totalAmountBill: number = 0;

  constructor(protected store: Store<State>, 
    private currencyPipe: CurrencyPipe,
    private dialog: MatDialog,
    private cookieService: CookieService
  ) {
    this.store.dispatch(new productActions.LoadAllProduct());
    this.store.dispatch(new customerActions.LoadAllCustomer());
    this.store.dispatch(new priceProductActions.LoadAllPriceProduct());
  }


  ngOnInit(): void {

    this.store.pipe(select(productSelector.getIsLoaded),
      filter(loaded => loaded === true),
      mergeMap(_ => 
        this.store.pipe(select(productSelector.getAllProduct),
        map(result => {
          this.allProduct = result; 
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

    this.currentBill = {
      id: -1,
      createdDate: new Date(),
      customerId: -1,
      billDetails: [],
    }

  }

  addProductToBill(item: Product){
    
    if(this.currentBill && this.currentBill.billDetails && this.currentBill.billDetails.find(de => de.product.id === item.id) != null){
      let currentProductDetail: BillDetails = this.currentBill.billDetails.find(de => de.product.id === item.id)
      currentProductDetail.quantity += 1;
    }
    else{
      let itemPrice: number = null;
      if(item.listPrices && item.listPrices.length > 0){
        itemPrice = item.listPrices[0].price;
      }
  
      const newBillDetail: BillDetails = {
        product: item,
        quantity: 1,
        billId: -1,
        price: itemPrice,
        haveDefaultPrice: itemPrice !== null
      }
      this.currentBill.billDetails.push(newBillDetail);
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
    this.currentBill.billDetails = this.currentBill.billDetails.filter(bi => bi.product?.id !== item.product?.id);
  }

  getPriceProduct(product: Product){
    if(!product.listPrices || product.listPrices.length == 0){
      return "Chưa có giá";
    }
    return this.currencyPipe.transform(product.listPrices[0].price, 'VND', 'symbol', '1.0-0');
  }

  getTotalAmount(){
    this.totalAmountBill = 0;
    if(!this.currentBill || this.currentBill.billDetails.length == 0) return;
    this.currentBill.billDetails.forEach(item => {
      if(item.price){
        this.totalAmountBill += (item.price * item.quantity)
      }
    })
  }

  onPriceChange(item: any){
    this.getTotalAmount();
  }

  openPaymentDialog() {
    // if(!this.currentBill || !this.currentBill.billDetails ||  this.currentBill.billDetails.length === 0 ){
    //   alert("Hãy thêm sản phẩm vào giỏ hàng")
    //   return;
    // }
    const dialogRef = this.dialog.open(RetailPaymentComponentComponent, {
      data: {
        currentCustomer: this.currentCustomer,
        totalAmountBill: this.totalAmountBill,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed', result);
    });
  }

}