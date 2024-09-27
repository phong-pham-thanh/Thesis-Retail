import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { State } from './price-state/price.state';
import * as priceProductActions from './price-state/price.actions';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PriceProduct } from '../model/price.model';
import * as pricePRoductSelector from './price-state/price.reducer';
import { filter, map, mergeMap, take } from 'rxjs/operators';

@Component({
  selector: 'app-price-management',
  templateUrl: './price-management.component.html',
  styleUrls: ['./price-management.component.scss']
})
export class PriceManagementComponent implements OnInit, AfterViewInit {
  
  ELEMENT_DATA = [
    // {id: 1, price: 100.000, startDate: '2022-12-01', endDate: '2022-12-31', status: 'Hoàn thành'},
    // {id: 2, price: 200.000, startDate: '2023-01-01', endDate: '2023-01-15', status: 'Đã hủy'},
    // {id: 2, price: 300.000, startDate: '2023-01-01', endDate: '2023-01-15', status: 'Đã hủy'},
    // {id: 2, price: 400.000, startDate: '2023-01-01', endDate: '2023-01-15', status: 'Đã hủy'},
    // {id: 2, price: 500.000, startDate: '2023-01-01', endDate: '2023-01-15', status: 'Đã hủy'},
    // {id: 2, price: 600.000, startDate: '2023-01-01', endDate: '2023-01-15', status: 'Đã hủy'},
    // {id: 2, price: 700.000, startDate: '2023-01-01', endDate: '2023-01-15', status: 'Đã hủy'},
    // {id: 2, price: 800.000, startDate: '2023-01-01', endDate: '2023-01-15', status: 'Đã hủy'},
    // {id: 2, price: 900.000, startDate: '2023-01-01', endDate: '2023-01-15', status: 'Đã hủy'},
    // {id: 2, price: 1000.000, startDate: '2023-01-01', endDate: '2023-01-15', status: 'Đã hủy'},
    // {id: 2, price: 1100.000, startDate: '2023-01-01', endDate: '2023-01-15', status: 'Đã hủy'},
    // {id: 2, price: 1200.000, startDate: '2023-01-01', endDate: '2023-01-15', status: 'Đã hủy'},
    // {id: 2, price: 1300.000, startDate: '2023-01-01', endDate: '2023-01-15', status: 'Đã hủy'},
    // {id: 2, price: 1400.000, startDate: '2023-01-01', endDate: '2023-01-15', status: 'Đã hủy'},
    // {id: 2, price: 1500.000, startDate: '2023-01-01', endDate: '2023-01-15', status: 'Đã hủy'},
    // {id: 2, price: 1600.000, startDate: '2023-01-01', endDate: '2023-01-15', status: 'Đã hủy'},
    // {id: 2, price: 1700.000, startDate: '2023-01-01', endDate: '2023-01-15', status: 'Đã hủy'},
    // {id: 2, price: 1800.000, startDate: '2023-01-01', endDate: '2023-01-15', status: 'Đã hủy'},
    // Các dòng dữ liệu khác...
  ];

  displayedColumns: string[] = ['productName', 'price', 'startDate', 'endDate', 'status'];
  dataSource = new MatTableDataSource<PriceProduct>();
  allPriceProduct: PriceProduct[];



  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(protected store: Store<State>) {
    this.store.dispatch(new priceProductActions.LoadAllPriceProduct());
  }

  ngOnInit() {
    this.store.pipe(select(pricePRoductSelector.getIsLoaded),
      filter(loaded => loaded === true),
      mergeMap(_ => 
        this.store.pipe(select(pricePRoductSelector.getAllPriceProduct),
        map(result => {
          this.allPriceProduct = result; 
          this.dataSource = new MatTableDataSource<PriceProduct>(this.allPriceProduct);
        }))
      ), take(1)
    ).subscribe();
  }


  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }


  setUpTable(allPriceProduct: PriceProduct[]){
    // allPriceProduct.forEach(item => {
    //   this.ELEMENT_DATA.push({
    //     id: item.id,
    //     productId: item.productId,
    //     product: item.product,
    //     startDate: item.startDate,
    //     endDate: item.endDate,
    //     status: item.EndDate,
    //   })
    // })
  }
}
