import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';  // Import MatDialogRef
import { CurrencyPipe } from '@angular/common';
import { Customer } from '../../model/customer.model';

@Component({
  selector: 'app-retail-payment-component',
  templateUrl: './retail-payment-component.component.html',
  styleUrls: ['./retail-payment-component.component.scss'],
  providers: [CurrencyPipe]
})
export class RetailPaymentComponentComponent {

  customerPay:number
  totalAmountBill: number;
  changeAmount: number = 0;
  currentDate: Date;
  currentCustomer: Customer;

  constructor(
    public dialogRef: MatDialogRef<RetailPaymentComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) 
  {
    this.currentDate = new Date();
    if(data){
      this.currentCustomer = data.currentCustomer
      this.totalAmountBill = data.totalAmountBill
    }
  }


  onClose(): void {
    this.dialogRef.close();
  }

  caculateChange(){
    this.changeAmount = this.customerPay - this.totalAmountBill;
  }

  applyQuickAmounts(){
    this.customerPay = this.totalAmountBill;
    this.changeAmount = 0;
  }

}
