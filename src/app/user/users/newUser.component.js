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
import { UserService } from '../user.service';
import { CompanieService } from '../../companie/companie.service';
import { ToastsManager } from 'ng2-toastr';
import { MdDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { User } from '../user.model';
import { FormBuilder, Validators } from '@angular/forms';
import { DeleteDialog } from '../../deleteDialog/deleteDialog.component';
var NewUserComponent = (function () {
    function NewUserComponent(userService, toastr, dialog, router, location, activatedRoute, _fb, authService, companieService) {
        this.userService = userService;
        this.toastr = toastr;
        this.dialog = dialog;
        this.router = router;
        this.location = location;
        this.activatedRoute = activatedRoute;
        this._fb = _fb;
        this.authService = authService;
        this.companieService = companieService;
        //fetchedUser = new User()
        //fetchedUser : User;
        this.fetchedCompanies = [];
        this.fetchedCompanieInit = {
            _id: '',
            forms: [],
            name: '',
            typeCompanie: '',
            phoneNumber: '',
            address: {
                address: '',
                city: '',
                state: '',
                zip: ''
            },
            _users: []
        };
        this.fetchedCompanieAfter = {
            _id: '',
            forms: [],
            name: '',
            typeCompanie: '',
            phoneNumber: '',
            address: {
                address: '',
                city: '',
                state: '',
                zip: ''
            },
            _users: []
        };
        this.companieIndexToSelect = '';
        this.fetchedUser = new User();
    }
    NewUserComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.myForm = this._fb.group({
            companieIndexToSelect: ['', [Validators.required, Validators.minLength(3)]],
            lastVisit: [''],
            _id: [''],
            email: [this.emailValidator],
            profile: this._fb.group({
                name: ['', [Validators.required, Validators.minLength(3)]],
                phoneNumber: [''],
                // parentUser: this._fb.array([]),
                hair: this._fb.group({
                    hairTexture: ['', Validators.required],
                    hairCondition: ['', Validators.required],
                    scalpCondition: ['', Validators.required],
                })
            })
        });
        // let userId = this.authService.currentUser.userId
        // this.companieService.getCompanieByUserId(userId)
        this.companieService.getCompanieForCurrentUser()
            .subscribe((function (data) {
            _this.fetchedCompanies = data;
            if (_this.fetchedCompanies.length)
                _this.companieIndexToSelect = _this.fetchedCompanies[0]._id;
            // Ok mes tes clients sont dans quel salon? ==> je prends le premier salon qui nest pas HQ
            // if(data.length)
            //   this.fetchedCompanie = data[0]
        }));
        this.activatedRoute.params.subscribe(function (params) {
            if (params['id']) {
                _this.companieService.getCompanieByUserId(params['id']).subscribe(function (res) {
                    console.log(res);
                    if (res.length) {
                        _this.fetchedCompanieInit = res[0];
                        _this.companieIndexToSelect = _this.fetchedCompanieInit._id;
                    }
                }, function (error) { console.log(error); });
                _this.getUser(params['id']);
            }
        });
    };
    NewUserComponent.prototype.emailValidator = function (control) {
        var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
        if (!EMAIL_REGEXP.test(control.value)) {
            return { invalidEmail: true };
        }
    };
    NewUserComponent.prototype.goBack = function () {
        this.location.back();
    };
    NewUserComponent.prototype.openDialogDelete = function () {
        var _this = this;
        var this2 = this;
        var dialogRefDelete = this.dialog.open(DeleteDialog);
        dialogRefDelete.afterClosed().subscribe(function (result) {
            if (result) {
                _this.onDelete(_this.fetchedUser._id).then(function () {
                    this2.router.navigate(['user']);
                });
            }
        });
    };
    NewUserComponent.prototype.save = function (form) {
        var _this = this;
        if (this.fetchedUser._id) {
            this.userService.updateUser(this.fetchedUser)
                .subscribe(function (res) {
                _this.toastr.success('Great!', res.message);
                //this.router.navigate(['user/' + res.obj._id])
                _this.addUserIdToCompanie(res.obj);
            }, function (error) {
                _this.toastr.error('Error!');
                console.log(error);
            });
        }
        else {
            this.fetchedUser.role = ['client'];
            this.userService.saveUser(this.fetchedUser)
                .subscribe(function (res) {
                _this.toastr.success('Great!', res.message);
                //this.router.navigate(['user/' + res.obj._id])
                _this.addUserIdToCompanie(res.obj);
                //this.router.navigate(['user'])
            }, function (error) {
                console.log(error);
                _this.toastr.error('Error!');
            });
        }
    };
    NewUserComponent.prototype.addUserIdToCompanie = function (user) {
        //  console.log(this.fetchedCompanieInit)
        //  console.log(this.fetchedCompanieAfter)
        //let companieToUpdate = {}
        var _this = this;
        if (this.fetchedCompanieInit._id !== this.fetchedCompanieAfter._id) {
            this.fetchedCompanieInit._users.forEach(function (userInit, index) {
                if (userInit._id === _this.fetchedUser._id) {
                    delete _this.fetchedCompanieInit._users[index];
                    _this.companieService.updateCompanie(_this.fetchedCompanieInit)
                        .subscribe(function (res) {
                        //console.log('User removed from previous companie' + this.fetchedCompanieInit.name)
                        //this.onPassForm.emit();
                        _this.toastr.success('Great!', 'User removed from previous companie' + _this.fetchedCompanieInit.name);
                        //this.router.navigate(['companie/' + this.fetchedCompanie._id]);
                    }, function (error) { console.log(error); });
                }
            });
        }
        this.fetchedCompanies.forEach(function (companie, index) {
            if (companie._id == _this.companieIndexToSelect) {
                _this.fetchedCompanieAfter = _this.fetchedCompanies[index];
            }
        });
        var okAddUserToCompanie = true;
        this.fetchedCompanieAfter._users.forEach(function (userFetch) {
            if (userFetch._id === user._id) {
                okAddUserToCompanie = false;
            }
        });
        if (!okAddUserToCompanie) {
            console.log('error! user already exists in salon');
            //this.toastr.error('error! user already exists in salon')
            this.goBack();
            //this.router.navigate(['companie/' + this.fetchedCompanieAfter._id]);
            //this.navigate(this.fetchedCompanie._id)
        }
        else {
            this.fetchedCompanieAfter._users.push(user);
            this.companieService.updateCompanie(this.fetchedCompanieAfter)
                .subscribe(function (res) {
                //this.onPassForm.emit();
                _this.toastr.success('Great!', res.message);
                //this.router.navigate(['companie/' + this.fetchedCompanie._id]);
                _this.goBack();
                //this.navigate(user._id)
            }, function (error) { console.log(error); });
        }
    };
    NewUserComponent.prototype.navigate = function (id) {
        this.router.navigate(['user/' + id]);
    };
    NewUserComponent.prototype.getUser = function (id) {
        var _this = this;
        this.userService.getUser(id)
            .subscribe(function (res) {
            _this.fetchedUser = res.user;
        }, function (error) {
            console.log(error);
        });
    };
    NewUserComponent.prototype.onDelete = function (id) {
        var this2 = this;
        return new Promise(function (resolve, reject) {
            this2.userService.deleteUser(id)
                .subscribe(function (res) {
                this2.toastr.success('Great!', res.message);
                resolve(res);
            }, function (error) {
                console.log(error);
                reject(error);
            });
        });
    };
    return NewUserComponent;
}());
NewUserComponent = __decorate([
    Component({
        selector: 'app-users',
        templateUrl: './newUser.component.html',
        styleUrls: ['./user.component.css'],
    }),
    __metadata("design:paramtypes", [UserService,
        ToastsManager,
        MdDialog,
        Router,
        Location,
        ActivatedRoute,
        FormBuilder,
        AuthService,
        CompanieService])
], NewUserComponent);
export { NewUserComponent };
//# sourceMappingURL=newUser.component.js.map