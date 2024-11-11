import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import {State} from '../state/bill-state/bill.state'
import * as billActions from '../state/bill-state/bill.actions';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PriceProduct } from '../model/price.model';
import * as billSelector from '../state/bill-state/bill.reducer';
import { filter, map, mergeMap, take } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';  // Import MatDialog
import { Bill } from '../model/bill.model';
import { BillDetailComponent } from './bill-detail/bill-detail.component';
import { Warehouse } from '../model/warehouse.model';
import * as wareHouseActions from '../state/warehouse-state/warehouse.actions';
import * as wareHouseSelector from '../state/warehouse-state/warehouse.reducer';
import { UtilitiesService } from '../common/utilities.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import * as moment from 'moment';

@Component({
  selector: 'app-bill-list',
  templateUrl: './bill-list.component.html',
  styleUrls: ['./bill-list.component.scss'],
  
})
export class BillListComponent {

  
  // displayedColumns: string[] = ['productName', 'price', 'startDate', 'endDate', 'active', 'context'];
  displayedColumns: string[] = ['id', 'createdDate', 'cusomter', 'wareHouse', 'user', 'totalAmount', 'context'];
  dataSource = new MatTableDataSource<Bill>();
  allBill: Bill[];
  isDropDownOpenWareHouse: boolean = false;
  allWareHouse: Warehouse[] = [];
  selectedWarehousesId: number[] = []
  fullData: Bill[] = [];

  startDate: Date = null;
  endDate: Date = null;



  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(protected store: Store<State>,
    private dialog: MatDialog
  ) {
    // this.store.dispatch(new priceProductActions.LoadAllPriceProduct());
    this.store.dispatch(new billActions.LoadAllBill());
    this.store.dispatch(new wareHouseActions.LoadAllWarehouseByRole());
  }

  ngOnInit() {
    this.store.pipe(select(billSelector.getIsLoaded),
      filter(loaded => loaded === true),
      mergeMap(_ => 
        this.store.pipe(select(billSelector.getAllBill),
        map(result => {
          this.allBill = result; 
          this.fullData = result; 
          this.dataSource = new MatTableDataSource<Bill>(this.allBill);
          this.dataSource.paginator = this.paginator; 
          this.dataSource.sort = this.sort;

          this.dataSource.sortingDataAccessor = (item: Bill, property: string) => {
            switch (property) {
              case 'cusomter':
                return item.customer?.name ? item.customer.name.toLowerCase() : '';
              case 'user':
                return item.user?.name ? item.user.name.toLowerCase() : '';
              case 'wareHouse':
                return item.wareHouse?.address ? item.wareHouse.address.toLowerCase() : '';
              case 'createdDate':
                return item.createdDate ? new Date(item.createdDate).getTime() : 0;
              case 'totalAmount':
                return item.totalAmount;
              default:
                return '';
            }
          };
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


  viewDetail(item: Bill){
    const dialogRef = this.dialog.open(BillDetailComponent, {
      width: '800px',
      data: item,
    });

    dialogRef.afterClosed().subscribe(result => {
    });
    
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  toggleDropdownWareHouse() {
    this.isDropDownOpenWareHouse = !this.isDropDownOpenWareHouse;
  }

  onCheckboxChangeWareHouse(warehouseId: number, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.selectedWarehousesId.push(warehouseId);
    } else {
      this.selectedWarehousesId = this.selectedWarehousesId.filter(id => id !== warehouseId);
    }
    this.filterBill();
  }


  onDateRangeChange(event: MatDatepickerInputEvent<moment.Moment>) {
    const selectedDate: Date = event.value ? event.value.toDate() : null;
  
    if (event.targetElement?.getAttribute('matStartDate') !== null) {
      this.startDate = selectedDate;
    } else if (event.targetElement?.getAttribute('matEndDate') !== null) {
      this.endDate = selectedDate;
    }
  
    this.filterBill();
  }


  filterBill(){
    this.allBill = UtilitiesService.cloneDeep(this.fullData);
    this.allBill = this.selectedWarehousesId.length > 0 ? UtilitiesService.cloneDeep(this.allBill.filter(x => this.selectedWarehousesId.includes(x.wareHouseId))): this.allBill;
    if(this.startDate){
      this.allBill = this.allBill.filter(b => {
        const createdDate = new Date(b.createdDate);
        return UtilitiesService.isSameDay(createdDate, this.startDate)  || UtilitiesService.isAfterDay(createdDate, this.startDate)  
      });
    }
    if(this.endDate){
      this.allBill = this.allBill.filter(b => {
        const createdDate = new Date(b.createdDate);
        return UtilitiesService.isSameDay(createdDate, this.endDate)  || UtilitiesService.isBeforeDay(createdDate, this.endDate)  
      });
    }
    

    this.dataSource = new MatTableDataSource<Bill>(this.allBill);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
