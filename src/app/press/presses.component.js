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
import { PressService } from './press.service';
import { ToastsManager } from 'ng2-toastr';
import { MdDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from '../user/user.service';
var PressesComponent = (function () {
    function PressesComponent(pressService, toastr, dialog, router, location, authService, userService) {
        this.pressService = pressService;
        this.toastr = toastr;
        this.dialog = dialog;
        this.router = router;
        this.location = location;
        this.authService = authService;
        this.userService = userService;
        this.fetchedPresses = [];
        this.paginationData = {
            currentPage: 1,
            itemsPerPage: 0,
            totalItems: 0
        };
        this.trackinPage = {
            lastVisitPagePressCount: [],
            lastVisitPageVideoCount: []
        };
        this.getPresses(this.paginationData.currentPage);
    }
    PressesComponent.prototype.goBack = function () {
        this.location.back();
    };
    // openPictureDialog(form : Form){
    //   let dialogRef = this.dialog.open(SeePictureDialogComponent)
    //   dialogRef.componentInstance.form = form;
    //   dialogRef.afterClosed().subscribe(result => {
    //   })
    // }
    PressesComponent.prototype.onDelete = function (id) {
        var _this = this;
        this.pressService.deletePress(id)
            .subscribe(function (res) {
            _this.toastr.success('Great!', res.message);
            console.log(res);
        }, function (error) {
            console.log(error);
        });
    };
    PressesComponent.prototype.loadMore = function () {
        this.paginationData.currentPage = this.paginationData.currentPage + 1;
        this.getPresses(this.paginationData.currentPage);
    };
    // getPage(page: number) {
    //   this.getPresses(page);
    // }
    PressesComponent.prototype.getPresses = function (page) {
        var _this = this;
        this.loading = true;
        this.pressService.getPresses(page)
            .subscribe(function (res) {
            _this.paginationData = res.paginationData;
            var fetchedPressesTemp = res.data;
            fetchedPressesTemp.forEach(function (press) {
                press['isNewObj'] = false;
                _this.trackinPage.lastVisitPagePressCount.forEach(function (objNotRead) {
                    if (objNotRead._id == press._id)
                        press['isNewObj'] = true;
                });
                _this.fetchedPresses.push(press);
            });
            _this.loading = false;
        }, function (error) {
            console.log(error);
        });
    };
    PressesComponent.prototype.ngOnInit = function () {
        var _this = this;
        var userId = this.authService.currentUser.userId;
        this.pressService.countNewItemForUser()
            .subscribe(function (data) {
            _this.trackinPage.lastVisitPagePressCount = data.item;
            _this.userService.getUser(userId)
                .subscribe(function (res) {
                res.user.trackinPage.lastVisitPagePress = new Date();
                _this.userService.updateUser(res.user)
                    .subscribe(function (res) { }, function (error) {
                    console.log(error);
                });
            }, function (error) {
                console.log(error);
            });
        }, function (error) { return console.log(error); });
    };
    PressesComponent.prototype.isAdmin = function () {
        return this.authService.isAdmin();
    };
    return PressesComponent;
}());
PressesComponent = __decorate([
    Component({
        selector: 'app-presses',
        templateUrl: './presses.component.html',
        styleUrls: ['./press.component.css'],
    }),
    __metadata("design:paramtypes", [PressService,
        ToastsManager,
        MdDialog,
        Router,
        Location,
        AuthService,
        UserService])
], PressesComponent);
export { PressesComponent };
//# sourceMappingURL=presses.component.js.map