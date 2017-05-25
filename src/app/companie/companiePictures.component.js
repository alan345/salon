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
import { CompanieService } from './companie.service';
import { Companie } from './companie.model';
import { ToastsManager } from 'ng2-toastr';
import { MdDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { EditOptionsComponentDialog } from '../modalLibrary/modalLibrary.component';
var CompaniePicturesComponent = (function () {
    function CompaniePicturesComponent(companieService, 
        //    private modalService: NgbModal,
        toastr, dialog, router, location, activatedRoute, _fb) {
        this.companieService = companieService;
        this.toastr = toastr;
        this.dialog = dialog;
        this.router = router;
        this.location = location;
        this.activatedRoute = activatedRoute;
        this._fb = _fb;
        this.maxPictureToShow = 3;
        this.fetchedCompanie = new Companie();
    }
    CompaniePicturesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.myForm = this._fb.group({
            forms: this._fb.array([])
        });
        this.activatedRoute.params.subscribe(function (params) {
            _this.getCompanie(params['id']);
        });
    };
    CompaniePicturesComponent.prototype.goBack = function () {
        this.location.back();
    };
    CompaniePicturesComponent.prototype.removeForm = function (i) {
        this.fetchedCompanie.forms.splice(i, 1);
        var control = this.myForm.controls['forms'];
        control.removeAt(i);
        this.save();
    };
    CompaniePicturesComponent.prototype.onDelete = function (id) {
        var _this = this;
        this.companieService.deleteCompanie(id)
            .subscribe(function (res) {
            _this.toastr.success('Great!', res.message);
            console.log(res);
        }, function (error) {
            console.log(error);
        });
    };
    CompaniePicturesComponent.prototype.save = function () {
        var _this = this;
        this.companieService.updateCompanie(this.fetchedCompanie)
            .subscribe(function (res) {
            _this.toastr.success('Great!', res.message);
        }, function (error) { console.log(error); });
    };
    CompaniePicturesComponent.prototype.seeAllPicture = function () {
        this.router.navigate(['companie/' + this.fetchedCompanie._id + "/companiePictures"]);
    };
    CompaniePicturesComponent.prototype.addForm = function (form) {
        var control = this.myForm.controls['forms'];
        var addrCtrl = this._fb.group({
            _id: ['', Validators.required],
            owner: ['', Validators.required],
            imagePath: ['', Validators.required],
        });
        control.push(addrCtrl);
    };
    CompaniePicturesComponent.prototype.getObjects = function (myForm) {
        return myForm.get('forms').controls;
    };
    CompaniePicturesComponent.prototype.openDialog = function (positionImage) {
        var _this = this;
        var dialogRef = this.dialog.open(EditOptionsComponentDialog);
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this.addForm(result);
                _this.fetchedCompanie.forms.push(result);
                _this.save();
            }
        });
    };
    CompaniePicturesComponent.prototype.getCompanie = function (id) {
        var _this = this;
        this.companieService.getCompanie(id, {})
            .subscribe(function (res) {
            _this.fetchedCompanie = res;
            _this.fetchedCompanie.forms.forEach(function (form) {
                _this.addForm(form);
            });
        }, function (error) {
            console.log(error);
        });
    };
    return CompaniePicturesComponent;
}());
CompaniePicturesComponent = __decorate([
    Component({
        selector: 'app-companie',
        templateUrl: './companiePictures.component.html',
        styleUrls: ['./companie.component.css'],
    }),
    __metadata("design:paramtypes", [CompanieService,
        ToastsManager,
        MdDialog,
        Router,
        Location,
        ActivatedRoute,
        FormBuilder])
], CompaniePicturesComponent);
export { CompaniePicturesComponent };
//# sourceMappingURL=companiePictures.component.js.map