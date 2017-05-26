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
var EditAddUserToCompanieComponent = (function () {
    function EditAddUserToCompanieComponent(router, userService, companieService, toastr, _fb, activatedRoute, location, authService) {
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
            email: '',
        };
        this.isUserInCompanie = false;
        this.fetchedUser = new User();
        this.filteredUsers = [];
    }
    EditAddUserToCompanieComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRoute.params.subscribe(function (params) {
            if (params['id'])
                _this.getCompanie(params['id']);
            if (params['email']) {
                _this.search.email = params['email'];
                _this.searchEmails();
            }
        });
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
    EditAddUserToCompanieComponent.prototype.searchEmails = function () {
        var _this = this;
        this.filteredUsers = [];
        if (this.search.email) {
            this.userService.getUsersByEmail(this.search)
                .subscribe(function (res) {
                _this.filteredUsers = res.data;
                if (res.data.length) {
                    if (res.data[0].email === _this.search.email) {
                        _this.userFounded(0);
                    }
                    else {
                        _this.initFormNewUser();
                    }
                }
                else {
                    _this.initFormNewUser();
                }
            }, function (error) {
                console.log(error);
            });
        }
    };
    EditAddUserToCompanieComponent.prototype.isUserAlreadyInCompanie = function () {
        var _this = this;
        console.log(this.fetchedCompanie, this.fetchedUser._id);
        this.fetchedCompanie._users.forEach(function (user) {
            if (user._id == _this.fetchedUser._id)
                _this.isUserInCompanie = true;
        });
    };
    EditAddUserToCompanieComponent.prototype.initFormNewUser = function () {
        var _this = this;
        this.fetchedUser.email = this.search.email;
        this.fetchedUser.role.forEach(function (role) {
            _this.addRole(role);
        });
    };
    EditAddUserToCompanieComponent.prototype.userFounded = function (i) {
        var _this = this;
        this.fetchedUser = this.filteredUsers[i];
        this.isUserAlreadyInCompanie();
        //this.fetchedUser
        this.fetchedUser.role.forEach(function (role) {
            _this.addRole(role);
        });
        this.filteredUsers = [];
    };
    EditAddUserToCompanieComponent.prototype.addRole = function (role) {
        var control = this.myForm.controls['role'];
        var addrCtrl = this._fb.group({
            role: ['']
        });
        control.push(addrCtrl);
    };
    EditAddUserToCompanieComponent.prototype.save = function (form) {
        var _this = this;
        if (this.fetchedUser._id) {
            this.userService.updateUser(this.fetchedUser)
                .subscribe(function (res) {
                _this.toastr.success('Great!', res.message);
                _this.addUserIdToCompanie(res.obj);
                //this.addUserIdToCompanie(res.obj)
            }, function (error) { console.log(error); });
        }
        else {
            this.userService.saveUser(this.fetchedUser)
                .subscribe(function (res) {
                _this.toastr.success('Great!', res.message);
                _this.addUserIdToCompanie(res.obj);
            }, function (error) { console.log(error); });
        }
    };
    EditAddUserToCompanieComponent.prototype.addUserIdToCompanie = function (user) {
        var _this = this;
        this.fetchedCompanie._users.push(user);
        this.companieService.updateCompanie(this.fetchedCompanie)
            .subscribe(function (res) {
            //this.onPassForm.emit();
            _this.toastr.success('Great!', res.message);
            _this.router.navigate(['companie/' + _this.fetchedCompanie._id]);
        }, function (error) {
            _this.toastr.error('error! user already exists in salon');
            console.log(error);
        });
        // }
    };
    EditAddUserToCompanieComponent.prototype.getObjects = function (myForm) {
        return myForm.get('profile').get('parentUser').controls;
    };
    EditAddUserToCompanieComponent.prototype.getObjectsRole = function (myForm) {
        return myForm.get('role').controls;
    };
    EditAddUserToCompanieComponent.prototype.getCompanie = function (id) {
        var _this = this;
        this.companieService.getCompanie(id, {})
            .subscribe(function (res) {
            _this.fetchedCompanie = res;
            _this.isUserAlreadyInCompanie();
        }, function (error) {
            console.log(error);
        });
    };
    EditAddUserToCompanieComponent.prototype.onDelete = function (id) {
        var _this = this;
        this.companieService.deleteCompanie(id)
            .subscribe(function (res) {
            _this.toastr.success('Great!', res.message);
            console.log(res);
        }, function (error) {
            console.log(error);
        });
    };
    EditAddUserToCompanieComponent.prototype.goBack = function () {
        this.location.back();
    };
    EditAddUserToCompanieComponent.prototype.isAdmin = function () {
        return this.authService.isAdmin();
    };
    EditAddUserToCompanieComponent.prototype.isStylist = function () {
        return this.authService.isStylist();
    };
    EditAddUserToCompanieComponent.prototype.isSalesRep = function () {
        return this.authService.isSalesRep();
    };
    EditAddUserToCompanieComponent.prototype.isManager = function () {
        return this.authService.isManager();
    };
    return EditAddUserToCompanieComponent;
}());
EditAddUserToCompanieComponent = __decorate([
    Component({
        selector: 'editAddUserToCompanie',
        templateUrl: './editAddUserToCompanie.component.html',
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
], EditAddUserToCompanieComponent);
export { EditAddUserToCompanieComponent };
//# sourceMappingURL=editAddUserToCompanie.component.js.map