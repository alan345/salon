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
import { PromotionService } from './promotion.service';
import { ToastsManager } from 'ng2-toastr';
import { MdDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
var PromotionsSeeInactiveComponent = (function () {
    function PromotionsSeeInactiveComponent(promotionService, toastr, dialog, router, location, authService) {
        this.promotionService = promotionService;
        this.toastr = toastr;
        this.dialog = dialog;
        this.router = router;
        this.location = location;
        this.authService = authService;
        this.fetchedPromotions = [];
        this.search = {
            orderBy: 'name',
            search: '',
            filterDate: false
        };
        this.paginationData = {
            currentPage: 1,
            itemsPerPage: 0,
            totalItems: 0
        };
        this.getPromotions(this.paginationData.currentPage);
    }
    PromotionsSeeInactiveComponent.prototype.goBack = function () {
        this.location.back();
    };
    PromotionsSeeInactiveComponent.prototype.searchInput = function () {
        this.getPromotions(1);
    };
    PromotionsSeeInactiveComponent.prototype.onDelete = function (id) {
        var _this = this;
        this.promotionService.deletePromotion(id)
            .subscribe(function (res) {
            _this.toastr.success('Great!', res.message);
            console.log(res);
        }, function (error) {
            console.log(error);
        });
    };
    PromotionsSeeInactiveComponent.prototype.getPage = function (page) {
        this.getPromotions(page);
    };
    // loadMore(){
    //   this.paginationData.currentPage = this.paginationData.currentPage+1
    //   this.getPromotions(this.paginationData.currentPage)
    // }
    PromotionsSeeInactiveComponent.prototype.orderBy = function (orderBy) {
        this.search.orderBy = orderBy;
        this.getPromotions(1);
    };
    PromotionsSeeInactiveComponent.prototype.getPromotions = function (page) {
        var _this = this;
        this.loading = true;
        this.promotionService.getPromotions(page, this.search)
            .subscribe(function (res) {
            _this.paginationData = res.paginationData;
            if (_this.paginationData.currentPage === 1)
                _this.fetchedPromotions = [];
            _this.fetchedPromotions = res.data;
            // res.data.forEach(obj => {
            //   this.fetchedPromotions.push(obj)
            // })
            _this.loading = false;
        }, function (error) {
            console.log(error);
        });
    };
    PromotionsSeeInactiveComponent.prototype.ngOnInit = function () { };
    PromotionsSeeInactiveComponent.prototype.isAdmin = function () {
        return this.authService.isAdmin();
    };
    return PromotionsSeeInactiveComponent;
}());
PromotionsSeeInactiveComponent = __decorate([
    Component({
        selector: 'app-promotions',
        templateUrl: './promotionsSeeInactive.component.html',
        styleUrls: ['./promotion.component.css'],
    }),
    __metadata("design:paramtypes", [PromotionService,
        ToastsManager,
        MdDialog,
        Router,
        Location,
        AuthService])
], PromotionsSeeInactiveComponent);
export { PromotionsSeeInactiveComponent };
//# sourceMappingURL=promotionsSeeInactive.component.js.map