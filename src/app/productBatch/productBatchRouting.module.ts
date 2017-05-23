import { Routes, RouterModule }        from '@angular/router';
import { NgModule }            from '@angular/core';


import {ProductBatchsComponent} from './productBatchs.component';
import {ProductBatchSingleComponent} from './productBatchSingle.component';
import {ProductBatchEditComponent} from './productBatchEdit.component';
import {ProductBatchsAdminComponent} from './admin/productBatchsAdmin.component';

import {AdminGuardService} from '../admin/services/adminGuard';



export const routes: Routes = [
  {path: '', component: ProductBatchsComponent},
  {path: 'admin', component: ProductBatchsAdminComponent, canActivate: [AdminGuardService]},

  {path: ':id', component: ProductBatchSingleComponent},
//  {path: 'productBatchEdit', component: ProductBatchEditComponent},
  {path: 'productBatchEdit/:id', component: ProductBatchEditComponent, canActivate: [AdminGuardService]},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductBatchRouting {}
