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
import { PressService } from './press.service';
import { ToastsManager } from 'ng2-toastr';
import { MdDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { EditOptionsComponentDialog } from '../modalLibrary/modalLibrary.component';
import { FormBuilder, Validators } from '@angular/forms';
import { DeleteDialog } from '../deleteDialog/deleteDialog.component';
var PressSingleComponent = (function () {
    function PressSingleComponent(pressService, toastr, dialog, router, location, activatedRoute, _fb) {
        this.pressService = pressService;
        this.toastr = toastr;
        this.dialog = dialog;
        this.router = router;
        this.location = location;
        this.activatedRoute = activatedRoute;
        this._fb = _fb;
        //fetchedPress = new Press()
        //fetchedPress: Press;
        //fetchedPress._id='';
        this.fetchedPress = {
            _id: '',
            title: '',
            link: '',
            formPDF: [],
            form: [],
            owner: []
        };
    }
    PressSingleComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.myForm = this._fb.group({
            _id: [''],
            title: ['', [Validators.required, Validators.minLength(5)]],
            link: [''],
        });
        this.activatedRoute.params.subscribe(function (params) {
            if (params['id'])
                _this.getPress(params['id']);
        });
    };
    PressSingleComponent.prototype.removePDF = function (i) {
        this.fetchedPress.formPDF.splice(i, 1);
        this.disableLinkInput();
    };
    PressSingleComponent.prototype.openDialogDelete = function () {
        var _this = this;
        var this2 = this;
        var dialogRefDelete = this.dialog.open(DeleteDialog);
        dialogRefDelete.afterClosed().subscribe(function (result) {
            if (result) {
                _this.onDelete(_this.fetchedPress._id).then(function () {
                    this2.router.navigate(['press']);
                });
            }
        });
    };
    PressSingleComponent.prototype.openDialog = function (positionImage) {
        var _this = this;
        var dialogRef = this.dialog.open(EditOptionsComponentDialog);
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this.fetchedPress[positionImage][0] = result;
                if (positionImage === 'formPDF')
                    _this.disableLinkInput();
            }
        });
    };
    PressSingleComponent.prototype.goBack = function () {
        this.location.back();
    };
    PressSingleComponent.prototype.disableLinkInput = function () {
        var ctrl = this.myForm.get('link');
        ctrl.enabled ? ctrl.disable() : ctrl.enable();
        this.fetchedPress.link = '';
    };
    PressSingleComponent.prototype.save = function () {
        var _this = this;
        //let press: Press = this.fetchedPress
        if (!this.fetchedPress.form.length) {
            this.toastr.error('Error!', 'Select picture');
            return;
        }
        if (!((this.fetchedPress.link || this.fetchedPress.formPDF.length)
            && this.fetchedPress.form.length)) {
            this.toastr.error('Error!', 'Select PDF or link');
            return;
        }
        if (this.fetchedPress._id) {
            this.pressService.updatePress(this.fetchedPress)
                .subscribe(function (res) {
                _this.toastr.success('Great!', res.message);
                _this.router.navigate(['press']);
            }, function (error) { console.log(error); });
        }
        else {
            this.pressService.savePress(this.fetchedPress)
                .subscribe(function (res) {
                _this.toastr.success('Great!', res.message);
                _this.router.navigate(['press']);
            }, function (error) { console.log(error); });
        }
    };
    PressSingleComponent.prototype.getPress = function (id) {
        var _this = this;
        this.pressService.getPress(id)
            .subscribe(function (res) {
            _this.fetchedPress = res;
            if (_this.fetchedPress.formPDF.length)
                _this.disableLinkInput();
        }, function (error) {
            console.log(error);
        });
    };
    PressSingleComponent.prototype.onDelete = function (id) {
        var this2 = this;
        return new Promise(function (resolve, reject) {
            this2.pressService.deletePress(id)
                .subscribe(function (res) {
                this2.toastr.success('Great!', res.message);
                resolve(res);
            }, function (error) {
                console.log(error);
                reject(error);
            });
        });
    };
    return PressSingleComponent;
}());
PressSingleComponent = __decorate([
    Component({
        selector: 'app-presses',
        templateUrl: './pressSingle.component.html',
        styleUrls: ['./press.component.css'],
    }),
    __metadata("design:paramtypes", [PressService,
        ToastsManager,
        MdDialog,
        Router,
        Location,
        ActivatedRoute,
        FormBuilder])
], PressSingleComponent);
export { PressSingleComponent };
//# sourceMappingURL=pressSingle.component.js.map