import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {USER_ROUTES} from './user/user.routes';
import {ADMIN_ROUTES} from './admin/admin.routes';
import {UserComponent} from './user/user.component';
import {FormComponent} from './form/form.component';
import {AuthGuardService} from './auth/authguard.service';
import {MainPageComponent} from './mainPage/mainPage.component';

import {CompaniesComponent} from './companie/companies.component';
import {CompanieDetailComponent} from './companie/companieDetail.component';
import {EditCompanieComponent} from './companie/editCompanie.component';


import {MapComponent} from './map/map.component';

import {AdminComponent} from './admin/admin.component';
import {ErrorPageComponent} from './errorPage/errorPage.component';
import {AdminGuardService} from './admin/services/adminGuard';

const APP_ROUTES: Routes = [
  {path: '', component: MainPageComponent, pathMatch: 'full'},
  {path: 'companie', component: CompaniesComponent, pathMatch: 'full'},
  {path: 'companie/:id', component: CompanieDetailComponent},
  {path: 'companie/edit/:id', component: EditCompanieComponent},
  {path: 'map', component: MapComponent, pathMatch: 'full'},
  {path: 'user', component: UserComponent, children: USER_ROUTES},
  {path: 'form', component: FormComponent, canActivate: [AuthGuardService]},
  {path: 'admin', component: AdminComponent, children: ADMIN_ROUTES, canActivate: [AdminGuardService]},
  {path: '404', component: ErrorPageComponent},
  {path: '**', redirectTo: '404'}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);
