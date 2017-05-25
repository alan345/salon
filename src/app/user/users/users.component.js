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
import { Router } from '@angular/router';
import { Location } from '@angular/common';
var UsersComponent = (function () {
    function UsersComponent(userService, toastr, dialog, router, location, authService, companieService) {
        this.userService = userService;
        this.toastr = toastr;
        this.dialog = dialog;
        this.router = router;
        this.location = location;
        this.authService = authService;
        this.companieService = companieService;
        this.fetchedUsers = [];
        this.search = {
            orderBy: '',
            search: '',
            parentUser: '',
            role: ''
        };
        this.paginationData = {
            currentPage: 1,
            itemsPerPage: 0,
            totalItems: 0
        };
    }
    UsersComponent.prototype.ngOnInit = function () {
        var _this = this;
        //this.companieService.getCompanieByUserId(this.authService.currentUser.userId)
        this.companieService.getCompanieForCurrentUser()
            .subscribe((function (data) {
            if (data.length)
                _this.router.navigate(['/companie/' + data[0]._id + '/users']);
        }));
        // if(this.isAdmin()) {
        //   this.companieService.getCompanieByUserId(this.authService.currentUser.userId)
        //   .subscribe((data => {
        //       if(data.length)
        //         this.router.navigate(['/companie/' + data[0]._id + '/users']);
        //     })
        //   )
        // } else {
        this.search.orderBy = 'profile.name';
        this.search.role = 'client';
        this.search.parentUser = this.authService.currentUser.userId;
        this.getUsers(this.paginationData.currentPage, this.search);
        // }
    };
    UsersComponent.prototype.goBack = function () {
        this.location.back();
    };
    UsersComponent.prototype.isAdmin = function () {
        return this.authService.isAdmin();
    };
    UsersComponent.prototype.isStylist = function () {
        return this.authService.isStylist();
    };
    UsersComponent.prototype.isSalesRep = function () {
        return this.authService.isSalesRep();
    };
    UsersComponent.prototype.isManager = function () {
        return this.authService.isManager();
    };
    UsersComponent.prototype.searchInput = function () {
        this.getUsers(this.paginationData.currentPage, this.search);
    };
    UsersComponent.prototype.orderBy = function (orderBy) {
        this.search.orderBy = orderBy;
        this.getUsers(this.paginationData.currentPage, this.search);
    };
    UsersComponent.prototype.onDelete = function (id) {
        var _this = this;
        this.userService.deleteUser(id)
            .subscribe(function (res) {
            _this.toastr.success('Great!', res.message);
            console.log(res);
        }, function (error) {
            console.log(error);
        });
    };
    UsersComponent.prototype.getPage = function (page) {
        this.loading = true;
        this.getUsers(page, this.search);
    };
    UsersComponent.prototype.getUsers = function (page, search) {
        var _this = this;
        this.userService.getUsers(page, search)
            .subscribe(function (res) {
            _this.paginationData = res.paginationData;
            _this.fetchedUsers = res.data;
            _this.loading = false;
        }, function (error) {
            console.log(error);
        });
    };
    return UsersComponent;
}());
UsersComponent = __decorate([
    Component({
        selector: 'app-users',
        templateUrl: './users.component.html',
        styleUrls: ['./user.component.css'],
    }),
    __metadata("design:paramtypes", [UserService,
        ToastsManager,
        MdDialog,
        Router,
        Location,
        AuthService,
        CompanieService])
], UsersComponent);
export { UsersComponent };
//# sourceMappingURL=users.component.js.map