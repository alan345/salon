import {Routes} from '@angular/router';

import {AuthGuardService} from '../auth/authguard.service';

import {AppComponent} from '../app.component';

import {PressesComponent} from './presses.component';
import {PressSingleComponent} from './pressSingle.component';
//import {NewPressComponent} from './newPress.component';





export const USER_PRESSES: Routes = [
  {path: '', component: PressesComponent},
  {path: 'pressSingle', component: PressSingleComponent},
  {path: 'pressSingle/:id', component: PressSingleComponent},
  {path: ':id', component: PressSingleComponent},
];
