import {Routes} from '@angular/router';

import {AuthGuardService} from '../auth/authguard.service';

import {AppComponent} from '../app.component';

import {SocialsComponent} from './socials.component';
import {SingleSocialComponent} from './singleSocial.component';
//import {NewSocialComponent} from './newSocial.component';




export const SOCIAL: Routes = [
  {path: '', component: SocialsComponent},
  {path: 'singlesocial', component: SingleSocialComponent},
  {path: 'singlesocial/:id', component: SingleSocialComponent},
  {path: ':id', component: SingleSocialComponent},
];
