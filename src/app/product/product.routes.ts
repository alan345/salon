import {Routes} from '@angular/router';

import {AuthGuardService} from '../auth/authguard.service';

import {AppComponent} from '../app.component';

import {ProductsComponent} from './products.component';
import {SingleProductComponent} from './singleProduct.component';
import {NewProductComponent} from './newProduct.component';




export const USER_PRODUCTS: Routes = [
  {path: '', component: ProductsComponent},
  {path: 'newproduct', component: NewProductComponent},
  {path: ':id', component: SingleProductComponent},
];
