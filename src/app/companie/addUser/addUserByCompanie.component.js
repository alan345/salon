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
import { CompanieService } from '../companie.service';
import { Companie } from '../companie.model';
import { User } from '../../user/user.model';
import { ToastsManager } from 'ng2-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../user/user.service';
var AddUserByCompanieComponent = (function () {
    function AddUserByCompanieComponent(router, userService, companieService, toastr, _fb, activatedRoute, location, authService) {
        this.router = router;
        this.userService = userService;
        this.companieService = companieService;
        this.toastr = toastr;
        this._fb = _fb;
        this.activatedRoute = activatedRoute;
        this.location = location;
        this.authService = authService;
        this.fetchedCompanie = new Companie();
        this.search = {
            search: '',
        };
        this.fetchedUser = new User();
        this.filteredUsers = [];
        this.link = '';
        this.userAdmins = [];
        this.usersSalesRep = [];
        this.userClients = [];
        this.userStylists = [];
        this.userManagers = [];
        this.userToSendMail = [];
    }
    AddUserByCompanieComponent.prototype.ngOnInit = function () {
        this.getUser(this.authService.currentUser.userId);
        this.myForm = this._fb.group({
            lastVisit: [''],
            _id: [''],
            role: this._fb.array([]),
            email: [{ value: '', disabled: true }],
            profile: this._fb.group({
                phoneNumber: [''],
                title: ['', [Validators.required, Validators.minLength(2)]],
                name: ['', [Validators.required, Validators.minLength(2)]],
                lastName: ['', [Validators.required, Validators.minLength(2)]],
            })
        });
    };
    AddUserByCompanieComponent.prototype.getUser = function (id) {
        var _this = this;
        this.userService.getUser(id)
            .subscribe(function (res) {
            _this.fetchedUser = res.user;
        }, function (error) {
            console.log(error);
        });
    };
    AddUserByCompanieComponent.prototype.searchCompanie = function () {
        var _this = this;
        if (this.search.search) {
            this.companieService.getCompanies(1, this.search)
                .subscribe(function (res) {
                if (res.data.length) {
                    _this.fetchedCompanie = res.data[0];
                    var this2_1 = _this;
                    _this.fetchedCompanie._users.forEach(function (user) {
                        if (user.role[0] === 'admin')
                            this2_1.userAdmins.push(user);
                        if (user.role[0] === 'salesRep')
                            this2_1.usersSalesRep.push(user);
                        if (user.role[0] === 'client')
                            this2_1.userClients.push(user);
                        if (user.role[0] === 'stylist')
                            this2_1.userStylists.push(user);
                        if (user.role[0] === 'manager')
                            this2_1.userManagers.push(user);
                    });
                }
                else {
                    _this.toastr.error('error! No Salon Founded');
                }
            }, function (error) {
                console.log(error);
            });
        }
    };
    AddUserByCompanieComponent.prototype.requestAddUserToComp = function () {
        var _this = this;
        this.toastr.success('Great!', 'Request has been sent');
        this.link = window.location.origin + "#/companie/edit/addUser/" + this.fetchedCompanie._id + '/' + this.fetchedUser.email;
        this.userAdmins.forEach(function (user) { _this.userToSendMail.push(user); });
        this.usersSalesRep.forEach(function (user) { _this.userToSendMail.push(user); });
        //  this.userClients.forEach((user: User) => { this.userToSendMail.push(user)})
        //  this.userStylists.forEach((user: User) => { this.userToSendMail.push(user)})
        this.userManagers.forEach(function (user) { _this.userToSendMail.push(user); });
    };
    AddUserByCompanieComponent.prototype.goBack = function () {
        this.location.back();
    };
    AddUserByCompanieComponent.prototype.isAdmin = function () {
        return this.authService.isAdmin();
    };
    AddUserByCompanieComponent.prototype.isStylist = function () {
        return this.authService.isStylist();
    };
    AddUserByCompanieComponent.prototype.isSalesRep = function () {
        return this.authService.isSalesRep();
    };
    AddUserByCompanieComponent.prototype.isManager = function () {
        return this.authService.isManager();
    };
    return AddUserByCompanieComponent;
}());
AddUserByCompanieComponent = __decorate([
    Component({
        selector: 'addUserByCompanie',
        templateUrl: './addUserByCompanie.component.html',
        styleUrls: ['../companie.component.css'],
    }),
    __metadata("design:paramtypes", [Router,
        UserService,
        CompanieService,
        ToastsManager,
        FormBuilder,
        ActivatedRoute,
        Location,
        AuthService])
], AddUserByCompanieComponent);
export { AddUserByCompanieComponent };
//# sourceMappingURL=addUserByCompanie.component.js.map