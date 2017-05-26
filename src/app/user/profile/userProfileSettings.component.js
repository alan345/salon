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
import { User } from '../user.model';
import { EditOptionsComponentDialog } from '../../modalLibrary/modalLibrary.component';
import { FormBuilder, Validators } from '@angular/forms';
import { CompanieService } from '../../companie/companie.service';
import { SubmitPicDialog } from '../../social/submitPicDialog.component';
var UserProfileSettingsComponent = (function () {
    function UserProfileSettingsComponent(userService, toastr, dialog, router, location, activatedRoute, _fb, authService, companieService) {
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
        this.maxPictureToShow = 3;
        this.instapic = 1;
        this.companies = [];
        this.isEditMode = false;
        this.fetchedUser = new User();
    }
    UserProfileSettingsComponent.prototype.getObjects = function (myForm) {
        return myForm.get('forms').controls;
    };
    UserProfileSettingsComponent.prototype.editMode = function () {
        this.isEditMode = !this.isEditMode;
    };
    UserProfileSettingsComponent.prototype.ngOnInit = function () {
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
                .subscribe((function (data) { return _this.companies = data; }));
        });
    };
    UserProfileSettingsComponent.prototype.getUser = function (id) {
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
    UserProfileSettingsComponent.prototype.removeForm = function (i) {
        this.fetchedUser.forms.splice(i, 1);
        var control = this.myForm.controls['forms'];
        control.removeAt(i);
        this.save();
    };
    UserProfileSettingsComponent.prototype.addForm = function (form) {
        var control = this.myForm.controls['forms'];
        var addrCtrl = this._fb.group({
            _id: ['', Validators.required],
            owner: ['', Validators.required],
            imagePath: ['', Validators.required],
        });
        control.push(addrCtrl);
    };
    UserProfileSettingsComponent.prototype.goBack = function () {
        this.location.back();
    };
    UserProfileSettingsComponent.prototype.seeAllPicture = function () {
        this.router.navigate(['user/profile/' + this.fetchedUser._id + "/userProfilePictures"]);
    };
    UserProfileSettingsComponent.prototype.openDialogSocial = function () {
        var dialogRef = this.dialog.open(SubmitPicDialog);
        dialogRef.afterClosed().subscribe(function (result) {
        });
    };
    UserProfileSettingsComponent.prototype.openDialog = function (positionImage) {
        var _this = this;
        if (positionImage == '_profilePicture') {
            var dialogRef = this.dialog.open(EditOptionsComponentDialog);
            dialogRef.afterClosed().subscribe(function (result) {
                if (result) {
                    _this.fetchedUser.profile._profilePicture[0] = result;
                    _this.save();
                }
            });
        }
        else {
            var dialogRef = this.dialog.open(EditOptionsComponentDialog);
            dialogRef.afterClosed().subscribe(function (result) {
                if (result) {
                    _this.addForm(result);
                    _this.fetchedUser.forms.unshift(result);
                    _this.save();
                }
            });
        }
    };
    UserProfileSettingsComponent.prototype.save = function () {
        var _this = this;
        this.editMode();
        this.userService.updateUser(this.fetchedUser)
            .subscribe(function (res) {
            _this.toastr.success('Great!', res.message);
        }, function (error) { console.log(error); });
    };
    UserProfileSettingsComponent.prototype.setDateToday = function () {
        var _this = this;
        this.fetchedUser.lastVisit = new Date();
        this.userService.updateUser(this.fetchedUser)
            .subscribe(function (res) {
            _this.toastr.success('Great!', res.message);
        }, function (error) { console.log(error); });
    };
    UserProfileSettingsComponent.prototype.onDelete = function (id) {
        var _this = this;
        this.userService.deleteUser(id)
            .subscribe(function (res) {
            _this.toastr.success('Great!', res.message);
        }, function (error) {
            console.log(error);
        });
    };
    return UserProfileSettingsComponent;
}());
UserProfileSettingsComponent = __decorate([
    Component({
        selector: 'app-users',
        templateUrl: './userProfileSettings.component.html',
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
], UserProfileSettingsComponent);
export { UserProfileSettingsComponent };
//# sourceMappingURL=userProfileSettings.component.js.map