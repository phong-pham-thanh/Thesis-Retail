import { Component, HostListener, OnInit } from '@angular/core';
import { Product } from '../model/product.model';
import { assetUrl } from "../../single-spa/asset-url";
import { BillDetails } from '../model/billDetail.model';
import { Bill } from '../model/bill.model';
import { Store, select } from '@ngrx/store';
import { State } from '../product-state/product.state';
import { UsersState } from '../state/users-state/users.state';
import * as productActions from '../product-state/product.actions';
import * as productSelector from '../product-state/product.reducer';
import * as userAction from '../state/users-state/users.actions';
import * as userSelector from '../state/users-state/users.reducer';
import * as warehouseActions from '../state/warehouse-state/warehouse.actions';
import * as warehouseSelector from '../state/warehouse-state/warehouse.reducer';
import * as customerActions from '../customer-state/customer.actions';
import * as customerSelector from '../customer-state/customer.reducer';
import * as inventoryActions from '../state/inventory-state/inventory.actions';
import * as inventorySelector from '../state/inventory-state/inventory.reducer';
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
import { DialogService } from '../common/dialog.service';
import { BillService } from '../services/bill.service';
import * as billSelector from '../state/bill-state/bill.reducer';
import { Inventory } from '../model/inventory.model';
import { BarcodeScannerService } from '../services/barcode-scanner.service';


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
  fullProductData: Product[] = [];
  allWarehouse: Warehouse[] = [];
  allCustomer: Customer[] = [];
  allPriceProduct: PriceProduct[] = []
  currentBill: Bill;
  currentPage: any;
  currentCustomer: Customer;
  currentWarehouse: Warehouse;
  totalAmountBill: number = 0;
  currentUser: Users;
  productSearchKeyName: string = null;
  allInventory: Inventory[] = [];

  constructor(protected store: Store<State>,
    protected userStore: Store<State>,
    private currencyPipe: CurrencyPipe,
    private dialog: MatDialog,
    private dialogService: DialogService,
    private billService: BillService,
    private cookieService: CookieService,
    private barcodeScannerService: BarcodeScannerService,
  ) {
    this.store.dispatch(new productActions.LoadAllProduct());
    this.store.dispatch(new warehouseActions.LoadAllWarehouseByRole());
    this.store.dispatch(new customerActions.LoadAllCustomer());
    this.store.dispatch(new priceProductActions.LoadAllPriceProduct());
    this.store.dispatch(new inventoryActions.LoadAllInventory());


    const userCookieValue = this.cookieService.get('user');
    if (userCookieValue) {
      try {
        this.currentUser = JSON.parse(userCookieValue);
        this.userStore.dispatch(new userAction.LoadCurrentuser(this.currentUser.id));
      } catch (error) {
        console.error('Failed to parse cookie value', error);
      }
    } else {
      console.log('No user cookie found');
    }
  }


  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.barcodeScannerService.handleKeyPress(event, (barcode) => {
      const selectProduct = this.allProduct.find(p => p.barcode == barcode);
      if(UtilitiesService.isNullOrEmpty(selectProduct)){
        this.dialogService.showAlert("Hiện không có sản phẩm này");
        return;
      }
      this.addProductToBill(selectProduct);
    });
  }

  ngOnInit(): void {

    this.store.pipe(select(productSelector.getIsLoaded),
      filter(loaded => loaded === true),
      mergeMap(_ =>
        this.store.pipe(select(productSelector.getAllProduct),
          mergeMap(allPro => 
            this.store.pipe(select(inventorySelector.getIsLoaded),
              filter(invenLoaded => invenLoaded === true),
              mergeMap(_ =>
                this.store.pipe(select(inventorySelector.getAllInventory),
                map(allInven => {
                  let result: Product[] = UtilitiesService.cloneDeep(allPro);
                  this.allProduct = result.filter(pro => pro.currentPrice).map(item => {
                    item.inventory = 0;
                    return item;
                  });
                  this.fullProductData = UtilitiesService.cloneDeep(this.allProduct);
                  this.allInventory = UtilitiesService.cloneDeep(allInven);

                  this.store.pipe(select(warehouseSelector.getIsLoaded),
                    filter(loaded => loaded === true),
                    mergeMap(_ =>
                      this.store.pipe(select(warehouseSelector.getAllWarehouseByRole),
                        map(result => {
                          this.allWarehouse = result;
                          if (result && result.length > 0) {
                            this.userStore.pipe(select(userSelector.getIsLoaded),
                              // filter(loaded => loaded === true),
                              mergeMap(_ =>
                                this.userStore.pipe(select(userSelector.getCurrentUser),
                                  map(currentU => {
                                    this.currentUser = currentU;
                                    if (!UtilitiesService.isNullOrEmpty(this.currentUser?.defaultWareHouseId)) {
                                      this.currentWarehouse = result.find(w => w.id === this.currentUser.defaultWareHouseId)
                                    } else {
                                      this.currentWarehouse = result[0];
                                    }
                                    this.assignInventoryToProduct();
                                  }))
                              ), take(1)).subscribe();
                          }
                        }))
                    ), take(1)
                  ).subscribe();

                }))
              )
            )
          ))
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

  initComponent() {
    this.currentBill = {
      createdDate: new Date(),
      listBillDetails: [],
    }
    this.totalAmountBill = 0;
  }


  assignInventoryToProduct(){
    this.allProduct.forEach(item => item.inventory = 0);
    this.allInventory.filter(a => a.wareHouseId === this.currentWarehouse.id).forEach(inven => {
      let existingPro = this.allProduct.find(p => p.id === inven.productId);
      if(!UtilitiesService.isNullOrEmpty(existingPro)){
        existingPro.inventory = inven.quantity;
      }
    })
  }

  currentWarehouseChange(){
    this.assignInventoryToProduct();
  }

  addProductToBill(item: Product) {

    if (this.currentBill && this.currentBill.listBillDetails && this.currentBill.listBillDetails.find(de => de.product.id === item.id) != null) {
      let currentProductDetail: BillDetails = this.currentBill.listBillDetails.find(de => de.product.id === item.id)
      currentProductDetail.quantity += 1;
    }
    else {
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

  changeQuantity(item: BillDetails, isPlus: boolean) {
    if (!this.currentBill) return;
    if (isPlus) {
      item.quantity += 1;
    }
    else if (!isPlus && item.quantity > 1) {
      item.quantity -= 1;
    }
    this.getTotalAmount();

  }

  onSearchProductChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const keySearch = inputElement.value;
    this.allProduct = UtilitiesService.cloneDeep(this.fullProductData);
    if (!UtilitiesService.isNullOrEmpty(keySearch) && keySearch !== '') {
      this.allProduct = this.allProduct.filter(product =>
        UtilitiesService.removeDiacritics(product.name).includes(UtilitiesService.removeDiacritics(keySearch))
      );
      return;
    }
    this.allProduct = UtilitiesService.cloneDeep(this.fullProductData);
  }

  removeItem(item: BillDetails) {
    this.currentBill.listBillDetails = this.currentBill.listBillDetails.filter(bi => bi.product?.id !== item.product?.id);
    this.getTotalAmount();
  }

  getPriceProduct(product: Product) {
    if (!product.listPrices || product.listPrices.length == 0) {
      return "Chưa có giá";
    }
    return this.currencyPipe.transform(product.listPrices[0].price, 'VND', 'symbol', '1.0-0');
  }

  getTotalAmount() {
    this.totalAmountBill = 0;
    if (!this.currentBill || this.currentBill.listBillDetails.length == 0) return;
    this.currentBill.listBillDetails.forEach(item => {
      if (item.priceUnit) {
        this.totalAmountBill += (item.priceUnit * item.quantity)
      }
    })
  }

  onPriceChange(item: any) {
    this.getTotalAmount();
  }

  openPaymentDialog() {
    if(!this.currentBill || !this.currentBill.listBillDetails ||  this.currentBill.listBillDetails.length === 0 ){
      this.dialogService.showAlert("Hãy thêm sản phẩm vào giỏ hàng");
      return;
    }

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
      if (result) {
        this.dialogService.openConfirmDialog(`Giao dịch hoàn tất, bạn có muốn tải hóa đơn ?`).subscribe(result => {
          if (result) {
            this.store.pipe(select(billSelector.getCurrentBill),
              map(currentBill => {
                this.billService.downloadFile(currentBill.id).subscribe(
                  (response: Blob) => {
                    const fileName = `hoa_don_${currentBill.id}`;
                    const blob = new Blob([response], {
                      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                    });
                    const link = document.createElement('a');
                    link.href = window.URL.createObjectURL(blob);
                    link.download = fileName;
                    link.click();
                  },
                  (error) => {
                    alert("Tải hóa đơn bị lỗi");
                    console.error('File download error:', error);
                  }
                );
              })).subscribe()
          }
          this.initComponent()
        });
      }
    });
  }

}