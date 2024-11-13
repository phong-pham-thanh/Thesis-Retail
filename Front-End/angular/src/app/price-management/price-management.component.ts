import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { State } from './price-state/price.state';
import * as priceProductActions from './price-state/price.actions';
import * as productActions from '../product-state/product.actions';
import * as productSelector from '../product-state/product.reducer';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PriceProduct } from '../model/price.model';
import * as pricePRoductSelector from './price-state/price.reducer';
import { filter, map, mergeMap, take } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';  // Import MatDialog
import { PriceManagementFormComponent } from './price-management-form/price-management-form.component';  // Import the component
import { Product } from '../model/product.model';
import { UtilitiesService } from '../common/utilities.service';

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
  fullData: PriceProduct[]
  allProducts: Product[] = [];
  productSelectedId: number[] = [];
  isDropdownOpenStatus = false;
  selectedIdStatus: boolean[] = [];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(protected store: Store<State>,
    private dialog: MatDialog
  ) {
    this.store.dispatch(new priceProductActions.LoadAllPriceProduct());
    this.store.dispatch(new productActions.LoadAllProduct());
  }

  statusArray = [
    {idStatus: true, name: 'Hiện hành', className: 'status-good-transfer error-good-transfer'},
    {idStatus: false, name: 'Đã dừng', className: 'status-good-transfer complete-good-transfer'},
  ]

  ngOnInit() {
    this.store.pipe(select(pricePRoductSelector.getIsLoaded),
      filter(loaded => loaded === true),
      mergeMap(_ => 
        this.store.pipe(select(pricePRoductSelector.getAllPriceProduct),
        map(result => {
          this.allPriceProduct = result; 
          this.fullData = result; 
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

    this.store.pipe(select(productSelector.getIsLoaded),
      filter(loaded => loaded === true),
      mergeMap(_ => 
        this.store.pipe(select(productSelector.getAllProduct),
        map(result => {
          this.allProducts = result;
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


  onProductSelectedChange($event: number[]) {
    this.productSelectedId = $event
    this.filterList();
  }

  toggleDropdownStatus() {
    this.isDropdownOpenStatus = !this.isDropdownOpenStatus;
  }

  onCheckboxChangeStatus(idStatus: boolean, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.selectedIdStatus.push(idStatus);
    } else {
      this.selectedIdStatus = this.selectedIdStatus.filter(id => id !== idStatus);
    }
    this.filterList();
  }

  filterList(){
    this.allPriceProduct = UtilitiesService.cloneDeep(this.fullData);
    this.allPriceProduct = this.productSelectedId.length > 0 ? UtilitiesService.cloneDeep(this.allPriceProduct.filter(x => this.productSelectedId.includes(x.productId))): this.allPriceProduct;
    this.allPriceProduct = this.selectedIdStatus.length > 0 ? UtilitiesService.cloneDeep(this.allPriceProduct.filter(x => this.selectedIdStatus.includes(x.active))): this.allPriceProduct;

    

    this.dataSource = new MatTableDataSource<PriceProduct>(this.allPriceProduct);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
