import { Routes,
         RouterModule }        from '@angular/router';
import { NgModule }            from '@angular/core';
import {AuthGuardService} from '../auth/authguard.service';

import {AppComponent} from '../app.component';

import {ProductsComponent} from './products.component';
import {ProductSingleComponent} from './productSingle.component';
import {ProductEditComponent} from './productEdit.component';
//import {NewProductComponent} from './newProduct.component';


export const routes: Routes = [
  {path: '', component: ProductsComponent},
  {path: ':id', component: ProductSingleComponent},
//  {path: 'productEdit', component: ProductEditComponent},
  {path: 'productEdit/:id', component: ProductEditComponent},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRouting {}
