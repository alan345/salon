/**
 * @fileoverview This file is generated by the Angular template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride}
 */
 /* tslint:disable */


import * as import0 from '@angular/core';
import * as import1 from '../../../../src/app/companie/companieRouting.module';
import * as import2 from '@angular/router';
import * as import3 from './admin/companies.component.ngfactory';
import * as import4 from './addUser/editAddUserToCompanie.component.ngfactory';
import * as import5 from './addUser/addUserByCompanie.component.ngfactory';
import * as import6 from './editCompanie.component.ngfactory';
import * as import7 from './companiePictures.component.ngfactory';
import * as import8 from './companieDetail.component.ngfactory';
import * as import9 from './companieDetailUsers.component.ngfactory';
import * as import10 from '../../../../src/app/companie/admin/companies.component';
import * as import11 from '../../../../src/app/admin/services/adminGuard';
import * as import12 from '../../../../src/app/companie/addUser/editAddUserToCompanie.component';
import * as import13 from '../../../../src/app/companie/addUser/addUserByCompanie.component';
import * as import14 from '../../../../src/app/companie/editCompanie.component';
import * as import15 from '../../../../src/app/companie/companiePictures.component';
import * as import16 from '../../../../src/app/companie/companieDetail.component';
import * as import17 from '../../../../src/app/companie/companieDetailUsers.component';
class CompanieRoutingInjector extends import0.ɵNgModuleInjector<import1.CompanieRouting> {
  _RouterModule_0:import2.RouterModule;
  _CompanieRouting_1:import1.CompanieRouting;
  _ROUTES_2:any[];
  constructor(parent:import0.Injector) {
    super(parent,[
      import3.CompaniesComponentNgFactory,
      import4.EditAddUserToCompanieComponentNgFactory,
      import5.AddUserByCompanieComponentNgFactory,
      import6.EditCompanieComponentNgFactory,
      import7.CompaniePicturesComponentNgFactory,
      import8.CompanieDetailComponentNgFactory,
      import9.CompanieDetailUsersComponentNgFactory
    ]
    ,([] as any[]));
  }
  createInternal():import1.CompanieRouting {
    this._RouterModule_0 = new import2.RouterModule(this.parent.get(import2.ɵa,(null as any)),this.parent.get(import2.Router,(null as any)));
    this._CompanieRouting_1 = new import1.CompanieRouting();
      this._ROUTES_2 = [[
        {
          path: 'admin',
          component: import10.CompaniesComponent,
          canActivate: [import11.AdminGuardService]
        }
        ,
        {
          path: 'edit/addUser/:id',
          component: import12.EditAddUserToCompanieComponent
        }
        ,
        {
          path: 'edit/addUser/:id/:email',
          component: import12.EditAddUserToCompanieComponent
        }
        ,
        {
          path: 'addUserByCompanie',
          component: import13.AddUserByCompanieComponent
        }
        ,
        {
          path: 'new',
          component: import14.EditCompanieComponent,
          canActivate: [import11.AdminGuardService]
        }
        ,
        {
          path: 'edit/:id',
          component: import14.EditCompanieComponent
        }
        ,
        {
          path: ':id/companiePictures',
          component: import15.CompaniePicturesComponent
        }
        ,
        {
          path: ':id',
          component: import16.CompanieDetailComponent
        }
        ,
        {
          path: ':id/users',
          component: import17.CompanieDetailUsersComponent
        }

      ]
    ];
    return this._CompanieRouting_1;
  }
  getInternal(token:any,notFoundResult:any):any {
    if ((token === import2.RouterModule)) { return this._RouterModule_0; }
    if ((token === import1.CompanieRouting)) { return this._CompanieRouting_1; }
    if ((token === import2.ROUTES)) { return this._ROUTES_2; }
    return notFoundResult;
  }
  destroyInternal():void {
  }
}
export const CompanieRoutingNgFactory:import0.NgModuleFactory<import1.CompanieRouting> = new import0.NgModuleFactory<any>(CompanieRoutingInjector,import1.CompanieRouting);
//# sourceMappingURL=data:application/json;base64,eyJmaWxlIjoiL1VzZXJzL2FsYW4vYXBwL2FsZXMvc2Fsb24vc3JjL2FwcC9jb21wYW5pZS9jb21wYW5pZVJvdXRpbmcubW9kdWxlLm5nZmFjdG9yeS50cyIsInZlcnNpb24iOjMsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm5nOi8vL1VzZXJzL2FsYW4vYXBwL2FsZXMvc2Fsb24vc3JjL2FwcC9jb21wYW5pZS9jb21wYW5pZVJvdXRpbmcubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIiAiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OyJ9