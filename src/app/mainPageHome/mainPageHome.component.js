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
import { MainPageHomeService } from './mainPageHome.service';
import { ToastsManager } from 'ng2-toastr';
import { MdDialog } from '@angular/material';
import { EditOptionsComponentDialog } from '../modalLibrary/modalLibrary.component';
import { AdminService } from '../admin/services/admin.service';
import { VideoService } from '../video/video.service';
import { PressService } from '../press/press.service';
import { Router } from '@angular/router';
import { CompanieService } from '../companie/companie.service';
import { AuthService } from '../auth/auth.service';
var MainPageHomeComponent = (function () {
    function MainPageHomeComponent(companieService, router, adminService, mainPageHomeService, toastr, dialog, videoService, pressService, authService) {
        this.companieService = companieService;
        this.router = router;
        this.adminService = adminService;
        this.mainPageHomeService = mainPageHomeService;
        this.toastr = toastr;
        this.dialog = dialog;
        this.videoService = videoService;
        this.pressService = pressService;
        this.authService = authService;
        this.companies = [];
        this.trackinPage = {
            lastVisitPagePressCount: [],
            lastVisitPageVideoCount: []
        };
        this.isEditTitle = false;
        this.options = {
            design: {
                mainPage: {
                    titleHomePage: '',
                    buttonHomePage: '',
                    linkButtonHomePage: '',
                    _imgHome1: [],
                    _imgHome2: [],
                    _imgHome3: [],
                    _imgHome4: [],
                    _imgHome5: [],
                    _imgHome6: [],
                }
            }
        };
    }
    MainPageHomeComponent.prototype.editTitleHomePage = function () {
        if (this.isEditTitle)
            this.save();
        this.isEditTitle = !this.isEditTitle;
    };
    MainPageHomeComponent.prototype.openDialog = function (positionImage) {
        var _this = this;
        var dialogRef = this.dialog.open(EditOptionsComponentDialog);
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this.options.design.mainPage[positionImage][0] = result;
                _this.save();
            }
        });
    };
    // save(model: FormGroup, isValid: boolean) {
    //   // this.mainPageHomeService.updateOptions(model)
    //   //   .subscribe(
    //   //     res => {
    //   //       this.toastr.success('Great!', res.message)
    //   //     },
    //   //     error => {console.log(error)}
    //   //   )
    // }
    MainPageHomeComponent.prototype.save = function () {
        var _this = this;
        this.mainPageHomeService.updateOptions(this.options)
            .subscribe(function (res) {
            _this.toastr.success('Great!', res.message);
        }, function (error) { console.log(error); });
    };
    MainPageHomeComponent.prototype.goTo = function (path) {
        var _this = this;
        if (path === 'user') {
            if (this.companies.length) {
                if (this.isSalesRep() || this.isAdmin()) {
                    this.companies.forEach(function (companie, index) {
                        if (_this.isHQcompanie(companie)) {
                            _this.router.navigate(['/companie/' + _this.companies[index]._id + '/users']);
                        }
                    });
                }
                if (this.isStylist() || this.isManager()) {
                    this.router.navigate(['/companie/' + this.companies[0]._id + '/users']);
                }
            }
        }
        else {
            this.router.navigate([path]);
        }
        // if( (this.isAdmin() || this.isManager()) && path === 'user') {
        //   if(this.companies.length)
        //     this.router.navigate(['/companie/' + this.companies[0]._id + '/users']);
        // } else {
        //   this.router.navigate([path]);
        // }
    };
    MainPageHomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        //this.companieService.getCompanieByUserId(this.authService.currentUser.userId)
        this.companieService.getCompanieForCurrentUser()
            .subscribe((function (data) { return _this.companies = data; }));
        this.videoService.countNewItemForUser()
            .subscribe(function (data) { return _this.trackinPage.lastVisitPageVideoCount = data.item; }, function (error) { return console.log(error); });
        this.pressService.countNewItemForUser()
            .subscribe(function (data) { return _this.trackinPage.lastVisitPagePressCount = data.item; }, function (error) { return console.log(error); });
        this.mainPageHomeService.getOptions()
            .subscribe(function (options) { return _this.options = options.obj; }, function (error) { console.log(error); });
    };
    MainPageHomeComponent.prototype.isAdmin = function () {
        return this.authService.isAdmin();
    };
    MainPageHomeComponent.prototype.isStylist = function () {
        return this.authService.isStylist();
    };
    MainPageHomeComponent.prototype.isSalesRep = function () {
        return this.authService.isSalesRep();
    };
    MainPageHomeComponent.prototype.isManager = function () {
        return this.authService.isManager();
    };
    MainPageHomeComponent.prototype.isHQcompanie = function (companie) {
        if (companie.typeCompanie === 'HQ')
            return true;
        return false;
    };
    return MainPageHomeComponent;
}());
MainPageHomeComponent = __decorate([
    Component({
        selector: 'app-admin',
        templateUrl: './mainPageHome.component.html',
        styleUrls: ['./mainPageHome.component.css']
    }),
    __metadata("design:paramtypes", [CompanieService,
        Router,
        AdminService,
        MainPageHomeService,
        ToastsManager,
        MdDialog,
        VideoService,
        PressService,
        AuthService])
], MainPageHomeComponent);
export { MainPageHomeComponent };
//# sourceMappingURL=mainPageHome.component.js.map