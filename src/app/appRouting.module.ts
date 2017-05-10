import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {USER_ROUTES} from './user/user.routes';

import {ADMIN_ROUTES} from './admin/admin.routes';
import {UserComponent} from './user/user.component';
import {FormComponent} from './form/form.component';
import {UserFormsComponent} from './form/userForms.component';
import {UserFormsUploadAndList} from './form/userFormsUploadAndList.component';



import {AuthGuardService} from './auth/authguard.service';

import {MainPageHomeComponent} from './mainPageHome/mainPageHome.component';


import {USER_COMPANIES} from './companie/companie.routes';
import {CompanieComponent} from './companie/companie.component';

import {SOCIAL} from './social/social.routes';
import {SocialComponent} from './social/social.component';



import {USER_PROMOTIONS} from './promotion/promotion.routes';
import {PromotionComponent} from './promotion/promotion.component';

import {USER_PRESSES} from './press/press.routes';
import {PressComponent} from './press/press.component';

//import {VIDEOS} from './video/video.routes';
import {VideoComponent} from './video/video.component';

import {USER_PRODUCTS} from './product/product.routes';
import {ProductComponent} from './product/product.component';

import {AdminComponent} from './admin/admin.component';
import {ErrorPageComponent} from './errorPage/errorPage.component';
import {AdminGuardService} from './admin/services/adminGuard';

import { NgModule }             from '@angular/core';



export const routes: Routes = [
//  {path: '', component: MainPageHomeComponent, pathMatch: 'full'},
  {path: '', component: MainPageHomeComponent, canActivate: [AuthGuardService], pathMatch: 'full'},
  {path: 'social', component: SocialComponent, canActivate: [AuthGuardService], children: SOCIAL},
//  {path: 'home2', component: MainPageComponent, pathMatch: 'full'},
  {path: 'companie', component: CompanieComponent, canActivate: [AuthGuardService], children: USER_COMPANIES},
  {path: 'press', component: PressComponent, canActivate: [AuthGuardService], children: USER_PRESSES},
  {path: 'product', component: ProductComponent, canActivate: [AuthGuardService], children: USER_PRODUCTS},
//  {path: 'video', component: VideoComponent, canActivate: [AuthGuardService], children: VIDEOS},
  {path: 'video', loadChildren: 'app/video/video.module#VideoModule'},
  {path: 'promotion', component: PromotionComponent, canActivate: [AuthGuardService], children: USER_PROMOTIONS},
//  {path: 'companie/:id', component: CompanieDetailComponent},
//  {path: 'companie/edit/:id', component: EditCompanieComponent},
//  {path: 'map', component: MapComponent, pathMatch: 'full'},
  {path: 'user', component: UserComponent, children: USER_ROUTES},
  {path: 'form', component: FormComponent, canActivate: [AuthGuardService]},
  //{path: 'userForms', component: UserFormsComponent, canActivate: [AuthGuardService]},
  {path: 'userForms', component: UserFormsUploadAndList, canActivate: [AuthGuardService]},
  //{path: 'userFormsboth', component: UserFormsUploadAndList, canActivate: [AuthGuardService]},



  {path: 'admin', component: AdminComponent, children: ADMIN_ROUTES},
  {path: '404', component: ErrorPageComponent},
  {path: '**', redirectTo: '404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
