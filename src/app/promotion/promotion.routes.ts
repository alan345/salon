import {Routes} from '@angular/router';

import {AuthGuardService} from '../auth/authguard.service';

import {AppComponent} from '../app.component';

import {PromotionsComponent} from './promotions.component';
import {SinglePromotionComponent} from './singlePromotion.component';
//import {NewPromotionComponent} from './newPromotion.component';




export const USER_PROMOTIONS: Routes = [
  {path: '', component: PromotionsComponent},
  {path: 'singlepromotion', component: SinglePromotionComponent},
  {path: 'singlepromotion/:id', component: SinglePromotionComponent},
  {path: ':id', component: SinglePromotionComponent},
];
