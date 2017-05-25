var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CompanieFilterPipe } from './companieFilter.pipe';
import { CompanieDetailUsersComponent } from './companieDetailUsers.component';
import { CompaniePicturesComponent } from './companiePictures.component';
import { AddUserByCompanieComponent } from './addUser/addUserByCompanie.component';
import { CompaniesComponent } from './admin/companies.component';
import { CompanieComponent } from './companie.component';
import { EditCompanieComponent } from './editCompanie.component';
import { EditAddUserToCompanieComponent } from './addUser/editAddUserToCompanie.component';
import { CompanieDetailComponent } from './companieDetail.component';
import { CompanieService } from './companie.service';
import { CompanieRouting } from './companieRouting.module';
import { MaterialModule } from '@angular/material';
import { Ng2PaginationModule } from 'ng2-pagination';
var CompanieModule = (function () {
    function CompanieModule() {
    }
    return CompanieModule;
}());
CompanieModule = __decorate([
    NgModule({
        imports: [
            //    VideoRouting,
            CompanieRouting,
            CommonModule,
            FormsModule,
            MaterialModule,
            Ng2PaginationModule,
            ReactiveFormsModule,
            RouterModule,
        ],
        declarations: [
            CompanieDetailUsersComponent,
            CompaniePicturesComponent,
            CompaniesComponent,
            CompanieComponent,
            EditCompanieComponent,
            EditAddUserToCompanieComponent,
            CompanieDetailComponent,
            CompanieFilterPipe,
            AddUserByCompanieComponent,
        ],
        exports: [],
        providers: [CompanieService],
        entryComponents: []
    })
], CompanieModule);
export { CompanieModule };
//# sourceMappingURL=companie.module.js.map