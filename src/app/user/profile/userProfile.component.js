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
import { ToastsManager } from 'ng2-toastr';
import { MdDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { EditOptionsComponentDialog } from '../../modalLibrary/modalLibrary.component';
import { FormBuilder, Validators } from '@angular/forms';
import { CompanieService } from '../../companie/companie.service';
import { SubmitPicDialog } from '../../social/submitPicDialog.component';
import { SeePictureDialogComponent } from '../../seePictureDialog/seePictureDialog.component';
var UserProfileComponent = (function () {
    function UserProfileComponent(userService, toastr, dialog, router, location, activatedRoute, _fb, authService, companieService) {
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
        this.isUserBelongToHQ = false;
        this.maxPictureToShow = 3;
        this.instapic = 1;
        this.companies = [];
        this.isEditMode = false;
        this.fetchedUser = {
            _id: '',
            lastVisit: new Date,
            email: '',
            profile: {
                parentUser: [],
                isFeatured: false,
                phoneNumber: '',
                name: '',
                lastName: '',
                title: '',
                _profilePicture: [],
                hair: {
                    hairCondition: 'Normal',
                    scalpCondition: 'Healthy',
                    hairTexture: 'Fine',
                }
            },
            notes: [],
            forms: [],
            role: [],
        };
    }
    UserProfileComponent.prototype.getObjects = function (myForm) {
        return myForm.get('forms').controls;
    };
    UserProfileComponent.prototype.editMode = function () {
        this.isEditMode = !this.isEditMode;
    };
    UserProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.myForm = this._fb.group({
            lastVisit: [''],
            profile: this._fb.group({
                _profilePicture: this._fb.group({
                    _id: ['', [Validators.required, Validators.minLength(5)]]
                }),
                name: ['', [Validators.required, Validators.minLength(2)]],
                lastName: ['', [Validators.required, Validators.minLength(2)]],
                title: ['', [Validators.required, Validators.minLength(2)]]
            }),
            forms: this._fb.array([])
        });
        //let userId = this.authService.currentUser.userId
        this.activatedRoute.params.subscribe(function (params) {
            var userId = params['id'];
            _this.getUser(userId);
            _this.companieService.getCompanieByUserId(userId)
                .subscribe((function (data) {
                _this.companies = data;
                _this.companies.forEach(function (companie) {
                    if (_this.isHQcompanie(companie))
                        _this.isUserBelongToHQ = true;
                });
            }));
        });
    };
    UserProfileComponent.prototype.getUser = function (id) {
        var _this = this;
        this.userService.getUser(id)
            .subscribe(function (res) {
            _this.fetchedUser = res.user;
            _this.fetchedUser.forms.forEach(function (form) {
                _this.addForm(form);
            });
        }, function (error) {
            console.log(error);
        });
    };
    UserProfileComponent.prototype.removeForm = function (i) {
        this.fetchedUser.forms.splice(i, 1);
        var control = this.myForm.controls['forms'];
        control.removeAt(i);
        this.save();
    };
    UserProfileComponent.prototype.addForm = function (form) {
        var control = this.myForm.controls['forms'];
        var addrCtrl = this._fb.group({});
        control.push(addrCtrl);
    };
    UserProfileComponent.prototype.goBack = function () {
        this.location.back();
    };
    UserProfileComponent.prototype.seeAllPicture = function () {
        this.router.navigate(['user/profile/' + this.fetchedUser._id + "/userProfilePictures"]);
    };
    UserProfileComponent.prototype.openPictureDialog = function (form) {
        var dialogRef = this.dialog.open(SeePictureDialogComponent);
        dialogRef.componentInstance.form = form;
        dialogRef.afterClosed().subscribe(function (result) {
        });
    };
    UserProfileComponent.prototype.openDialogSocial = function () {
        var dialogRef = this.dialog.open(SubmitPicDialog);
        dialogRef.afterClosed().subscribe(function (result) {
        });
    };
    UserProfileComponent.prototype.openDialog = function (positionImage) {
        var _this = this;
        if (positionImage == '_profilePicture') {
            var dialogRef = this.dialog.open(EditOptionsComponentDialog);
            dialogRef.afterClosed().subscribe(function (result) {
                if (result) {
                    if (result.type === 'pdf') {
                        _this.toastr.error('No pdf!');
                    }
                    else {
                        _this.fetchedUser.profile._profilePicture[0] = result;
                        _this.save();
                    }
                }
            });
        }
        else {
            var dialogRef = this.dialog.open(EditOptionsComponentDialog);
            dialogRef.afterClosed().subscribe(function (result) {
                if (result) {
                    if (result.type === 'pdf') {
                        _this.toastr.error('No pdf!');
                    }
                    else {
                        _this.addForm(result);
                        _this.fetchedUser.forms.unshift(result);
                        _this.save();
                    }
                }
            });
        }
    };
    UserProfileComponent.prototype.save = function () {
        var _this = this;
        this.isEditMode = false;
        this.userService.updateUser(this.fetchedUser)
            .subscribe(function (res) {
            _this.toastr.success('Great!', res.message);
        }, function (error) { console.log(error); });
    };
    UserProfileComponent.prototype.setDateToday = function () {
        var _this = this;
        this.fetchedUser.lastVisit = new Date();
        this.userService.updateUser(this.fetchedUser)
            .subscribe(function (res) {
            _this.toastr.success('Great!', res.message);
        }, function (error) { console.log(error); });
    };
    UserProfileComponent.prototype.toggleFeature = function () {
        this.fetchedUser.profile.isFeatured = !this.fetchedUser.profile.isFeatured;
        this.save();
    };
    UserProfileComponent.prototype.isAdmin = function () {
        return this.authService.isAdmin();
    };
    UserProfileComponent.prototype.isMyProfile = function () {
        if (this.fetchedUser._id === this.authService.currentUser.userId)
            return true;
        return false;
    };
    UserProfileComponent.prototype.onDelete = function (id) {
        var _this = this;
        this.userService.deleteUser(id)
            .subscribe(function (res) {
            _this.toastr.success('Great!', res.message);
        }, function (error) {
            console.log(error);
        });
    };
    UserProfileComponent.prototype.isHQcompanie = function (companie) {
        if (companie.typeCompanie === 'HQ')
            return true;
        return false;
    };
    return UserProfileComponent;
}());
UserProfileComponent = __decorate([
    Component({
        selector: 'app-users',
        templateUrl: './userProfile.component.html',
        styleUrls: ['./userProfile.component.css'],
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
], UserProfileComponent);
export { UserProfileComponent };
//# sourceMappingURL=userProfile.component.js.map