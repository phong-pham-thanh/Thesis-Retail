import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import {State} from '../state/goodTransfer-state/goodTransfer.state'
import { MatDialog } from '@angular/material/dialog';
import * as goodTransferActions from '../state/goodTransfer-state/goodTransfer.actions';
import * as goodTransferSelector from '../state/goodTransfer-state/goodTransfer.reducer';
import * as wareHouseActions from '../state/warehouse-state/warehouse.actions';
import * as wareHouseSelector from '../state/warehouse-state/warehouse.reducer';
import { filter, map, mergeMap } from 'rxjs';
import { GoodTransfer } from '../model/goodTransfer.model';
import { Router } from '@angular/router';
import { GoodTransferViewComponent } from './good-transfer-view/good-transfer-view.component';
import { UtilitiesService } from '../common/utilities.service';
import { Warehouse } from '../model/warehouse.model';
import { NoteStatus } from '../model/status.enum';

@Component({
  selector: 'app-good-transfer',
  templateUrl: './good-transfer.component.html',
  styleUrls: ['./good-transfer.component.scss']
})
export class GoodTransferComponent {
  
  selectedRow: HTMLElement | null = null;
  allGoodTransfer: GoodTransfer[] = []
  fullData: GoodTransfer[] = [];
  selectedGoodTransferId: number | null = null;

  sortColumn: string = '';
  sortDirection: boolean = true;
  allWareHouse: Warehouse[] = [];
  modeltest: any;
  isDropdownOpenFromWareHouse = false;
  isDropdownOpenToWareHouse = false;
  isDropdownOpenStatus = false;
  selectedWarehousesIdFromWareHouse: number[] = [];
  selectedWarehousesIdToWareHouse: number[] = [];
  selectedIdStatus: number[] = [];
  currentPage: any;

  statusArray = [
    {id: NoteStatus.Canceled, name: 'Đã hủy', className: 'status-good-transfer error-good-transfer'},
    {id: NoteStatus.Success, name: 'Hoàn thành', className: 'status-good-transfer complete-good-transfer'},
    {id: NoteStatus.Process, name: 'Đang xử lý', className: 'status-good-transfer process-good-transfer'},
  ]

  constructor(protected store: Store<State>,
    private dialog: MatDialog,
    private router: Router
  ) {
    // this.store.dispatch(new priceProductActions.LoadAllPriceProduct());
    this.store.dispatch(new goodTransferActions.LoadAllGoodTransfer());
    this.store.dispatch(new wareHouseActions.LoadAllWarehouseByRole());
  }

  ngOnInit() {
    this.store.pipe(select(goodTransferSelector.getIsLoaded),
      filter(loaded => loaded === true),
      mergeMap(_ => 
        this.store.pipe(select(goodTransferSelector.getAllGoodTransfer),
        map(result => {
          this.allGoodTransfer = result; 
          this.fullData = UtilitiesService.cloneDeep(result); 
        }))
      )
    ).subscribe();

    
    this.store.pipe(select(wareHouseSelector.getIsLoaded),
      filter(loaded => loaded === true),
      mergeMap(_ => 
        this.store.pipe(select(wareHouseSelector.getAllWarehouseByRole),
        map(result => {
          this.allWareHouse = result; 
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

  // Hàm sắp xếp

  sortTable(column: keyof GoodTransfer | 'fromWareHouse.address' | 'toWareHouse.address' | 'user.name') {
    if (this.sortColumn === column) {
      this.sortDirection = !this.sortDirection;
    } else {
      this.sortColumn = column;
      this.sortDirection = true;
    }

    // Tạo một bản sao sâu của mảng `allGoodTransfer` và sắp xếp bản sao này
    this.allGoodTransfer = UtilitiesService.cloneDeep(this.allGoodTransfer).sort((a: GoodTransfer, b: GoodTransfer) => {
      const valueA = this.getValue(a, column);
      const valueB = this.getValue(b, column);

      if (valueA < valueB) return this.sortDirection ? -1 : 1;
      if (valueA > valueB) return this.sortDirection ? 1 : -1;
      return 0;
    });
  }


  getValue(data: any, path: string): any {
    return path.split('.').reduce((acc: any, part: string) => acc && acc[part], data);
  }

  toggleDropdownFromWareHouse() {
    this.isDropdownOpenFromWareHouse = !this.isDropdownOpenFromWareHouse;
  }

  toggleDropdownToWareHouse() {
    this.isDropdownOpenToWareHouse = !this.isDropdownOpenToWareHouse;
  }

  toggleDropdownStatus() {
    this.isDropdownOpenStatus = !this.isDropdownOpenStatus;
  }

  onCheckboxChangeFromWareHouse(warehouseId: number, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.selectedWarehousesIdFromWareHouse.push(warehouseId);
    } else {
      this.selectedWarehousesIdFromWareHouse = this.selectedWarehousesIdFromWareHouse.filter(id => id !== warehouseId);
    }
    this.filterGoodTransfer();
  }

  onCheckboxChangeToWareHouse(warehouseId: number, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.selectedWarehousesIdToWareHouse.push(warehouseId);
    } else {
      this.selectedWarehousesIdToWareHouse = this.selectedWarehousesIdToWareHouse.filter(id => id !== warehouseId);
    }
    this.filterGoodTransfer();
  }

  onCheckboxChangeStatus(statusId: number, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.selectedIdStatus.push(statusId);
    } else {
      this.selectedIdStatus = this.selectedIdStatus.filter(id => id !== statusId);
    }
    this.filterGoodTransfer();
  }

  filterGoodTransfer(){
    this.allGoodTransfer = UtilitiesService.cloneDeep(this.fullData);
    this.allGoodTransfer = this.selectedWarehousesIdFromWareHouse.length > 0 ? UtilitiesService.cloneDeep(this.allGoodTransfer.filter(x => this.selectedWarehousesIdFromWareHouse.includes(x.fromWareHouseId))): this.allGoodTransfer;
    this.allGoodTransfer = this.selectedWarehousesIdToWareHouse.length > 0 ? UtilitiesService.cloneDeep(this.allGoodTransfer.filter(x => this.selectedWarehousesIdToWareHouse.includes(x.toWareHouseId))): this.allGoodTransfer;
    this.allGoodTransfer = this.selectedIdStatus.length > 0 ? UtilitiesService.cloneDeep(this.allGoodTransfer.filter(x => this.selectedIdStatus.includes(x.status))): this.allGoodTransfer;
  }
}
