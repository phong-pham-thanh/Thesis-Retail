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
  transferDateValue: any;

  currentGoodTransfer: GoodTransfer = {};
  currentUser: Users;

  constructor(
    private route: ActivatedRoute,
    protected store: Store<State>,
    private cookieService: CookieService,
    private router: Router,
  ) {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    
    this.store.dispatch(new productActions.LoadAllProduct());
    this.store.dispatch(new warehouseActions.LoadAllWarehouse());
    
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
  }

  
  filteredFromWarehouse: Warehouse[] ;
  filteredToWarehouse: Warehouse[]  ;


  onFromWarehouseChange(selectedFromWarehouse: any) {
    this.fromWarehouse = selectedFromWarehouse;
    this.filteredToWarehouse = this.allWarehouse.filter(warehouse => warehouse.id !== selectedFromWarehouse?.id);
  }

  onToWarehouseChange(selectedToWarehouse: any) {
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
        }))
      ), take(1)
    ).subscribe();

    this.currentGoodTransfer = {
      id: 0,
      transferDate: new Date(),
      fromWareHouseId: 0,
      toWareHouseId: 0,
      userId: this.currentUser.id,
      status: NoteStatus.Process,
      listGoodTransferDetailsModel: []
    }
    
  }

  submit(exportForm: NgForm) {
    if (exportForm.invalid) {
      Object.values(exportForm.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }
    this.currentGoodTransfer.fromWareHouseId = this.fromWarehouse.id;
    this.currentGoodTransfer.toWareHouseId = this.toWarehouse.id;
    const savingObject: GoodTransfer = {...this.currentGoodTransfer}
    this.store.dispatch(new GoodTransferActions.AddNewGoodTransfer(savingObject));

    this.store.pipe(select(goodTransferSelector.getIsLoading),
      filter(loading => loading === false),
      mergeMap(_ => 
        this.store.pipe(select(goodTransferSelector.getError),
        map(error => {
          if(error){
            alert('Có lỗi khi tạo mới')
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
      }
      this.currentGoodTransfer.listGoodTransferDetailsModel.push({...newItem});
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
}
