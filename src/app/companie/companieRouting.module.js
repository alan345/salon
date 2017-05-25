var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CompanieDetailComponent } from './companieDetail.component';
import { EditCompanieComponent } from './editCompanie.component';
import { EditAddUserToCompanieComponent } from './addUser/editAddUserToCompanie.component';
import { CompaniePicturesComponent } from './companiePictures.component';
import { AdminGuardService } from '../admin/services/adminGuard';
import { CompanieDetailUsersComponent } from './companieDetailUsers.component';
import { CompaniesComponent } from './admin/companies.component';
import { AddUserByCompanieComponent } from './addUser/addUserByCompanie.component';
export var routes = [
    { path: 'admin', component: CompaniesComponent, canActivate: [AdminGuardService] },
    { path: 'edit/addUser/:id', component: EditAddUserToCompanieComponent },
    { path: 'addUserByCompanie', component: AddUserByCompanieComponent },
    { path: 'new', component: EditCompanieComponent, canActivate: [AdminGuardService] },
    { path: 'edit/:id', component: EditCompanieComponent },
    { path: ':id/companiePictures', component: CompaniePicturesComponent },
    { path: ':id', component: CompanieDetailComponent },
    { path: ':id/users', component: CompanieDetailUsersComponent },
];
var CompanieRouting = (function () {
    function CompanieRouting() {
    }
    return CompanieRouting;
}());
CompanieRouting = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], CompanieRouting);
export { CompanieRouting };
//# sourceMappingURL=companieRouting.module.js.map