import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';

import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';

import { State } from '../../state/goodTransfer-state/goodTransfer.state';
import * as productActions from '../../product-state/product.actions';
import * as productSelector from '../../product-state/product.reducer';
import { filter, map, mergeMap, take } from 'rxjs';
import { Product } from '../../model/product.model';
import * as GoodTransferActions from '../../state/goodTransfer-state/goodTransfer.actions';

import * as goodTransferSelector from '../../state/goodTransfer-state/goodTransfer.reducer';


import * as warehouseActions from '../../state/warehouse-state/warehouse.actions';
import * as warehouseSelector from '../../state/warehouse-state/warehouse.reducer';
import { Warehouse } from '../../model/warehouse.model';
import { NgForm } from '@angular/forms';
import { GoodTransfer } from '../../model/goodTransfer.model';
import { NoteStatus } from '../../model/status.enum';
import { GoodTransferDetails } from '../../model/goodTransferDetail.model';
import { Users } from '../../model/user.model';
import { CookieService } from 'ngx-cookie-service';
import { UtilitiesService } from '../../common/utilities.service'; // Đường dẫn tới service của bạn
import * as moment from 'moment';
import { DialogService } from '../../common/dialog.service';


@Component({
  selector: 'app-good-transfer-detail',
  templateUrl: './good-transfer-detail.component.html',
  styleUrls: ['./good-transfer-detail.component.scss']
})
export class GoodTransferDetailComponent {

  id: number;
  allProduct: Product[] = [];
  allWarehouse: Warehouse[] = [];
  totalItem: number = 0;
  fromWarehouse: Warehouse;
  toWarehouse: Warehouse;
  transferDateValue: moment.Moment | Date;

  currentGoodTransfer: GoodTransfer = {};
  currentUser: Users;
  isUpdate: boolean = false;
  constructor(
    private route: ActivatedRoute,
    protected store: Store<State>,
    private cookieService: CookieService,
    private dialogService: DialogService,
    private router: Router,
  ) {


    
    
    const userCookieValue = this.cookieService.get('user');
    if (userCookieValue) {
      try {
        this.currentUser = JSON.parse(userCookieValue);
      } catch (error) {
        console.error('Failed to parse cookie value', error);
      }
    } else {
      console.log('No user cookie found');
    }

    this.route.params.subscribe(params => {
      this.id = Number(params['id']);
      this.isUpdate = this.id !== 0;
      if(this.isUpdate){
        this.store.dispatch(new GoodTransferActions.GetByIdGoodTransfer(this.id));
      }
     
    });
    
    this.store.dispatch(new productActions.LoadAllProduct());
    this.store.dispatch(new warehouseActions.LoadAllWarehouse());
  }

  
  filteredFromWarehouse: Warehouse[] ;
  filteredToWarehouse: Warehouse[]  ;


  onFromWarehouseChange(selectedFromWarehouse: Warehouse) {
    this.fromWarehouse = selectedFromWarehouse;
    this.filteredToWarehouse = this.allWarehouse.filter(warehouse => warehouse.id !== selectedFromWarehouse?.id);
  }

  onToWarehouseChange(selectedToWarehouse: Warehouse) {
    this.toWarehouse = selectedToWarehouse;
    this.filteredFromWarehouse = this.allWarehouse.filter(warehouse => warehouse.id !== selectedToWarehouse?.id);
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
          this.filteredFromWarehouse = [...result];
          this.filteredToWarehouse = [...result];
          if(!this.isUpdate){
            this.currentGoodTransfer = {
              id: 0,
              transferDate: new Date(),
              fromWareHouseId: 0,
              toWareHouseId: 0,
              userId: this.currentUser?.id,
              status: NoteStatus.Process,
              listGoodTransferDetailsModel: []
            }
          }
          else{
            this.store.pipe(select(goodTransferSelector.getCurrentGoodTransfer),
                filter(result => result != null),
                map(result => result), take(1)
              ).subscribe(result => {
                this.initData(result);
              });
          }
        }))
      ), take(1)
    ).subscribe();
    
  }

  initData(result: GoodTransfer){
    this.currentGoodTransfer = UtilitiesService.cloneDeep(result);
    this.transferDateValue = this.currentGoodTransfer.transferDate;
    this.fromWarehouse = this.currentGoodTransfer.fromWareHouse;
    this.toWarehouse = this.currentGoodTransfer.toWareHouse;
    this.onFromWarehouseChange(this.fromWarehouse );
    this.onToWarehouseChange(this.toWarehouse );
    this.updateTotalItem();
  }

  submit(exportForm: NgForm) {
    if (exportForm.invalid) {
      Object.values(exportForm.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }
    const savingObject: GoodTransfer = UtilitiesService.cloneDeep(this.currentGoodTransfer)
    savingObject.fromWareHouseId = this.fromWarehouse.id;
    savingObject.toWareHouseId = this.toWarehouse.id;

    

    savingObject.transferDate = UtilitiesService.convertDateTime(UtilitiesService.convertMomentToDate(this.transferDateValue));
    if(this.isUpdate){
      this.store.dispatch(new GoodTransferActions.UpdateGoodTransfer(savingObject));
    }
    else{
      this.store.dispatch(new GoodTransferActions.AddNewGoodTransfer(savingObject));
    }
    this.store.pipe(select(goodTransferSelector.getIsLoading),
      filter(loading => loading === false),
      mergeMap(_ => 
        this.store.pipe(select(goodTransferSelector.getError),
        map(error => {
          if(error){
            this.dialogService.showAlert('Có lỗi khi tạo mới');
            // alert('Có lỗi khi tạo mới')
          }
          else{
            this.router.navigate(['/quan-ly/good-transfer']);
          }
        }))
      ), take(1)
    ).subscribe();
  }

  

  changeQuantity(event: any){
    this.updateTotalItem();
  }

  addProduct(product: Product){
    var existingItem = this.currentGoodTransfer.listGoodTransferDetailsModel.find(g => g.productId === product.id);
    if(existingItem != null){
      existingItem.quantity += 1;
    }
    else{
      var newItem: GoodTransferDetails = {
        productId: product.id,
        quantity: 1,
        product: product,
        goodTransferId: this.isUpdate ? this.id : 0,
      }
      this.currentGoodTransfer.listGoodTransferDetailsModel.push(UtilitiesService.cloneDeep(newItem));
    }
    this.updateTotalItem();
  }

  removeItem(item: GoodTransferDetails){
    this.currentGoodTransfer.listGoodTransferDetailsModel = this.currentGoodTransfer.listGoodTransferDetailsModel.filter(x => x.productId !== item.productId);
    this.updateTotalItem();
  }

  updateTotalItem(){
    this.totalItem = 0;
    this.currentGoodTransfer.listGoodTransferDetailsModel.forEach(item => {
      this.totalItem += item.quantity
    });
  }

  ngOnDestroy(){
    this.store.dispatch(new GoodTransferActions.ResetCurrentGoodTransfer());
  }
}
