import { Component, Inject } from '@angular/core';
import { GoodTransfer } from '../../model/goodTransfer.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';
import {State} from '../../state/goodTransfer-state/goodTransfer.state'

import * as goodTransferActions from '../../state/goodTransfer-state/goodTransfer.actions';
import * as goodTransferSelector from '../../state/goodTransfer-state/goodTransfer.reducer';
import { filter, map, mergeMap, take } from 'rxjs';
import { Router } from '@angular/router';
import { UtilitiesService } from '../../common/utilities.service';
@Component({
  selector: 'app-good-transfer-view',
  templateUrl: './good-transfer-view.component.html',
  styleUrls: ['./good-transfer-view.component.scss']
})
export class GoodTransferViewComponent {

  currentGoodTransfer: GoodTransfer;

  constructor(
    protected store: Store<State>,
    @Inject(MAT_DIALOG_DATA) public data: GoodTransfer,
    public dialogRef: MatDialogRef<GoodTransferViewComponent>,
    private router: Router,
  ) 
  {

    if(data && data.id > 0){
      this.currentGoodTransfer = JSON.parse(JSON.stringify(data));
    }
  }

  closeDialog(){
    this.dialogRef.close();
  }
  accept(){
    this.store.dispatch(new goodTransferActions.AcceptGoodTransfer(this.currentGoodTransfer.id));
    this.store.pipe(select(goodTransferSelector.getIsLoading),
      filter(loading => loading === false),
      mergeMap(_ => 
        this.store.pipe(select(goodTransferSelector.getError),
        map(error => {
          if(error){
            this.dialogRef.close({
              isSuccess: false,
              message: UtilitiesService.isNullOrEmpty(error.error.detail) ? error.error.detail : "Có lỗi khi duyệt phiếu"
            });
          }
          else{
            this.dialogRef.close({
              isSuccess: true,
              message: null
            });
          }
        }))
      ), take(1)
    ).subscribe();
  }

  cancel(){
    this.store.dispatch(new goodTransferActions.CancelGoodTransfer(this.currentGoodTransfer.id));
    this.store.pipe(select(goodTransferSelector.getIsLoading),
      filter(loading => loading === false),
      mergeMap(_ => 
        this.store.pipe(select(goodTransferSelector.getError),
        map(error => {
          if(error){
            this.dialogRef.close({
              isSuccess: false,
              message: error.error.detail
            });
          }
          else{
            this.dialogRef.close({
              isSuccess: true,
              message: null
            });
          }
        }))
      ), take(1)
    ).subscribe();
  }
}
