import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import {State} from '../state/goodTransfer-state/goodTransfer.state'
import { MatDialog } from '@angular/material/dialog';
import * as goodTransferActions from '../state/goodTransfer-state/goodTransfer.actions';
import * as goodTransferSelector from '../state/goodTransfer-state/goodTransfer.reducer';
import { filter, map, mergeMap } from 'rxjs';
import { GoodTransfer } from '../model/goodTransfer.model';
import { Router } from '@angular/router';
import { GoodTransferViewComponent } from './good-transfer-view/good-transfer-view.component';

@Component({
  selector: 'app-good-transfer',
  templateUrl: './good-transfer.component.html',
  styleUrls: ['./good-transfer.component.scss']
})
export class GoodTransferComponent {
  
  selectedRow: HTMLElement | null = null;
  allGoodTransfer: GoodTransfer[] = []
  selectedGoodTransferId: number | null = null;

  constructor(protected store: Store<State>,
    private dialog: MatDialog,
    private router: Router
  ) {
    // this.store.dispatch(new priceProductActions.LoadAllPriceProduct());
    this.store.dispatch(new goodTransferActions.LoadAllGoodTransfer());
  }

  ngOnInit() {
    this.store.pipe(select(goodTransferSelector.getIsLoaded),
      filter(loaded => loaded === true),
      mergeMap(_ => 
        this.store.pipe(select(goodTransferSelector.getAllGoodTransfer),
        map(result => {
          this.allGoodTransfer = result; 
        }))
      )
    ).subscribe();
  }


  addNew(){
    this.router.navigate([`/quan-ly/good-transfer/edit`, 0]);
  }

  edit(goodTransfer: GoodTransfer){
    this.router.navigate([`/quan-ly/good-transfer/edit`, goodTransfer.id]);
  }

  selectRow(event: Event, goodTransfer: GoodTransfer) {
    const clickedRow = event.currentTarget as HTMLElement;

    if (this.selectedRow) {
      this.selectedRow.classList.remove('selected-good-transfer');
    }

    clickedRow.classList.add('selected-good-transfer');
    this.selectedRow = clickedRow;

    this.selectedGoodTransferId = goodTransfer.id; // Lưu ID của dòng được chọn
  }

  viewDetail(item: GoodTransfer){
    const dialogRef = this.dialog.open(GoodTransferViewComponent, {
      width: '800px',
      data: item,
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        if(result.isSuccess){
          this.store.dispatch(new goodTransferActions.LoadAllGoodTransfer());
          
          this.store.pipe(select(goodTransferSelector.getIsLoaded),
            filter(loaded => loaded === true),
            mergeMap(_ => 
              this.store.pipe(select(goodTransferSelector.getAllGoodTransfer),
              map(result => {
                this.allGoodTransfer = result; 
              }))
            )
          ).subscribe();
        }
        else{
          alert(result.message);
        }
      }
    });
  }
}
