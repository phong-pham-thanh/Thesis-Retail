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



  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(protected store: Store<State>,
    private dialog: MatDialog
  ) {
    // this.store.dispatch(new priceProductActions.LoadAllPriceProduct());
    this.store.dispatch(new usersActions.LoadAllUsers());
  }

  ngOnInit() {
    this.store.pipe(select(usersSelector.getIsLoaded),
      filter(loaded => loaded === true),
      mergeMap(_ => 
        this.store.pipe(select(usersSelector.getAllUsers),
        map(result => {
          this.allUsers = result; 
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

  getListWareHouseName(item: Users){
    let allWareHouseName: string[] = item.listUserWareHouse?.map(uw => {
      return uw.wareHouseModel?.address;
    })
    return allWareHouseName.join(", ");
  }


  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}
