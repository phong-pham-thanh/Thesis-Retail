import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import {State} from '../state/users-state/users.state'
import * as usersActions from '../state/users-state/users.actions';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PriceProduct } from '../model/price.model';
import * as usersSelector from '../state/users-state/users.reducer';
import { filter, map, mergeMap, take } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';  // Import MatDialog
import { Users } from '../model/user.model';
import { UserFormComponent } from './user-form/user-form.component';
import * as wareHouseActions from '../state/warehouse-state/warehouse.actions';
import * as wareHouseSelector from '../state/warehouse-state/warehouse.reducer';
import { Warehouse } from '../model/warehouse.model';
import { UtilitiesService } from '../common/utilities.service';
import { CookieService } from 'ngx-cookie-service';
// import { UsersDetailComponent } from './users-detail/users-detail.component';~
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  
  
  // displayedColumns: string[] = ['productName', 'price', 'startDate', 'endDate', 'active', 'context'];
  // displayedColumns: string[] = ['id', 'createdDate', 'cusomter', 'wareHouse', 'user', 'totalAmount', 'context'];
  displayedColumns: string[] = ['id', 'username', 'name', 'address', 'dateOnboard', 'dateOfBirth', 'currentWarehouse', 'isAdmin', 'context'];
  dataSource = new MatTableDataSource<Users>();
  allUsers: Users[];
  isDropDownOpenWareHouse: boolean = false;
  selectedWarehousesId: number[] = []
  allWareHouse: Warehouse[] = [];
  fullData: Users[] = [];
  isDropdownOpenStatus = false;
  selectedIdStatus: boolean[] = [];
  isAdmin: boolean = false;

  statusArray = [
    {idStatus: true, name: 'Admin'},
    {idStatus: false, name: 'User thường'},
  ]

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(protected store: Store<State>,
    private cookieService: CookieService,
    private dialog: MatDialog
  ) {
    // this.store.dispatch(new priceProductActions.LoadAllPriceProduct());
    this.store.dispatch(new usersActions.LoadAllUsers());
    this.store.dispatch(new wareHouseActions.LoadAllWarehouse());

    const userCookieValue = this.cookieService.get('user');
    if (userCookieValue) {
      try {
        this.isAdmin = JSON.parse(userCookieValue).isAdmin;
      } catch (error) {
        console.error('Failed to parse cookie value', error);
      }
    } else {
      console.log('No user cookie found');
    }
  }

  ngOnInit() {
    this.store.pipe(select(usersSelector.getIsLoaded),
      filter(loaded => loaded === true),
      mergeMap(_ => 
        this.store.pipe(select(usersSelector.getAllUsers),
        map(result => {
          this.allUsers = result; 
          this.fullData = UtilitiesService.cloneDeep(result);
          this.dataSource = new MatTableDataSource<Users>(this.allUsers);
          this.dataSource.paginator = this.paginator; 
          this.dataSource.sort = this.sort;
          this.dataSource.sortingDataAccessor = (item: Users, property: string) => {
            switch (property) {
              case 'id':
                return item.id;
              case 'username':
                return item.username;
              case 'address':
                return item.address;
              case 'username':
                return item.username;
              case 'currentWarehouse':
                return item.listUserWareHouse.length > 0 ? item.listUserWareHouse[0].wareHouseModel?.address : null;
              case 'dateOnboard':
                return item.dateOnboard ? new Date(item.dateOnboard).getTime() : 0;
              case 'dateOfBirth':
                return item.dateOfBirth ? new Date(item.dateOfBirth).getTime() : 0;
              case 'isAdmin':
                return item.isAdmin ? 1 : 0;
              // case 'wareHouse':
              //   return item.wareHouse?.address ? item.wareHouse.address.toLowerCase() : '';
              // case 'createdDate':
              //   return item.createdDate ? new Date(item.createdDate).getTime() : 0;
              // case 'totalAmount':
              //   return item.totalAmount;
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
        this.store.pipe(select(wareHouseSelector.getAllWarehouse),
        map(result => {
          this.allWareHouse = result; 
        }))
      )
    ).subscribe();
  }


  edit(item: Users){
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '800px',
      data: item,
    });

    // dialogRef.afterClosed().subscribe(result => {
    // });
    
  }

  addNew(){
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '800px',
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  toggleDropdownWareHouse() {
    this.isDropDownOpenWareHouse = !this.isDropDownOpenWareHouse;
  }

  toggleDropdownStatus() {
    this.isDropdownOpenStatus = !this.isDropdownOpenStatus;
  }

  onCheckboxChangeWareHouse(warehouseId: number, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.selectedWarehousesId.push(warehouseId);
    } else {
      this.selectedWarehousesId = this.selectedWarehousesId.filter(id => id !== warehouseId);
    }
    this.filterUser();
  }

  onCheckboxChangeStatus(idStatus: boolean, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.selectedIdStatus.push(idStatus);
    } else {
      this.selectedIdStatus = this.selectedIdStatus.filter(id => id !== idStatus);
    }
    this.filterUser();
  }

  filterUser(){
    this.allUsers = UtilitiesService.cloneDeep(this.fullData);
    this.allUsers = this.selectedWarehousesId.length > 0 ? UtilitiesService.cloneDeep(this.allUsers.filter(x => {
      return x.listUserWareHouse.map(uw => uw.wareHouseId).filter(wid => this.selectedWarehousesId.includes(wid)).length > 0;
    })): this.allUsers;
    this.allUsers = this.selectedIdStatus.length > 0 ? UtilitiesService.cloneDeep(this.allUsers.filter(x => this.selectedIdStatus.includes(x.isAdmin))): this.allUsers;


    
    this.dataSource = new MatTableDataSource<Users>(this.allUsers);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
