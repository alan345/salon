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
import { ToastsManager } from 'ng2-toastr';
import { MdDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { DeleteDialog } from '../deleteDialog/deleteDialog.component';
var EditCompanieComponent = (function () {
    function EditCompanieComponent(companieService,
        //    private modalService: NgbModal,
        toastr, dialog, activatedRoute, router, location, _fb, authService) {
        this.companieService = companieService;
        this.toastr = toastr;
        this.dialog = dialog;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.location = location;
        this._fb = _fb;
        this.authService = authService;
        this.fetchedCompanie = {
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
        this.userAdmins = [];
        this.userManagers = [];
        this.userClients = [];
        this.usersSalesRep = [];
        this.userStylists = [];
    }
    EditCompanieComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.myForm = this._fb.group({
            name: [''],
            phoneNumber: ['', [Validators.required, Validators.minLength(2)]],
            address: this._fb.group({
                address: ['', [Validators.required, Validators.minLength(2)]],
                city: ['', [Validators.required, Validators.minLength(2)]],
                state: ['', [Validators.required, Validators.minLength(2)]],
                zip: ['', [Validators.required, Validators.minLength(2)]],
            }),
            _users: this._fb.array([])
        });
        this.activatedRoute.params.subscribe(function (params) {
            if (params['id'])
                _this.getCompanie(params['id']);
        });
    };
    EditCompanieComponent.prototype.removeUserFromCompanie = function (i, typeUser) {
        var _this = this;
        var this2 = this;
        var dialogRefDelete = this.dialog.open(DeleteDialog);
        dialogRefDelete.afterClosed().subscribe(function (result) {
            if (result) {
                _this[typeUser].splice(i, 1);
                _this.save(false);
            }
        });
    };
    EditCompanieComponent.prototype.save = function (redirect) {
        var _this = this;
        this.fetchedCompanie._users = [];
        this.userAdmins.forEach(function (user) { return _this.fetchedCompanie._users.push(user); });
        this.userManagers.forEach(function (user) { return _this.fetchedCompanie._users.push(user); });
        this.userClients.forEach(function (user) { return _this.fetchedCompanie._users.push(user); });
        this.userStylists.forEach(function (user) { return _this.fetchedCompanie._users.push(user); });
        this.usersSalesRep.forEach(function (user) { return _this.fetchedCompanie._users.push(user); });
        if (this.fetchedCompanie._id) {
            this.companieService.updateCompanie(this.fetchedCompanie)
                .subscribe(function (res) {
                _this.toastr.success('Great!', res.message);
                if (redirect)
                    _this.router.navigate(['companie/' + _this.fetchedCompanie._id]);
            }, function (error) {
                //console.log(error)
                _this.toastr.error('error!', error);
            });
        }
        else {
            this.companieService.saveCompanie(this.fetchedCompanie)
                .subscribe(function (res) {
                _this.toastr.success('Great!', res.message);
                if (redirect)
                    _this.router.navigate(['companie/' + res.obj._id]);
            }, function (error) { console.log(error); });
        }
    };
    EditCompanieComponent.prototype.move = function (i, incremet, typeUser) {
        if (i >= 0 && i <= this[typeUser].length + incremet) {
            var tmp = this[typeUser][i];
            this[typeUser][i] = this[typeUser][i + incremet];
            this[typeUser][i + incremet] = tmp;
            this.save(false);
        }
    };
    EditCompanieComponent.prototype.onDelete = function (id) {
        var _this = this;
        this.companieService.deleteCompanie(id)
            .subscribe(function (res) {
            _this.toastr.success('Great!', res.message);
            console.log(res);
        }, function (error) {
            console.log(error);
        });
    };
    EditCompanieComponent.prototype.goBack = function () {
        this.location.back();
    };
    // addUser(user) {
    //   const control = <FormArray>this.myForm.controls['_users'];
    //   const addrCtrl = this._fb.group({
    //       _id: ['', Validators.required],
    //   });
    //   control.push(addrCtrl);
    // }
    EditCompanieComponent.prototype.getCompanie = function (id) {
        var _this = this;
        this.companieService.getCompanie(id, {})
            .subscribe(function (res) {
            _this.fetchedCompanie = res;
            _this.fetchedCompanie._users.forEach(function (user) {
                if (user.role[0] === 'admin')
                    _this.userAdmins.push(user);
                if (user.role[0] === 'salesRep')
                    _this.usersSalesRep.push(user);
                if (user.role[0] === 'client')
                    _this.userClients.push(user);
                if (user.role[0] === 'stylist')
                    _this.userStylists.push(user);
                if (user.role[0] === 'manager')
                    _this.userManagers.push(user);
                //  this.addUser(user)
            });
        }, function (error) {
            console.log(error);
        });
    };
    EditCompanieComponent.prototype.isAdmin = function () {
        return this.authService.isAdmin();
    };
    EditCompanieComponent.prototype.isManager = function () {
        return this.authService.isManager();
    };
    EditCompanieComponent.prototype.isSalesRep = function () {
        return this.authService.isSalesRep();
    };
    EditCompanieComponent.prototype.isHQcompanie = function () {
        if (this.fetchedCompanie.typeCompanie === 'HQ')
            return true;
        return false;
    };
    return EditCompanieComponent;
}());
EditCompanieComponent = __decorate([
    Component({
        selector: 'app-companie',
        templateUrl: './editCompanie.component.html',
        styleUrls: ['./companie.component.css'],
    }),
    __metadata("design:paramtypes", [CompanieService,
        ToastsManager,
        MdDialog,
        ActivatedRoute,
        Router,
        Location,
        FormBuilder,
        AuthService])
], EditCompanieComponent);
export { EditCompanieComponent };
//# sourceMappingURL=editCompanie.component.js.map
