import {Routes} from '@angular/router';

import {AuthGuardService} from '../auth/authguard.service';

import {AppComponent} from '../app.component';

import {PromotionsComponent} from './promotions.component';
import {SinglePromotionComponent} from './singlePromotion.component';
import {NewPromotionComponent} from './newPromotion.component';




export const USER_PROMOTIONS: Routes = [
  {path: '', component: PromotionsComponent},
  {path: 'newpromotion', component: NewPromotionComponent},
  {path: ':id', component: SinglePromotionComponent},
];
