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
import { MatDialog } from '@angular/material/dialog';  // Import MatDialog
import { PriceManagementFormComponent } from './price-management-form/price-management-form.component';  // Import the component

@Component({
  selector: 'app-price-management',
  templateUrl: './price-management.component.html',
  styleUrls: ['./price-management.component.scss']
})
export class PriceManagementComponent implements OnInit, AfterViewInit {

  // displayedColumns: string[] = ['productName', 'price', 'startDate', 'endDate', 'active', 'context'];
  displayedColumns: string[] = ['productName', 'price', 'startDate', 'endDate', 'active'];
  dataSource = new MatTableDataSource<PriceProduct>();
  allPriceProduct: PriceProduct[];



  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(protected store: Store<State>,
    private dialog: MatDialog
  ) {
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
          this.dataSource.paginator = this.paginator; 
          this.dataSource.sort = this.sort;

          this.dataSource.sortingDataAccessor = (item: PriceProduct, property: string) => {
            switch (property) {
              case 'productName':
                return item.product?.name ? item.product.name.toLowerCase() : '';
              case 'price':
                return item.price;
              case 'startDate':
                return item.startDate ? new Date(item.startDate).getTime() : 0;
              case 'endDate':
                return item.endDate ? new Date(item.endDate).getTime() : 0;
              case 'active':
                return item.active ? 1 : 0;
              default:
                return '';
            }
          };
        }))
      )
    ).subscribe();
  }


  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  addNew() {
    const dialogRef = this.dialog.open(PriceManagementFormComponent, {
      width: '800px',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  editPrice(priceProduct: PriceProduct) {
    const dialogRef = this.dialog.open(PriceManagementFormComponent, {
      width: '800px',
      data: priceProduct,
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  deletePrice(priceProduct: PriceProduct){
    this.store.dispatch(new priceProductActions.DeletePriceProduct(priceProduct));
    
    this.store.pipe(select(pricePRoductSelector.getIsLoading),
      filter(x => x === false),
      map(_ =>
        this.store.dispatch(new priceProductActions.LoadAllPriceProduct())
      ), take(1)).subscribe();
  }
}
