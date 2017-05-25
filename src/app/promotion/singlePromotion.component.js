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
import { PromotionService } from './promotion.service';
import { ToastsManager } from 'ng2-toastr';
import { MdDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Promotion } from './promotion.model';
import { EditOptionsComponentDialog } from '../modalLibrary/modalLibrary.component';
import { FormBuilder, Validators } from '@angular/forms';
import { PromotionDeleteDialog } from './promotionDeleteDialog.component';
var SinglePromotionComponent = (function () {
    function SinglePromotionComponent(promotionService, toastr, dialog, router, location, activatedRoute, _fb) {
        this.promotionService = promotionService;
        this.toastr = toastr;
        this.dialog = dialog;
        this.router = router;
        this.location = location;
        this.activatedRoute = activatedRoute;
        this._fb = _fb;
        //fetchedPromotion = new Promotion()
        //fetchedPromotion: Promotion;
        //fetchedPromotion._id='';
        this.fetchedPromotion = new Promotion();
    }
    SinglePromotionComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.myForm = this._fb.group({
            _id: [''],
            name: ['', [Validators.required, Validators.minLength(5)]],
            date: this._fb.group({
                dateBegin: ['', [Validators.required, Validators.minLength(5)]],
                dateEnd: ['', [Validators.required, Validators.minLength(5)]],
            }),
            form: this._fb.array([])
        });
        this.activatedRoute.params.subscribe(function (params) {
            if (params['id'])
                _this.getPromotion(params['id']);
        });
    };
    SinglePromotionComponent.prototype.removeAddress = function (i) {
        var control = this.myForm.controls['addresses'];
        control.removeAt(i);
    };
    SinglePromotionComponent.prototype.addAddress = function () {
        var control = this.myForm.controls['addresses'];
        var addrCtrl = this._fb.group({
            street: ['', Validators.required],
            postcode: ['']
        });
        control.push(addrCtrl);
    };
    SinglePromotionComponent.prototype.goBack = function () {
        this.location.back();
    };
    SinglePromotionComponent.prototype.openDialog = function (positionImage) {
        var _this = this;
        var dialogRef = this.dialog.open(EditOptionsComponentDialog);
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this.fetchedPromotion.form[0] = result;
            }
        });
    };
    SinglePromotionComponent.prototype.save = function () {
        var _this = this;
        if (!this.fetchedPromotion.form.length) {
            this.toastr.error('Need a picture');
            return;
        }
        if (this.fetchedPromotion._id) {
            this.promotionService.updatePromotion(this.fetchedPromotion)
                .subscribe(function (res) {
                _this.toastr.success('Great!', res.message);
                _this.router.navigate(['promotion/']);
            }, function (error) { console.log(error); });
        }
        else {
            this.promotionService.savePromotion(this.fetchedPromotion)
                .subscribe(function (res) {
                _this.toastr.success('Great!', res.message);
                _this.router.navigate(['promotion/']);
            }, function (error) { console.log(error); });
        }
    };
    SinglePromotionComponent.prototype.openDialogDelete = function () {
        var _this = this;
        var dialogRefDelete = this.dialog.open(PromotionDeleteDialog);
        dialogRefDelete.afterClosed().subscribe(function (result) {
            if (result) {
                _this.onDelete(_this.fetchedPromotion._id);
                _this.router.navigate(['promotion']);
            }
        });
    };
    SinglePromotionComponent.prototype.getPromotion = function (id) {
        var _this = this;
        this.promotionService.getPromotion(id)
            .subscribe(function (res) {
            _this.fetchedPromotion = res;
            _this.fetchedPromotion.date.dateBegin = new Date(_this.fetchedPromotion.date.dateBegin).toISOString().substr(0, 10);
            _this.fetchedPromotion.date.dateEnd = new Date(_this.fetchedPromotion.date.dateEnd).toISOString().substr(0, 10);
        }, function (error) {
            console.log(error);
        });
    };
    SinglePromotionComponent.prototype.onDelete = function (id) {
        var _this = this;
        this.promotionService.deletePromotion(id)
            .subscribe(function (res) {
            _this.toastr.success('Great!', res.message);
        }, function (error) {
            console.log(error);
        });
    };
    return SinglePromotionComponent;
}());
SinglePromotionComponent = __decorate([
    Component({
        selector: 'app-promotions',
        templateUrl: './singlePromotion.component.html',
        styleUrls: ['./promotion.component.css'],
    }),
    __metadata("design:paramtypes", [PromotionService,
        ToastsManager,
        MdDialog,
        Router,
        Location,
        ActivatedRoute,
        FormBuilder])
], SinglePromotionComponent);
export { SinglePromotionComponent };
// @Component({
//   selector: 'promotion-dialog',
//   templateUrl: './promotionDialog.component.html',
// })
// export class PromotionDialogComponent {
//   constructor(public dialogRef: MdDialogRef<PromotionDialogComponent>) {}
//
// }
//# sourceMappingURL=singlePromotion.component.js.map