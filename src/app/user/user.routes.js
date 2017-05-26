import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './accountRecover/resetPassword.component';
import { ForgetPasswordComponent } from './accountRecover/forgetPassword.component';
import { UserFormsComponent } from '../form/userForms.component';
import { AuthGuardService } from '../auth/authguard.service';
// import {AppComponent} from '../app.component';
import { UserProfileComponent } from './profile/userProfile.component';
import { UserProfilePicturesComponent } from './profile/userProfilePictures.component';
import { UserProfileSettingsComponent } from './profile/userProfileSettings.component';
import { ChangePasswordComponent } from './profile/changePassword/changePassword.component';
import { UsersComponent } from './users/users.component';
import { SingleUserComponent } from './users/singleUser.component';
import { AddNoteComponent } from './users/addNote.component';
import { ChooseDateComponent } from './users/chooseDate.component';
import { UserPicturesComponent } from './users/userPictures.component';
import { NewUserComponent } from './users/newUser.component';
export var USER_ROUTES = [
    { path: '', component: UsersComponent },
    { path: 'newuser', component: NewUserComponent },
    { path: 'newuser/:id', component: NewUserComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'reset', component: ForgetPasswordComponent },
    { path: 'reset/:token', component: ResetPasswordComponent },
    { path: 'forms', component: UserFormsComponent, canActivate: [AuthGuardService] },
    { path: 'profile/password', component: ChangePasswordComponent, canActivate: [AuthGuardService] },
    { path: 'profile/:id', component: UserProfileComponent, canActivate: [AuthGuardService] },
    { path: 'profile/:id/userProfileSettings', component: UserProfileSettingsComponent, canActivate: [AuthGuardService] },
    { path: 'profile/:id/userProfilePictures', component: UserProfilePicturesComponent, canActivate: [AuthGuardService] },
    { path: ':id', component: SingleUserComponent },
    { path: ':id/addnote', component: AddNoteComponent },
    { path: ':id/choosedate', component: ChooseDateComponent },
    { path: ':id/userPictures', component: UserPicturesComponent },
];
//# sourceMappingURL=user.routes.js.map