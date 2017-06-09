import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { UserFormsUploadAndList } from './form/userFormsUploadAndList.component';
import { AuthGuardService } from './auth/authguard.service';
import { MainPageHomeComponent } from './mainPageHome/mainPageHome.component';
import { SOCIAL } from './social/social.routes';
import { SocialComponent } from './social/social.component';
import { ErrorPageComponent } from './errorPage/errorPage.component';
import { NgModule } from '@angular/core';

//import { AdminGuardService } from './admin/services/adminGuard';
//import { UserFormsComponent } from './form/userForms.component';
//import { ModuleWithProviders } from '@angular/core';
//import { USER_ROUTES } from './user/user.routes';
//import { ADMIN_ROUTES } from './admin/admin.routes';
//import { UserComponent } from './user/user.component';
//import { USER_COMPANIES } from './companie/companie.routes';
//import { CompanieComponent } from './companie/companie.component';
//import { USER_PROMOTIONS } from './promotion/promotion.routes';
//import { PromotionComponent } from './promotion/promotion.component';
//import { PressComponent } from './press/press.component';
//import { USER_PRODUCTS } from './product/product.routes';
//import { ProductComponent } from './product/product.component';
//import { AdminComponent } from './admin/admin.component';




export const routes: Routes = [
//  {path: '', component: MainPageHomeComponent, pathMatch: 'full'},
  {path: '', component: MainPageHomeComponent, canActivate: [AuthGuardService], pathMatch: 'full'},
  {path: 'social', component: SocialComponent, canActivate: [AuthGuardService], children: SOCIAL},
  {path: 'companie', loadChildren: 'app/companie/companie.module#CompanieModule'},
  {path: 'press', loadChildren: 'app/press/press.module#PressModule'},
  {path: 'video', loadChildren: 'app/video/video.module#VideoModule'},
  {path: 'product', loadChildren: 'app/product/product.module#ProductModule'},
  {path: 'productBatch', loadChildren: 'app/productBatch/productBatch.module#ProductBatchModule'},
  {path: 'user', loadChildren: 'app/user/user.module#UserModule'},
  {path: 'promotion', loadChildren: 'app/promotion/promotion.module#PromotionModule'},
  {path: 'form', component: FormComponent, canActivate: [AuthGuardService]},
  {path: 'userForms', component: UserFormsUploadAndList, canActivate: [AuthGuardService]},
  {path: '404', component: ErrorPageComponent},
  {path: '**', redirectTo: '404'}

  //  {path: 'home2', component: MainPageComponent, pathMatch: 'full'},
  //  {path: 'press', component: PressComponent, canActivate: [AuthGuardService], children: USER_PRESSES},
    //{path: 'product', component: ProductComponent, canActivate: [AuthGuardService], children: USER_PRODUCTS},
  //  {path: 'video', component: VideoComponent, canActivate: [AuthGuardService], children: VIDEOS},
    //{path: 'companie', component: CompanieComponent, canActivate: [AuthGuardService], children: USER_COMPANIES},
  //{path: 'promotion', component: PromotionComponent, canActivate: [AuthGuardService], children: USER_PROMOTIONS},
//  {path: 'companie/:id', component: CompanieDetailComponent},
//  {path: 'companie/edit/:id', component: EditCompanieComponent},
//  {path: 'map', component: MapComponent, pathMatch: 'full'},
  // {path: 'user', component: UserComponent, children: USER_ROUTES},
  //{path: 'userForms', component: UserFormsComponent, canActivate: [AuthGuardService]},
  //{path: 'userFormsboth', component: UserFormsUploadAndList, canActivate: [AuthGuardService]},
//  {path: 'admin', component: AdminComponent, children: ADMIN_ROUTES},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
