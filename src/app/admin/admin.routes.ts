import {Routes} from '@angular/router';
import {AdminGuardService} from './services/adminGuard';
import {EditUsersFormsComponent} from './editUsersForms/editUsersForms.component';
import {EditOptionsComponent} from './editOptions/editOptions.component';
import {AdminUsersComponent} from './user/adminUsers.component';
import {CompaniesComponent} from './companie/companies.component';



import {AdminPageComponent} from './adminPage/adminPage.component';

export const ADMIN_ROUTES: Routes = [
  {path: '', component: AdminPageComponent, canActivate: [AdminGuardService]},
  {path: 'edit/:id', component: EditUsersFormsComponent, canActivate: [AdminGuardService]},
  {path: 'options', component: EditOptionsComponent, canActivate: [AdminGuardService]},
  {path: 'user', component: AdminUsersComponent, canActivate: [AdminGuardService]},
  {path: 'companie', component: CompaniesComponent},
];
