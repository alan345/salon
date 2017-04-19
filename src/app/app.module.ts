import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule, RequestOptions, Http} from '@angular/http';
import {AppComponent} from './app.component';
import {NavbarComponent} from './navbar/navbar.component';
import {FormComponent} from './form/form.component';
import {RegisterComponent} from './user/register/register.component';
import {UserComponent} from './user/user.component';
import {NewUserComponent} from './user/users/newUser.component';
import {SingleUserComponent} from './user/users/singleUser.component';
import {AddNoteComponent} from './user/users/addNote.component';
import {ChooseDateComponent} from './user/users/chooseDate.component';




import {ProductComponent} from './product/product.component';
import {ProductsComponent} from './product/products.component';
import {NewProductComponent} from './product/newProduct.component';
import {SingleProductComponent} from './product/singleProduct.component';
import {ProductService} from './product/product.service';


import {PressComponent} from './press/press.component';
import {PressesComponent} from './press/presses.component';
import {PressSingleComponent} from './press/pressSingle.component';
import {PressService} from './press/press.service';

import {VideoComponent} from './video/video.component';
import {VideosComponent} from './video/videos.component';
import {VideoSingleComponent} from './video/videoSingle.component';
import {VideoService} from './video/video.service';



import {PromotionComponent} from './promotion/promotion.component';
import {PromotionsComponent} from './promotion/promotions.component';
//import {NewPromotionComponent} from './promotion/newPromotion.component';
import {SinglePromotionComponent} from './promotion/singlePromotion.component';
import {PromotionService} from './promotion/promotion.service';



import {UsersComponent} from './user/users/users.component';
import {UserService} from './user/user.service';

import {RouterModule} from '@angular/router';
import {routing} from './routes.component';
import {CommonModule, HashLocationStrategy, LocationStrategy} from '@angular/common';
import {AuthGuardService} from './auth/authguard.service';
import {AuthService} from './auth/auth.service';
import {ErrorService} from './errorHandler/error.service';



import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastModule, ToastOptions} from 'ng2-toastr';




import {LoginComponent} from './user/login/login.component';
import {ErrorComponent} from './errorHandler/error.component';

import {MainPageComponent} from './mainPage/mainPage.component';
import {MainPageHomeComponent} from './mainPageHome/mainPageHome.component';
import {MainPageHomeService} from './mainPageHome/mainPageHome.service';


import {CompaniesComponent} from './companie/companies.component';
import {CompanieComponent} from './companie/companie.component';
import {EditCompanieComponent} from './companie/editCompanie.component';
import {EditAddUserToCompanieComponent} from './companie/editAddUserToCompanie.component';
import {CompanieDialogComponent} from './companie/companies.component';
import {CompanieDetailComponent} from './companie/companieDetail.component';
import {CompanieService} from './companie/companie.service';


import {MapComponent} from './map/map.component';
import {ResetPasswordComponent} from './user/accountRecover/resetPassword.component';
import {ForgetPasswordComponent} from './user/accountRecover/forgetPassword.component';
import {FormService} from './form/form.service';

import {RegionService} from './region/region.service';
import {EditUserFormComponent} from './userForms/editForm/editUserForm.component';


import {ProgressBarModule} from 'ng2-progress-bar';
import {ErrorPageComponent} from './errorPage/errorPage.component';

import {AdminPageComponent} from './admin/adminPage/adminPage.component';
import {AdminService} from './admin/services/admin.service';
import {EditUsersFormsComponent} from './admin/editUsersForms/editUsersForms.component';




import {EditOptionsComponent} from './admin/editOptions/editOptions.component';
import {EditOptionsComponentDialog} from './modalLibrary/modalLibrary.component';


import {EditOptionsService} from './admin/editOptions/editOptions.service';



import {AdminGuardService} from './admin/services/adminGuard';
import {AdminComponent} from './admin/admin.component';

import { UserProfileComponent } from './user/profile/userProfile.component';
import {ProfileService} from "./user/profile/profile.service";
import { ChangePasswordComponent } from './user/profile/changePassword/changePassword.component';
import { MaterialModule } from '@angular/material';
import {Ng2PaginationModule} from 'ng2-pagination';


import {NgbModule} from '@ng-bootstrap/ng-bootstrap';



import {UserFormsComponent} from './userForms/formsTable/userForms.component';

import {AuthHttp, AuthConfig} from 'angular2-jwt';



import {  ApplicationRef } from '@angular/core';
import { AgmCoreModule } from 'angular2-google-maps/core';

let options = <ToastOptions> {
  animate: 'flyRight',
  positionClass: 'toast-top-right',
};

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp( new AuthConfig({}), http, options);
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FormComponent,

    ProductComponent,
    ProductsComponent,
    NewProductComponent,
    SingleProductComponent,


    PressComponent,
    PressesComponent,
    PressSingleComponent,

    VideoComponent,
    VideosComponent,
    VideoSingleComponent,


    PromotionComponent,
    PromotionsComponent,
  //  NewPromotionComponent,
    SinglePromotionComponent,


    UsersComponent,
    UserComponent,
    NewUserComponent,
    SingleUserComponent,
    AddNoteComponent,
    ChooseDateComponent,


    RegisterComponent,
    LoginComponent,
    NavbarComponent,
    ErrorComponent,
    MainPageComponent,
    MainPageHomeComponent,
    CompaniesComponent,
    CompanieComponent,
    EditCompanieComponent,
    EditAddUserToCompanieComponent,
    CompanieDialogComponent,
    CompanieDetailComponent,
    MapComponent,
    ResetPasswordComponent,
    ForgetPasswordComponent,
    UserFormsComponent,
    EditUserFormComponent,
    ErrorPageComponent,
    AdminPageComponent,
    EditUsersFormsComponent,
    EditOptionsComponent,
    EditOptionsComponentDialog,
    AdminComponent,
    UserProfileComponent,
    ChangePasswordComponent,


  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpModule,
    RouterModule,
    ReactiveFormsModule,
    routing,
    BrowserAnimationsModule,
    ToastModule.forRoot(options),
    ProgressBarModule,

    FormsModule,
    Ng2PaginationModule,
    NgbModule.forRoot(),
    MaterialModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: ''
    })
  ],
  providers: [
    AuthGuardService,
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    AuthService,
    ErrorService,
    CompanieService,
    VideoService,
    MainPageHomeService,
    RegionService,
    PressService,
    FormService,
    AdminService,
    EditOptionsService,
    UserService,
    ProductService,
    PromotionService,
    AdminGuardService,
    ProfileService,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [ Http, RequestOptions ]
    }
  ],
  entryComponents: [

    EditOptionsComponentDialog,
    CompanieDialogComponent
  ],

  bootstrap: [AppComponent],
//  bootstrap: [AppComponent, EditOptionsComponentDialog],
})
export class AppModule {}
