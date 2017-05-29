import { BrowserModule} from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule, RequestOptions, Http} from '@angular/http';
import { AppComponent} from './app.component';

import { MaterialModule } from '@angular/material';
import { Ng2PaginationModule} from 'ng2-pagination';
import { ProgressBarModule} from 'ng2-progress-bar';
import { RouterModule} from '@angular/router';
import { CommonModule, HashLocationStrategy, LocationStrategy} from '@angular/common';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AuthHttp, AuthConfig} from 'angular2-jwt';



import { ToastModule} from 'ng2-toastr/ng2-toastr';
import { ToastOptions} from 'ng2-toastr';
import { CustomOption } from './toast-options';



import { NavbarComponent} from './nav/navbar/navbar.component';
import { SideNavbarComponent} from './nav/sideNavbar/sideNavbar.component';
import { FooterComponent} from './nav/footer/footer.component';



import { FormComponent} from './form/form.component';
// import { RegisterComponent} from './user/register/register.component';
// import { UserComponent} from './user/user.component';
// import { NewUserComponent} from './user/users/newUser.component';
// import { SingleUserComponent} from './user/users/singleUser.component';
// import { AddNoteComponent} from './user/users/addNote.component';
// import { ChooseDateComponent} from './user/users/chooseDate.component';
// import { AddProductsToUserComponent} from './user/users/addProductsToUser.component';
// import { UserProductsHistory} from './user/users/userProductsHistory.component';
//




import { DeleteDialog} from './deleteDialog/deleteDialog.component';
import { SeePictureDialogComponent} from './seePictureDialog/seePictureDialog.component';



import { PressComponent} from './press/press.component';
import { PressesComponent} from './press/presses.component';
import { PressSingleComponent} from './press/pressSingle.component';
import { PressService} from './press/press.service';



import { VideoModule} from './video/video.module';
import { UserModule} from './user/user.module';
import { ProductModule} from './product/product.module';
import { CompanieModule} from './companie/companie.module';
import { ProductBatchModule} from './productBatch/productBatch.module';


import { PromotionsSeeInactiveComponent} from './promotion/promotionsSeeInactive.component';
import { PromotionDeleteDialog} from './promotion/promotionDeleteDialog.component';
import { PromotionComponent} from './promotion/promotion.component';
import { PromotionsComponent} from './promotion/promotions.component';
import { SinglePromotionComponent} from './promotion/singlePromotion.component';
import { PromotionService} from './promotion/promotion.service';



import { SubmitPicDialog} from './social/submitPicDialog.component';
import { SocialComponent} from './social/social.component';
import { SocialsComponent} from './social/socials.component';



import { AppRoutingModule} from './appRouting.module';

import { AuthGuardService} from './auth/authguard.service';
import { AuthService} from './auth/auth.service';
import { ErrorService} from './errorHandler/error.service';


import { ErrorComponent} from './errorHandler/error.component';


import { MainPageHomeComponent} from './mainPageHome/mainPageHome.component';
import { MainPageHomeService} from './mainPageHome/mainPageHome.service';






import { FormService} from './form/form.service';


import { ErrorPageComponent} from './errorPage/errorPage.component';



import { AdminUsersComponent} from './admin/user/adminUsers.component';
import { AdminService} from './admin/services/admin.service';


import { EditOptionsComponentDialog} from './modalLibrary/modalLibrary.component';



import { AdminGuardService} from './admin/services/adminGuard';
import { AdminComponent} from './admin/admin.component';






import { UserFormsComponent} from './form/userForms.component';
import { UserFormsUploadAndList} from './form/userFormsUploadAndList.component';






export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp( new AuthConfig({}), http, options);
}

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    SideNavbarComponent,
    FormComponent,

    // ProductComponent,
    // ProductsComponent,
    // NewProductComponent,
    // SingleProductComponent,

    DeleteDialog,
    SeePictureDialogComponent,

    PressComponent,
    PressesComponent,
    PressSingleComponent,


    // VideoDeleteDialog,
    // VideoWhereDialogComponent,
    // VideoComponent,
    // VideosComponent,
    // VideoSingleComponent,

    PromotionDeleteDialog,
    PromotionsSeeInactiveComponent,
    PromotionComponent,
    PromotionsComponent,
    SinglePromotionComponent,

    SubmitPicDialog,
    SocialComponent,
    SocialsComponent,



    // UserComponent,
    // NewUserComponent,
    // SingleUserComponent,
    // AddNoteComponent,
    // ChooseDateComponent,
    // UserPicturesComponent,
    // AddProductsToUserComponent,
    // UserProductsHistory,
    //
    //
    // RegisterComponent,



    NavbarComponent,
    SideNavbarComponent,
    ErrorComponent,

    MainPageHomeComponent,


    // CompanieDetailUsersComponent,
    // CompaniePicturesComponent,
    // CompaniesComponent,
    // CompanieComponent,
    // EditCompanieComponent,
    // EditAddUserToCompanieComponent,
    // CompanieDetailComponent,
    // CompanieFilterPipe,


  //  CompanieAddUserDialog,



    UserFormsComponent,
    UserFormsUploadAndList,
    ErrorPageComponent,

    AdminUsersComponent,

    EditOptionsComponentDialog,
    AdminComponent,




  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpModule,
    RouterModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastModule.forRoot(),
    ProgressBarModule,
    FormsModule,
    Ng2PaginationModule,
//    NgbModule.forRoot(),
    MaterialModule,


    UserModule,
    VideoModule,
    ProductModule,
    CompanieModule,
    ProductBatchModule,

  ],
  providers: [
    AuthGuardService,
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    AuthService,
    ErrorService,
//    CompanieService,
    //VideoService,
    MainPageHomeService,
    PressService,
    FormService,
    AdminService,
  //  UserService,
  //  ProductService,
    PromotionService,
    AdminGuardService,
  //  ProfileService,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [ Http, RequestOptions ]
    },
    {provide: ToastOptions, useClass: CustomOption},
  ],
  entryComponents: [
  //  CompanieAddUserDialog,
    DeleteDialog,
    SubmitPicDialog,
    PromotionDeleteDialog,
    EditOptionsComponentDialog,
    // VideoDeleteDialog,
    // VideoWhereDialogComponent,
    SeePictureDialogComponent,
  ],

  bootstrap: [AppComponent],
//  bootstrap: [AppComponent, EditOptionsComponentDialog],
})
export class AppModule {}
