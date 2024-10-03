import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';  // Import MatDialogRef
import { CurrencyPipe } from '@angular/common';
import { Customer } from '../../model/customer.model';
import { Bill } from '../../model/bill.model';
import { Store, select } from '@ngrx/store';
import { State } from '../../state/bill-state/bill.state';
import * as billAction from '../../state/bill-state/bill.actions';
import * as billSelector from '../../state/bill-state/bill.reducer';
import { Users } from '../../model/user.model';
import { CookieService } from 'ngx-cookie-service';
import { filter, map, mergeMap, take } from 'rxjs';

@Component({
  selector: 'app-retail-payment-component',
  templateUrl: './retail-payment-component.component.html',
  styleUrls: ['./retail-payment-component.component.scss'],
  providers: [CurrencyPipe]
})
export class RetailPaymentComponentComponent {

  customerPay:number
  totalAmountBill: number;
  currentBill: Bill;
  changeAmount: number = 0;
  currentDate: Date;
  currentCustomer: Customer;
  currentUser: Users;

  constructor(
    public dialogRef: MatDialogRef<RetailPaymentComponentComponent>,
    protected store: Store<State>,
    private cookieService: CookieService,
    @Inject(MAT_DIALOG_DATA) public data: any) 
  {
    this.currentDate = new Date();
    if(data){
      this.currentCustomer = data.currentCustomer;
      this.totalAmountBill = data.totalAmountBill;
      this.currentBill = data.currentBill
    }
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

  onPaying(){
    
    let savingObject: Bill = {...this.currentBill};

    if(this.currentCustomer){
      savingObject.customerId = this.currentCustomer.id;
    }
    savingObject.userId = this.currentUser.id;
    this.store.dispatch(new billAction.AddNewBill(savingObject));

    this.store.pipe(select(billSelector.getIsLoading),
      filter(x => x === false),
      mergeMap(_ => 
          this.store.pipe(select(billSelector.getError), 
          take(1),
          map(error => {
            if(error === ''){
              this.dialogRef.close();
            }
            else{
              alert(error);
            }
          }))
        
      ), take(1)).subscribe();
  }
}
