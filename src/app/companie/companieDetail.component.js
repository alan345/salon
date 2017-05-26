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
import { CompanieService } from './companie.service';
import { Companie } from './companie.model';
import { ToastsManager } from 'ng2-toastr';
import { MdDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { EditOptionsComponentDialog } from '../modalLibrary/modalLibrary.component';
var CompanieDetailComponent = (function () {
    function CompanieDetailComponent(companieService, 
        //    private modalService: NgbModal,
        toastr, dialog, router, location, activatedRoute, _fb, authService) {
        this.companieService = companieService;
        this.toastr = toastr;
        this.dialog = dialog;
        this.router = router;
        this.location = location;
        this.activatedRoute = activatedRoute;
        this._fb = _fb;
        this.authService = authService;
        this.maxPictureToShow = 3;
        this.users = [];
        this.userAdmins = [];
        this.fetchedCompanie = new Companie();
        // {
        //   _id: '',
        //   forms: [],
        //   name: '',
        //   typeCompanie: '',
        //   phoneNumber: '',
        //   address: {
        //     address : '',
        //     city :  '',
        //     state :  '',
        //     zip :  ''
        //   },
        //   _users: []
        // };
        this.search = {
            orderBy: '-client',
            search: '',
            parentUser: '',
            role: '',
            onlyMyUsers: false,
        };
    }
    CompanieDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRoute.params.subscribe(function (params) {
            //this.fetchedCompanie=
            //this.router.navigate(['companie/' + params['id'] ]);
            //console.log('init')
            _this.myForm = _this._fb.group({
                forms: _this._fb.array([])
            });
            if (params['id'])
                _this.getCompanie(params['id']);
        });
    };
    CompanieDetailComponent.prototype.goBack = function () {
        this.location.back();
    };
    CompanieDetailComponent.prototype.removeForm = function (i) {
        this.fetchedCompanie.forms.splice(i, 1);
        var control = this.myForm.controls['forms'];
        control.removeAt(i);
        this.save();
    };
    CompanieDetailComponent.prototype.onDelete = function (id) {
        var _this = this;
        this.companieService.deleteCompanie(id)
            .subscribe(function (res) {
            _this.toastr.success('Great!', res.message);
            console.log(res);
        }, function (error) {
            console.log(error);
        });
    };
    CompanieDetailComponent.prototype.save = function () {
        var _this = this;
        this.companieService.updateCompanie(this.fetchedCompanie)
            .subscribe(function (res) {
            _this.toastr.success('Great!', res.message);
        }, function (error) { console.log(error); });
    };
    CompanieDetailComponent.prototype.seeAllPicture = function () {
        this.router.navigate(['companie/' + this.fetchedCompanie._id + '/companiePictures']);
    };
    CompanieDetailComponent.prototype.addForm = function (form) {
        var control = this.myForm.controls['forms'];
        var addrCtrl = this._fb.group({
            _id: ['', Validators.required],
            owner: ['', Validators.required],
            imagePath: ['', Validators.required],
        });
        control.push(addrCtrl);
    };
    CompanieDetailComponent.prototype.getObjects = function (myForm) {
        return myForm.get('forms').controls;
    };
    CompanieDetailComponent.prototype.openDialog = function (positionImage) {
        var _this = this;
        var dialogRef = this.dialog.open(EditOptionsComponentDialog);
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                console.log(result);
                if (result.type === 'pdf') {
                    _this.toastr.error('No pdf!');
                }
                else {
                    _this.addForm(result);
                    _this.fetchedCompanie.forms.push(result);
                    _this.save();
                }
            }
        });
    };
    CompanieDetailComponent.prototype.getCompanie = function (id) {
        var _this = this;
        this.companieService.getCompanie(id, this.search)
            .subscribe(function (res) {
            _this.fetchedCompanie = res;
            _this.fetchedCompanie._users.forEach(function (user) {
                if (user.role[0] === 'salesRep')
                    _this.users.push(user);
                if (user.role[0] === 'admin')
                    _this.userAdmins.push(user);
            });
            _this.fetchedCompanie.forms.forEach(function (form) {
                _this.addForm(form);
            });
        }, function (error) {
            console.log(error);
        });
    };
    CompanieDetailComponent.prototype.isAdmin = function () {
        return this.authService.isAdmin();
    };
    CompanieDetailComponent.prototype.isStylist = function () {
        return this.authService.isStylist();
    };
    CompanieDetailComponent.prototype.isSalesRep = function () {
        return this.authService.isSalesRep();
    };
    CompanieDetailComponent.prototype.isManager = function () {
        return this.authService.isManager();
    };
    CompanieDetailComponent.prototype.isHQcompanie = function () {
        if (this.fetchedCompanie.typeCompanie === 'HQ')
            return true;
        return false;
    };
    return CompanieDetailComponent;
}());
CompanieDetailComponent = __decorate([
    Component({
        selector: 'app-companie',
        templateUrl: './companieDetail.component.html',
        styleUrls: ['./companie.component.css'],
    }),
    __metadata("design:paramtypes", [CompanieService,
        ToastsManager,
        MdDialog,
        Router,
        Location,
        ActivatedRoute,
        FormBuilder,
        AuthService])
], CompanieDetailComponent);
export { CompanieDetailComponent };
//# sourceMappingURL=companieDetail.component.js.map