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
import { DeleteDialog } from '../../deleteDialog/deleteDialog.component';
var SingleUserComponent = (function () {
    function SingleUserComponent(authService, userService, toastr, dialog, router, location, activatedRoute, _fb) {
        this.authService = authService;
        this.userService = userService;
        this.toastr = toastr;
        this.dialog = dialog;
        this.router = router;
        this.location = location;
        this.activatedRoute = activatedRoute;
        this._fb = _fb;
        this.maxPictureToShow = 3;
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
        this.meUser = {
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
    SingleUserComponent.prototype.getObjects = function (myForm) {
        return myForm.get('forms').controls;
    };
    SingleUserComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.myForm = this._fb.group({
            lastVisit: [''],
            forms: this._fb.array([])
        });
        this.activatedRoute.params.subscribe(function (params) {
            _this.getUser(params['id']);
        });
    };
    SingleUserComponent.prototype.removeNoteDialog = function (i) {
        var _this = this;
        var this2 = this;
        var dialogRefDelete = this.dialog.open(DeleteDialog);
        dialogRefDelete.afterClosed().subscribe(function (result) {
            if (result) {
                _this.removeNote(i);
            }
        });
    };
    SingleUserComponent.prototype.removeNote = function (i) {
        this.fetchedUser.notes.splice(i, 1);
        this.save();
    };
    SingleUserComponent.prototype.removeFormDialog = function (i) {
        var _this = this;
        var this2 = this;
        var dialogRefDelete = this.dialog.open(DeleteDialog);
        dialogRefDelete.afterClosed().subscribe(function (result) {
            if (result) {
                _this.removeForm(i);
            }
        });
    };
    SingleUserComponent.prototype.removeForm = function (i) {
        this.fetchedUser.forms.splice(i, 1);
        var control = this.myForm.controls['forms'];
        control.removeAt(i);
        this.save();
    };
    SingleUserComponent.prototype.addForm = function (form) {
        var control = this.myForm.controls['forms'];
        var addrCtrl = this._fb.group({
            _id: ['', Validators.required],
            owner: ['', Validators.required],
            imagePath: ['', Validators.required],
        });
        control.push(addrCtrl);
    };
    SingleUserComponent.prototype.goBack = function () {
        this.location.back();
    };
    SingleUserComponent.prototype.seeAllPicture = function () {
        this.router.navigate(['user/' + this.fetchedUser._id + "/userPictures"]);
    };
    SingleUserComponent.prototype.openDialog = function (positionImage) {
        var _this = this;
        var dialogRef = this.dialog.open(EditOptionsComponentDialog);
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this.addForm(result);
                _this.fetchedUser.forms.unshift(result);
                _this.save();
            }
        });
    };
    SingleUserComponent.prototype.save = function () {
        var _this = this;
        this.userService.updateUser(this.fetchedUser)
            .subscribe(function (res) {
            _this.toastr.success('Great!', res.message);
        }, function (error) { console.log(error); });
    };
    SingleUserComponent.prototype.setDateToday = function () {
        var _this = this;
        this.fetchedUser.lastVisit = new Date();
        this.userService.updateUser(this.fetchedUser)
            .subscribe(function (res) {
            _this.toastr.success('Great!', res.message);
        }, function (error) { console.log(error); });
    };
    SingleUserComponent.prototype.isMyClient = function () {
        var _this = this;
        var isMyClient = false;
        this.fetchedUser.profile.parentUser.forEach(function (parentUser) {
            if (parentUser._id === _this.authService.currentUser.userId)
                isMyClient = true;
        });
        return isMyClient;
    };
    // getMeUser() {
    //   let id = this.authService.currentUser.userId
    //   this.userService.getUser(id)
    //     .subscribe(
    //       res => {
    //         this.meUser = res.user
    //       },
    //       error => {
    //         console.log(error);
    //       }
    //     )
    // }
    SingleUserComponent.prototype.getUser = function (id) {
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
    SingleUserComponent.prototype.onDelete = function (id) {
        var _this = this;
        this.userService.deleteUser(id)
            .subscribe(function (res) {
            _this.toastr.success('Great!', res.message);
        }, function (error) {
            console.log(error);
        });
    };
    return SingleUserComponent;
}());
SingleUserComponent = __decorate([
    Component({
        selector: 'app-users',
        templateUrl: './singleUser.component.html',
        styleUrls: ['./user.component.css'],
    }),
    __metadata("design:paramtypes", [AuthService,
        UserService,
        ToastsManager,
        MdDialog,
        Router,
        Location,
        ActivatedRoute,
        FormBuilder])
], SingleUserComponent);
export { SingleUserComponent };
//# sourceMappingURL=singleUser.component.js.map