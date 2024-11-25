import { APP_BASE_HREF } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmptyRouteComponent } from './empty-route/empty-route.component';
import { RetailComponentComponent } from './retail-component/retail-component.component';
import { PriceManagementComponent } from './price-management/price-management.component';
import { BillListComponent } from './bill-list/bill-list.component';
import { GoodTransferComponent } from './good-transfer/good-transfer.component';
import { GoodTransferDetailComponent } from './good-transfer/good-transfer-detail/good-transfer-detail.component';
import { PriceManagementFormComponent } from './price-management/price-management-form/price-management-form.component';
import { UserListComponent } from './user-list/user-list.component';
import { AuthGuard } from './services/auth.guard';
import { EmptyComponentComponent } from './empty-component/empty-component.component';
import { AnalyseComponent } from './analyse/analyse.component';

const routes: Routes = [
  {path: "login",  component: EmptyComponentComponent},
  {path: "quan-ly/retail", component: RetailComponentComponent, canActivate: [AuthGuard] },
  {path: "quan-ly/baocao", component: AnalyseComponent, canActivate: [AuthGuard] },
  {path: "quan-ly/price-management", component: PriceManagementComponent, canActivate: [AuthGuard] },
  {path: "quan-ly/bill", component: BillListComponent, canActivate: [AuthGuard] },
  {path: "quan-ly/employee", component: UserListComponent, canActivate: [AuthGuard] },
  {path: "quan-ly/good-transfer", component: GoodTransferComponent, canActivate: [AuthGuard] },
  {path: "quan-ly/good-transfer/edit/:id", component: GoodTransferDetailComponent, canActivate: [AuthGuard] },
  {path: '**', component: EmptyRouteComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes),],
  providers: [{provide: APP_BASE_HREF, useValue: '/'}],
  exports: [RouterModule]
})
export class AppRoutingModule { }
