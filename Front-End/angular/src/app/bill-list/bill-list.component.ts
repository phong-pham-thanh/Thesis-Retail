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
@Component({
  selector: 'app-bill-list',
  templateUrl: './bill-list.component.html',
  styleUrls: ['./bill-list.component.scss']
})
export class BillListComponent {

  
  // displayedColumns: string[] = ['productName', 'price', 'startDate', 'endDate', 'active', 'context'];
  displayedColumns: string[] = ['id', 'createdDate', 'cusomter', 'wareHouse', 'user', 'totalAmount', 'context'];
  dataSource = new MatTableDataSource<Bill>();
  allBill: Bill[];



  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(protected store: Store<State>,
    private dialog: MatDialog
  ) {
    // this.store.dispatch(new priceProductActions.LoadAllPriceProduct());
    this.store.dispatch(new billActions.LoadAllBill());
  }

  ngOnInit() {
    this.store.pipe(select(billSelector.getIsLoaded),
      filter(loaded => loaded === true),
      mergeMap(_ => 
        this.store.pipe(select(billSelector.getAllBill),
        map(result => {
          this.allBill = result; 
          this.dataSource = new MatTableDataSource<Bill>(this.allBill);
          console.log(this.allBill)
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

  // addNew() {
  //   const dialogRef = this.dialog.open(PriceManagementFormComponent, {
  //     width: '800px',
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('Dialog closed', result);
  //   });
  // }

  // deletePrice(priceProduct: PriceProduct){
  //   this.store.dispatch(new priceProductActions.DeletePriceProduct(priceProduct));
    
  //   this.store.pipe(select(pricePRoductSelector.getIsLoading),
  //     filter(x => x === false),
  //     map(_ =>
  //       this.store.dispatch(new priceProductActions.LoadAllPriceProduct())
  //     ), take(1)).subscribe();
  // }
}
