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
        // fetchedCompanie: Companie = {
        //   _id: '',
        //   forms:[],
        //   name: '',
        //   typeCompanie: '',
        //   phoneNumber: '',
        //   address: {
        //     address : '',
        //     city :  '',
        //     state :  '',
        //     zip :  ''
        //   },
        //   _users:[]
        // }
        this.search = {
            search: '',
        };
        this.fetchedUser = new User();
        this.filteredUsers = [];
    }
    AddUserByCompanieComponent.prototype.ngOnInit = function () {
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
    AddUserByCompanieComponent.prototype.searchCompanie = function () {
        var _this = this;
        if (this.search.search) {
            this.companieService.getCompanies(1, this.search)
                .subscribe(function (res) {
                if (res.data.length) {
                    _this.fetchedCompanie = res.data[0];
                }
                else {
                    _this.fetchedCompanie = new Companie();
                }
            }, function (error) {
                console.log(error);
            });
            // this.companieService.getUsersByEmail(this.search)
            //   .subscribe(
            //     res => {
            //       this.filteredUsers = res.data
            //       if(res.data.length) {
            //         if(res.data[0].email === this.search.email) {
            //           this.userFounded(0)
            //         } else {
            //           this.initFormNewUser()
            //         }
            //       } else {
            //         this.initFormNewUser()
            //       }
            //
            //     },
            //     error => {
            //       console.log(error);
            //     }
            //   )
        }
    };
    AddUserByCompanieComponent.prototype.initFormNewUser = function () {
        // this.fetchedUser.email = this.search.email
        // this.fetchedUser.role.forEach((role) => {
        //   this.addRole(role)
        // })
    };
    AddUserByCompanieComponent.prototype.userFounded = function (i) {
        var _this = this;
        this.fetchedUser = this.filteredUsers[i];
        //this.fetchedUser
        this.fetchedUser.role.forEach(function (role) {
            _this.addRole(role);
        });
        this.filteredUsers = [];
    };
    AddUserByCompanieComponent.prototype.addRole = function (role) {
        var control = this.myForm.controls['role'];
        var addrCtrl = this._fb.group({
            role: ['']
        });
        control.push(addrCtrl);
    };
    AddUserByCompanieComponent.prototype.save = function (form) {
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
    AddUserByCompanieComponent.prototype.addUserIdToCompanie = function (user) {
        var _this = this;
        var okAddUserToCompanie = true;
        this.fetchedCompanie._users.forEach(function (userFetch) {
            if (userFetch._id === user._id) {
                okAddUserToCompanie = false;
            }
        });
        if (!okAddUserToCompanie) {
            this.toastr.error('error! user already exists in salon');
            this.router.navigate(['companie/' + this.fetchedCompanie._id]);
        }
        else {
            this.fetchedCompanie._users.push(user);
            this.companieService.updateCompanie(this.fetchedCompanie)
                .subscribe(function (res) {
                //this.onPassForm.emit();
                _this.toastr.success('Great!', res.message);
                _this.router.navigate(['companie/' + _this.fetchedCompanie._id]);
            }, function (error) { console.log(error); });
        }
    };
    AddUserByCompanieComponent.prototype.getObjects = function (myForm) {
        return myForm.get('profile').get('parentUser').controls;
    };
    AddUserByCompanieComponent.prototype.getObjectsRole = function (myForm) {
        return myForm.get('role').controls;
    };
    AddUserByCompanieComponent.prototype.getCompanie = function (id) {
        var _this = this;
        this.companieService.getCompanie(id, {})
            .subscribe(function (res) {
            _this.fetchedCompanie = res;
        }, function (error) {
            console.log(error);
        });
    };
    AddUserByCompanieComponent.prototype.onDelete = function (id) {
        var _this = this;
        this.companieService.deleteCompanie(id)
            .subscribe(function (res) {
            _this.toastr.success('Great!', res.message);
            console.log(res);
        }, function (error) {
            console.log(error);
        });
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