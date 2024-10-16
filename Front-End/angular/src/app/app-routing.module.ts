import { APP_BASE_HREF } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmptyRouteComponent } from './empty-route/empty-route.component';
import { RetailComponentComponent } from './retail-component/retail-component.component';
import { PriceManagementComponent } from './price-management/price-management.component';
import { BillListComponent } from './bill-list/bill-list.component';

const routes: Routes = [
  {path: "quan-ly/retail", component: RetailComponentComponent},
  {path: "quan-ly/price-management", component: PriceManagementComponent},
  {path: "quan-ly/bill", component: BillListComponent},
  {path: '**', component: EmptyRouteComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes),],
  providers: [{provide: APP_BASE_HREF, useValue: '/'}],
  exports: [RouterModule]
})
export class AppRoutingModule { }
