import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';  // Import MatDialogRef
import { Store, select } from '@ngrx/store';
import { State } from '../../product-state/product.state';
import * as productActions from '../../product-state/product.actions';
import * as priceProductActions from '../price-state/price.actions';
import { filter, map, mergeMap, take } from 'rxjs';
import * as productSelector from '../../product-state/product.reducer';
import { Product } from '../../model/product.model';
import { PriceProduct } from '../../model/price.model';
import * as pricePRoductSelector from '../price-state/price.reducer';

@Component({
  selector: 'app-price-management-form',
  templateUrl: './price-management-form.component.html',
  styleUrls: ['./price-management-form.component.scss']
})

export class PriceManagementFormComponent  implements OnInit{
  allProducts: Product[];
  isEdit: boolean = false;
  formData: PriceProduct = {
    id: -1,
    productId: undefined,
    price: undefined,
    startDate: undefined,
    endDate: undefined,
    active: false
  };
  constructor(
    protected store: Store<State>,
    @Inject(MAT_DIALOG_DATA) public data: PriceProduct,  // Inject dữ liệu vào
    public dialogRef: MatDialogRef<PriceManagementFormComponent>) 
  {
    this.store.dispatch(new productActions.LoadAllProduct());

    if(data && data.id > 0){
      // this.formData = data;
      this.formData = JSON.parse(JSON.stringify(data));
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

  onSubmit(priceForm: any) {
    if (priceForm.invalid) {
      alert('Vui lòng điền đầy đủ thông tin bắt buộc!');
      return;
    }
    if(this.isEdit){
      this.store.dispatch(new priceProductActions.UpdatePriceProduct(this.formData));
    }
    else{
      this.store.dispatch(new priceProductActions.AddNewPriceProduct(this.formData));
    }
    this.store.pipe(select(pricePRoductSelector.getIsLoading),
      filter(x => x === false),
      map(_ =>
        this.store.dispatch(new priceProductActions.LoadAllPriceProduct())
      ), take(1)).subscribe();
    this.dialogRef.close();
  }
}
