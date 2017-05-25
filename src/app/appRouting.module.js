var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { RouterModule } from '@angular/router';
import { USER_ROUTES } from './user/user.routes';
import { ADMIN_ROUTES } from './admin/admin.routes';
import { UserComponent } from './user/user.component';
import { FormComponent } from './form/form.component';
import { UserFormsUploadAndList } from './form/userFormsUploadAndList.component';
import { AuthGuardService } from './auth/authguard.service';
import { MainPageHomeComponent } from './mainPageHome/mainPageHome.component';
import { SOCIAL } from './social/social.routes';
import { SocialComponent } from './social/social.component';
import { USER_PROMOTIONS } from './promotion/promotion.routes';
import { PromotionComponent } from './promotion/promotion.component';
import { USER_PRESSES } from './press/press.routes';
import { PressComponent } from './press/press.component';
import { AdminComponent } from './admin/admin.component';
import { ErrorPageComponent } from './errorPage/errorPage.component';
import { NgModule } from '@angular/core';
export var routes = [
    //  {path: '', component: MainPageHomeComponent, pathMatch: 'full'},
    { path: '', component: MainPageHomeComponent, canActivate: [AuthGuardService], pathMatch: 'full' },
    { path: 'social', component: SocialComponent, canActivate: [AuthGuardService], children: SOCIAL },
    //  {path: 'home2', component: MainPageComponent, pathMatch: 'full'},
    { path: 'press', component: PressComponent, canActivate: [AuthGuardService], children: USER_PRESSES },
    //{path: 'product', component: ProductComponent, canActivate: [AuthGuardService], children: USER_PRODUCTS},
    //  {path: 'video', component: VideoComponent, canActivate: [AuthGuardService], children: VIDEOS},
    //{path: 'companie', component: CompanieComponent, canActivate: [AuthGuardService], children: USER_COMPANIES},
    { path: 'companie', loadChildren: 'app/companie/companie.module#CompanieModule' },
    { path: 'video', loadChildren: 'app/video/video.module#VideoModule' },
    { path: 'product', loadChildren: 'app/product/product.module#ProductModule' },
    { path: 'productBatch', loadChildren: 'app/productBatch/productBatch.module#ProductBatchModule' },
    { path: 'promotion', component: PromotionComponent, canActivate: [AuthGuardService], children: USER_PROMOTIONS },
    //  {path: 'companie/:id', component: CompanieDetailComponent},
    //  {path: 'companie/edit/:id', component: EditCompanieComponent},
    //  {path: 'map', component: MapComponent, pathMatch: 'full'},
    { path: 'user', component: UserComponent, children: USER_ROUTES },
    { path: 'form', component: FormComponent, canActivate: [AuthGuardService] },
    //{path: 'userForms', component: UserFormsComponent, canActivate: [AuthGuardService]},
    { path: 'userForms', component: UserFormsUploadAndList, canActivate: [AuthGuardService] },
    //{path: 'userFormsboth', component: UserFormsUploadAndList, canActivate: [AuthGuardService]},
    { path: 'admin', component: AdminComponent, children: ADMIN_ROUTES },
    { path: '404', component: ErrorPageComponent },
    { path: '**', redirectTo: '404' }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forRoot(routes)],
        exports: [RouterModule]
    })
], AppRoutingModule);
export { AppRoutingModule };
//# sourceMappingURL=appRouting.module.js.map