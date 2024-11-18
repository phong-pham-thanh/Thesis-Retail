import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';  // Import MatDialogRef
import { Store, select } from '@ngrx/store';
import { State } from '../../state/users-state/users.state';
import * as warehouseActions from '../../state/warehouse-state/warehouse.actions';
import * as userActions from '../../state/users-state/users.actions';
import { filter, map, mergeMap, take } from 'rxjs';
import * as wareHouseSelector from '../../state/warehouse-state/warehouse.reducer';
import { PriceProduct } from '../../model/price.model';
import * as userSelector from '../../state/users-state/users.reducer';
import { NgForm } from '@angular/forms';
import { Users } from '../../model/user.model';
import { Warehouse } from '../../model/warehouse.model';
import { UtilitiesService } from '../../common/utilities.service';
import { UserWareHouse } from '../../model/userWareHouse.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {
  allWareHouses: Warehouse[];
  defaultWareHouseCanHave: Warehouse[];
  currentDefaultWareHouseId: number[] = [];
  isEdit: boolean = false;
  currentWareHouseId: number[] = [];
  formData: Users = {
    id: -1,
  }
  constructor(
    protected store: Store<State>,
    @Inject(MAT_DIALOG_DATA) public data: PriceProduct,
    public dialogRef: MatDialogRef<UserFormComponent>) 
  {
    this.store.dispatch(new warehouseActions.LoadAllWarehouse());

    if(data && data.id > 0){
      this.formData = JSON.parse(JSON.stringify(data));
      this.isEdit = true;
    }
  }


  ngOnInit() {
    this.currentWareHouseId = this.formData.listUserWareHouse?.map(x => x.wareHouseId);


    this.store.pipe(select(wareHouseSelector.getIsLoaded),
      filter(loaded => loaded === true),
      mergeMap(_ => 
        this.store.pipe(select(wareHouseSelector.getAllWarehouse),
        map(result => {
          this.allWareHouses = result;
          this.onWarehouseBelongChange();
        }))
      ), take(1)
    ).subscribe();
  }

  normalizeData(saveData: Users){
    saveData.dateOfBirth = saveData.dateOfBirth ? UtilitiesService.convertDateTime(saveData.dateOfBirth) : undefined;
    saveData.dateOnboard = saveData.dateOnboard ? UtilitiesService.convertDateTime(saveData.dateOnboard) : undefined;

    saveData.listUserWareHouse = [];
    if(this.currentWareHouseId.length > 0){
      saveData.listUserWareHouse = this.currentWareHouseId.map(x => {
        return {
          userId: saveData.id,
          wareHouseId: x,
        }
      })
    }

  }

  onWarehouseBelongChange(){
    this.defaultWareHouseCanHave = this.allWareHouses.filter(x => this.currentWareHouseId?.find(id => id === x.id) != null);
    if(this.formData && !UtilitiesService.isNullOrEmpty(this.formData.defaultWareHouseId) ){
      if(this.defaultWareHouseCanHave.length == 0 || !this.defaultWareHouseCanHave.map(x => x.id).includes(this.formData.defaultWareHouseId)){
        this.formData.defaultWareHouseId = null;
      }
    }
  }

  onSubmit(employeeForm: any) {
    if (employeeForm.invalid) {
      UtilitiesService.showAlert('Vui lòng điền đầy đủ thông tin bắt buộc!');
      // alert('Vui lòng điền đầy đủ thông tin bắt buộc!');
      return;
    }

    let saveData: Users = UtilitiesService.cloneDeep(this.formData);
    this.normalizeData(saveData);
    if(this.isEdit){
      this.store.dispatch(new userActions.UpdateUsers(saveData));
    }
    else{
      this.store.dispatch(new userActions.AddNewUsers(saveData));
    }
    this.store.pipe(select(userSelector.getIsLoading),
      filter(x => x === false),
      mergeMap(_ =>
        this.store.pipe(select(userSelector.getError), 
          take(1),
          map(error => {
            if(error === ''){
              this.dialogRef.close(true);
              this.store.dispatch(new userActions.LoadAllUsers());
              this.dialogRef.close();
            }
            else{
              UtilitiesService.showAlert(error.error.detail);
              // alert(error.error.detail);
            }
          }))
        
      ), take(1)).subscribe();
  }

  
  onClose(): void {
    this.dialogRef.close();
  }
  
}
