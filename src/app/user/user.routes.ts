import {Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {ResetPasswordComponent} from './accountRecover/resetPassword.component';
import {ForgetPasswordComponent} from './accountRecover/forgetPassword.component';
import {UserFormsComponent} from '../form/userForms.component';
import {AuthGuardService} from '../auth/authguard.service';
import {AppComponent} from '../app.component';
import {UserProfileComponent} from './profile/userProfile.component';
import {ChangePasswordComponent} from './profile/changePassword/changePassword.component';
import {UsersComponent} from './users/users.component';
import {SingleUserComponent} from './users/singleUser.component';
import {AddNoteComponent} from './users/addNote.component';
import {ChooseDateComponent} from './users/chooseDate.component';




import {NewUserComponent} from './users/newUser.component';




export const USER_ROUTES: Routes = [
  {path: '', component: UsersComponent},
  {path: 'newuser', component: NewUserComponent},
  {path: 'newuser/:id', component: NewUserComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'reset', component: ForgetPasswordComponent},
  {path: 'reset/:token', component: ResetPasswordComponent},
  {path: 'forms', component: UserFormsComponent, canActivate: [AuthGuardService]},
  {path: 'profile', component: UserProfileComponent, canActivate: [AuthGuardService]},
  {path: 'profile/password', component: ChangePasswordComponent, canActivate: [AuthGuardService]},
  {path: ':id', component: SingleUserComponent},
  {path: ':id/addnote', component: AddNoteComponent},
  {path: ':id/choosedate', component: ChooseDateComponent},
];
