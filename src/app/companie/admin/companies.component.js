var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { CompanieService } from '../../companie/companie.service';
import { ToastsManager } from 'ng2-toastr';
import { MdDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
var CompaniesComponent = (function () {
    function CompaniesComponent(companieService, authService, 
        //  private modalService: NgbModal,
        toastr, dialog, router, location) {
        this.companieService = companieService;
        this.authService = authService;
        this.toastr = toastr;
        this.dialog = dialog;
        this.router = router;
        this.location = location;
        this.fetchedCompanies = [];
        this.paginationData = {
            currentPage: 1,
            itemsPerPage: 0,
            totalItems: 0
        };
        this.search = {
            orderBy: '',
            search: '',
            companieType: '',
        };
    }
    CompaniesComponent.prototype.ngOnInit = function () {
        this.search.orderBy = 'name';
        this.getCompanies(this.paginationData.currentPage, this.search);
    };
    CompaniesComponent.prototype.openDialog = function () {
    };
    CompaniesComponent.prototype.goBack = function () {
        this.location.back();
    };
    CompaniesComponent.prototype.searchInput = function () {
        this.getCompanies(this.paginationData.currentPage, this.search);
    };
    CompaniesComponent.prototype.orderBy = function (orderBy) {
        this.search.orderBy = orderBy;
        this.getCompanies(this.paginationData.currentPage, this.search);
    };
    CompaniesComponent.prototype.onDelete = function (id) {
        var _this = this;
        this.companieService.deleteCompanie(id)
            .subscribe(function (res) {
            _this.toastr.success('Great!', res.message);
            console.log(res);
        }, function (error) {
            console.log(error);
        });
    };
    CompaniesComponent.prototype.getPage = function (page) {
        this.loading = true;
        this.getCompanies(page, this.search);
    };
    CompaniesComponent.prototype.getCompanies = function (page, search) {
        var _this = this;
        this.companieService.getCompanies(page, search)
            .subscribe(function (res) {
            //  console.log("companies");
            //  console.log(res);
            _this.paginationData = res.paginationData;
            _this.fetchedCompanies = res.data;
            _this.loading = false;
        }, function (error) {
            console.log(error);
        });
    };
    CompaniesComponent.prototype.isAdmin = function () {
        return this.authService.isAdmin();
    };
    CompaniesComponent.prototype.isStylist = function () {
        return this.authService.isStylist();
    };
    CompaniesComponent.prototype.isSalesRep = function () {
        return this.authService.isSalesRep();
    };
    CompaniesComponent.prototype.isManager = function () {
        return this.authService.isManager();
    };
    return CompaniesComponent;
}());
CompaniesComponent = __decorate([
    Component({
        selector: 'app-companie',
        templateUrl: './companies.component.html',
        styleUrls: ['../../admin/admin.component.css'],
    }),
    __metadata("design:paramtypes", [CompanieService,
        AuthService,
        ToastsManager,
        MdDialog,
        Router,
        Location])
], CompaniesComponent);
export { CompaniesComponent };
//# sourceMappingURL=companies.component.js.map