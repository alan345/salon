import {Routes} from '@angular/router';

import {AuthGuardService} from '../auth/authguard.service';

import {AppComponent} from '../app.component';

//import {CompaniesComponent} from './companies.component';
import {CompanieDetailComponent} from './companieDetail.component';
import {EditCompanieComponent} from './editCompanie.component';
import {EditAddUserToCompanieComponent} from './editAddUserToCompanie.component';
import {CompaniePicturesComponent} from './companiePictures.component';





export const USER_COMPANIES: Routes = [

  //{path: '', component: CompaniesComponent},
  {path: ':id', component: CompanieDetailComponent},
  {path: 'edit/addUser/:id', component: EditAddUserToCompanieComponent},
  {path: 'edit/:id', component: EditCompanieComponent},
  {path: ':id/companiePictures', component: CompaniePicturesComponent},
];
