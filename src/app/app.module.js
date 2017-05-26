var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, RequestOptions, Http } from '@angular/http';
import { AppComponent } from './app.component';
import { MaterialModule } from '@angular/material';
import { Ng2PaginationModule } from 'ng2-pagination';
import { ProgressBarModule } from 'ng2-progress-bar';
import { RouterModule } from '@angular/router';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { ToastOptions } from 'ng2-toastr';
import { CustomOption } from './toast-options';
// let options = <ToastOptions> {
//   animate: 'flyRight',
//   positionClass: 'toast-top-right',
// };
import { NavbarComponent } from './nav/navbar/navbar.component';
import { SideNavbarComponent } from './nav/sideNavbar/sideNavbar.component';
import { FooterComponent } from './nav/footer/footer.component';
import { FormComponent } from './form/form.component';
import { RegisterComponent } from './user/register/register.component';
import { UserComponent } from './user/user.component';
import { NewUserComponent } from './user/users/newUser.component';
import { SingleUserComponent } from './user/users/singleUser.component';
import { AddNoteComponent } from './user/users/addNote.component';
import { ChooseDateComponent } from './user/users/chooseDate.component';
//
//
// import { ProductComponent} from './product/product.component';
// import { ProductsComponent} from './product/products.component';
// import { NewProductComponent} from './product/newProduct.component';
// import { SingleProductComponent} from './product/singleProduct.component';
// import { ProductService} from './product/product.service';
//
import { DeleteDialog } from './deleteDialog/deleteDialog.component';
import { SeePictureDialogComponent } from './seePictureDialog/seePictureDialog.component';
import { PressComponent } from './press/press.component';
import { PressesComponent } from './press/presses.component';
import { PressSingleComponent } from './press/pressSingle.component';
import { PressService } from './press/press.service';
import { VideoModule } from './video/video.module';
import { ProductModule } from './product/product.module';
import { CompanieModule } from './companie/companie.module';
import { ProductBatchModule } from './productBatch/productBatch.module';
// import { VideoDeleteDialog} from './video/videoDeleteDialog.component';
// import { VideoWhereDialogComponent} from './video/videoWhereDialog.component';
//
// import { VideoComponent} from './video/video.component';
// import { VideosComponent} from './video/videos.component';
// import { VideoSingleComponent} from './video/videoSingle.component';
// import { VideoService} from './video/video.service';
import { PromotionsSeeInactiveComponent } from './promotion/promotionsSeeInactive.component';
import { PromotionDeleteDialog } from './promotion/promotionDeleteDialog.component';
import { PromotionComponent } from './promotion/promotion.component';
import { PromotionsComponent } from './promotion/promotions.component';
import { SinglePromotionComponent } from './promotion/singlePromotion.component';
import { PromotionService } from './promotion/promotion.service';
import { SubmitPicDialog } from './social/submitPicDialog.component';
import { SocialComponent } from './social/social.component';
import { SocialsComponent } from './social/socials.component';
import { UserPicturesComponent } from './user/users/userPictures.component';
import { UsersComponent } from './user/users/users.component';
import { UserService } from './user/user.service';
import { AppRoutingModule } from './appRouting.module';
import { AuthGuardService } from './auth/authguard.service';
import { AuthService } from './auth/auth.service';
import { ErrorService } from './errorHandler/error.service';
import { LoginComponent } from './user/login/login.component';
import { ErrorComponent } from './errorHandler/error.component';
import { MainPageHomeComponent } from './mainPageHome/mainPageHome.component';
import { MainPageHomeService } from './mainPageHome/mainPageHome.service';
// import { CompanieFilterPipe} from './companie/companieFilter.pipe';
// import { CompanieDetailUsersComponent} from './companie/companieDetailUsers.component';
// import { CompaniePicturesComponent} from './companie/companiePictures.component';
// import { CompaniesComponent} from './admin/companie/companies.component';
// import { CompanieComponent} from './companie/companie.component';
// import { EditCompanieComponent} from './companie/editCompanie.component';
// import { EditAddUserToCompanieComponent} from './companie/addUser/editAddUserToCompanie.component';
// import { CompanieDetailComponent} from './companie/companieDetail.component';
// import { CompanieService} from './companie/companie.service';
//
import { ResetPasswordComponent } from './user/accountRecover/resetPassword.component';
import { ForgetPasswordComponent } from './user/accountRecover/forgetPassword.component';
import { FormService } from './form/form.service';
import { ErrorPageComponent } from './errorPage/errorPage.component';
import { AdminUsersComponent } from './admin/user/adminUsers.component';
import { AdminService } from './admin/services/admin.service';
import { EditOptionsComponentDialog } from './modalLibrary/modalLibrary.component';
import { AdminGuardService } from './admin/services/adminGuard';
import { AdminComponent } from './admin/admin.component';
import { UserProfileSettingsComponent } from './user/profile/userProfileSettings.component';
import { UserProfilePicturesComponent } from './user/profile/userProfilePictures.component';
import { UserProfileComponent } from './user/profile/userProfile.component';
import { ProfileService } from './user/profile/profile.service';
import { ChangePasswordComponent } from './user/profile/changePassword/changePassword.component';
import { UserFormsComponent } from './form/userForms.component';
import { UserFormsUploadAndList } from './form/userFormsUploadAndList.component';
export function authHttpServiceFactory(http, options) {
    return new AuthHttp(new AuthConfig({}), http, options);
}
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    NgModule({
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
            UsersComponent,
            UserComponent,
            NewUserComponent,
            SingleUserComponent,
            AddNoteComponent,
            ChooseDateComponent,
            UserPicturesComponent,
            RegisterComponent,
            LoginComponent,
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
            ResetPasswordComponent,
            ForgetPasswordComponent,
            UserFormsComponent,
            UserFormsUploadAndList,
            ErrorPageComponent,
            AdminUsersComponent,
            EditOptionsComponentDialog,
            AdminComponent,
            UserProfileComponent,
            UserProfilePicturesComponent,
            UserProfileSettingsComponent,
            ChangePasswordComponent,
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
            VideoModule,
            ProductModule,
            CompanieModule,
            ProductBatchModule,
        ],
        providers: [
            AuthGuardService,
            { provide: LocationStrategy, useClass: HashLocationStrategy },
            AuthService,
            ErrorService,
            //    CompanieService,
            //VideoService,
            MainPageHomeService,
            PressService,
            FormService,
            AdminService,
            UserService,
            //  ProductService,
            PromotionService,
            AdminGuardService,
            ProfileService,
            {
                provide: AuthHttp,
                useFactory: authHttpServiceFactory,
                deps: [Http, RequestOptions]
            },
            { provide: ToastOptions, useClass: CustomOption },
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
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map