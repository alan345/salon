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
import { AuthService } from '../auth/auth.service';
import { CompanieService } from './companie.service';
import { Companie } from './companie.model';
import { ToastsManager } from 'ng2-toastr';
import { MdDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { AdminService } from '../admin/services/admin.service';
var CompanieDetailUsersComponent = (function () {
    function CompanieDetailUsersComponent(companieService, adminService, 
        //    private modalService: NgbModal,
        toastr, dialog, router, location, activatedRoute, _fb, authService) {
        this.companieService = companieService;
        this.adminService = adminService;
        this.toastr = toastr;
        this.dialog = dialog;
        this.router = router;
        this.location = location;
        this.activatedRoute = activatedRoute;
        this._fb = _fb;
        this.authService = authService;
        this.maxPictureToShow = 3;
        //  users : User[] = []
        this.fetchedCompanies = [];
        this.search = {
            orderBy: '-client',
            search: '',
            parentUser: '',
            role: '',
            onlyMyUsers: true,
        };
        this.companieIdToSelect = '';
        this.fetchedCompanie = new Companie();
    }
    CompanieDetailUsersComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRoute.params.subscribe(function (params) {
            _this.myForm = _this._fb.group({
                forms: _this._fb.array([])
            });
            if (params['id'])
                _this.getCompanie(params['id']);
        });
        //let userId = this.authService.currentUser.userId
        //this.companieService.getCompanieByUserId(userId)
        this.companieService.getCompanieForCurrentUser()
            .subscribe((function (data) {
            _this.fetchedCompanies = data;
        }));
    };
    CompanieDetailUsersComponent.prototype.goBack = function () {
        this.location.back();
    };
    CompanieDetailUsersComponent.prototype.onChangeCompanie = function (event) {
        this.router.navigate(['companie/' + event + "/users"]);
    };
    CompanieDetailUsersComponent.prototype.searchInput = function () {
    };
    CompanieDetailUsersComponent.prototype.orderBy = function (orderBy) {
        this.search.orderBy = orderBy;
        //this.getCompanie(this.fetchedCompanie._id)
    };
    CompanieDetailUsersComponent.prototype.save = function () {
        var _this = this;
        this.companieService.updateCompanie(this.fetchedCompanie)
            .subscribe(function (res) {
            _this.toastr.success('Great!', res.message);
        }, function (error) { console.log(error); });
    };
    CompanieDetailUsersComponent.prototype.getCompanie = function (id) {
        var _this = this;
        this.companieService.getCompanie(id, this.search)
            .subscribe(function (res) {
            _this.fetchedCompanie = res;
            _this.companieIdToSelect = _this.fetchedCompanie._id;
            // this.fetchedCompanie._users.forEach((user) => {
            //   if(user.role[0] === 'salesRep')
            //     this.users.push(user)
            // })
            // this.fetchedCompanie.forms.forEach((form: Form) => {
            //   this.addForm(form)
            // })
        }, function (error) {
            console.log(error);
        });
    };
    CompanieDetailUsersComponent.prototype.showColumnStylist = function () {
        if (this.isAdmin() || this.isSalesRep() || this.isManager())
            return true;
        return false;
    };
    CompanieDetailUsersComponent.prototype.isAdmin = function () {
        return this.authService.isAdmin();
    };
    CompanieDetailUsersComponent.prototype.isStylist = function () {
        return this.authService.isStylist();
    };
    CompanieDetailUsersComponent.prototype.isSalesRep = function () {
        return this.authService.isSalesRep();
    };
    CompanieDetailUsersComponent.prototype.isManager = function () {
        return this.authService.isManager();
    };
    return CompanieDetailUsersComponent;
}());
CompanieDetailUsersComponent = __decorate([
    Component({
        selector: 'app-companie',
        templateUrl: './companieDetailUsers.component.html',
        styleUrls: ['./companie.component.css'],
    }),
    __metadata("design:paramtypes", [CompanieService,
        AdminService,
        ToastsManager,
        MdDialog,
        Router,
        Location,
        ActivatedRoute,
        FormBuilder,
        AuthService])
], CompanieDetailUsersComponent);
export { CompanieDetailUsersComponent };
//# sourceMappingURL=companieDetailUsers.component.js.map