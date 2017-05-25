import { PressesComponent } from './presses.component';
import { PressSingleComponent } from './pressSingle.component';
export var USER_PRESSES = [
    { path: '', component: PressesComponent },
    { path: 'pressSingle', component: PressSingleComponent },
    { path: 'pressSingle/:id', component: PressSingleComponent },
    { path: ':id', component: PressSingleComponent },
];
//# sourceMappingURL=press.routes.js.map