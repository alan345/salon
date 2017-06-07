import { Routes, RouterModule } from '@angular/router';
import { NgModule }            from '@angular/core';
// import {AuthGuardService} from '../auth/authguard.service';
//
// import {AppComponent} from '../app.component';

import {PromotionsComponent} from './promotions.component';
import {SinglePromotionComponent} from './singlePromotion.component';

import {PromotionsSeeInactiveComponent} from './promotionsSeeInactive.component';


export const routes: Routes = [
  {path: '', component: PromotionsComponent},
  {path: 'seeInactive', component: PromotionsSeeInactiveComponent},
  {path: 'singlepromotion', component: SinglePromotionComponent},
  {path: 'singlepromotion/:id', component: SinglePromotionComponent},
  {path: ':id', component: SinglePromotionComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PromotionRouting {}
