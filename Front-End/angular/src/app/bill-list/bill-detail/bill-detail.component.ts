import { Component, Inject, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { State } from '../../product-state/product.state';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';  // Import MatDialogRef
import { Bill } from '../../model/bill.model';

@Component({
  selector: 'app-bill-detail',
  templateUrl: './bill-detail.component.html',
  styleUrls: ['./bill-detail.component.scss']
})
export class BillDetailComponent {

  currentBill: Bill;


  constructor(
    protected store: Store<State>,
    @Inject(MAT_DIALOG_DATA) public data: Bill,
    public dialogRef: MatDialogRef<BillDetailComponent>) 
  {

    if(data && data.id > 0){
      this.currentBill = JSON.parse(JSON.stringify(data));
      console.log(this.currentBill);
    }
  }

  closeDialog(){
    this.dialogRef.close();
  }
}
