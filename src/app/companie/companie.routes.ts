import {Routes} from '@angular/router';

import {AuthGuardService} from '../auth/authguard.service';

import {AppComponent} from '../app.component';

//import {CompaniesComponent} from './companies.component';
import {CompanieDetailComponent} from './companieDetail.component';
import {EditCompanieComponent} from './editCompanie.component';
import {EditAddUserToCompanieComponent} from './editAddUserToCompanie.component';
import {CompaniePicturesComponent} from './companiePictures.component';
import {AdminGuardService} from '../admin/services/adminGuard';
import {CompanieDetailUsersComponent} from './companieDetailUsers.component';



export const USER_COMPANIES: Routes = [

  //{path: '', component: CompaniesComponent},

  {path: 'edit/addUser/:id', component: EditAddUserToCompanieComponent},
  {path: 'new', component: EditCompanieComponent, canActivate: [AdminGuardService]},
  {path: 'edit/:id', component: EditCompanieComponent},
  {path: ':id/companiePictures', component: CompaniePicturesComponent},
  {path: ':id', component: CompanieDetailComponent},
  {path: ':id/users', component: CompanieDetailUsersComponent},

];
