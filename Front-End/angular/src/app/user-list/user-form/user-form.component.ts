import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';  // Import MatDialogRef
import { Store, select } from '@ngrx/store';
import { State } from '../../product-state/product.state';
import * as productActions from '../../product-state/product.actions';
import * as priceProductActions from '../../price-management/price-state/price.actions';
import { filter, map, mergeMap, take } from 'rxjs';
import * as productSelector from '../../product-state/product.reducer';
import { Product } from '../../model/product.model';
import { PriceProduct } from '../../model/price.model';
import * as pricePRoductSelector from '../../price-management/price-state/price.reducer';
import { NgForm } from '@angular/forms';
import { Users } from '../../model/user.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {
  allProducts: Product[];
  isEdit: boolean = false;

  formData: Users = {
    id: -1,
  }

  formDataPrice: PriceProduct = {
    id: -1,
    productId: undefined,
    price: undefined,
    startDate: undefined,
    endDate: undefined,
    active: false
  };
  constructor(
    protected store: Store<State>,
    @Inject(MAT_DIALOG_DATA) public data: PriceProduct,
    public dialogRef: MatDialogRef<UserFormComponent>) 
  {
    this.store.dispatch(new productActions.LoadAllProduct());

    if(data && data.id > 0){
      this.formData = JSON.parse(JSON.stringify(data));
      console.log(this.formData);
      this.formDataPrice = JSON.parse(JSON.stringify(data));
      this.isEdit = true;
    }
  }


  ngOnInit() {
    this.store.pipe(select(productSelector.getIsLoaded),
      filter(loaded => loaded === true),
      mergeMap(_ => 
        this.store.pipe(select(productSelector.getAllProduct),
        map(result => {
          this.allProducts = result; 
        }))
      ), take(1)
    ).subscribe();
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSubmit(employeeForm: any) {
    if (employeeForm.invalid) {
      alert('Vui lòng điền đầy đủ thông tin bắt buộc!');
      return;
    }

    let saveData: PriceProduct = this.formDataPrice;
    saveData.startDate = saveData.startDate ? this.convertDateTime(saveData.startDate) : undefined;
    saveData.endDate = saveData.endDate ? this.convertDateTime(saveData.endDate) : undefined;

    if(this.isEdit){
      this.store.dispatch(new priceProductActions.UpdatePriceProduct(saveData));
    }
    else{
      this.store.dispatch(new priceProductActions.AddNewPriceProduct(saveData));
    }
    this.store.pipe(select(pricePRoductSelector.getIsLoading),
      filter(x => x === false),
      map(_ =>{
        this.store.dispatch(new priceProductActions.LoadAllPriceProduct())
        this.dialogRef.close();
        }
      ), take(1)).subscribe();
  }



  convertDateTime(date: Date | string): Date {
    if (date === null || date === undefined) {
      return null;
    }
    if (typeof date === 'string') {
      date = new Date(date);
    }
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      return null;
    }
  
    // Chuyển đổi ngày sang UTC bằng cách loại bỏ ảnh hưởng của múi giờ
    const convertDate = new Date(Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds()
    ));
  
    return convertDate;
  }
}
