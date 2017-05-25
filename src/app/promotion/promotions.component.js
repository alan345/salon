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
import { Location } from '@angular/common';
var PromotionsComponent = (function () {
    function PromotionsComponent(promotionService, toastr, location, authService) {
        this.promotionService = promotionService;
        this.toastr = toastr;
        this.location = location;
        this.authService = authService;
        this.fetchedPromotions = [];
        this.paginationData = {
            currentPage: 1,
            itemsPerPage: 0,
            totalItems: 0
        };
        this.search = {
            orderBy: '',
            search: '',
            filterDate: true
        };
        this.getPromotions(this.paginationData.currentPage);
    }
    PromotionsComponent.prototype.goBack = function () {
        this.location.back();
    };
    PromotionsComponent.prototype.onDelete = function (id) {
        var _this = this;
        this.promotionService.deletePromotion(id)
            .subscribe(function (res) {
            _this.toastr.success('Great!', res.message);
            console.log(res);
        }, function (error) {
            console.log(error);
        });
    };
    PromotionsComponent.prototype.getPage = function (page) {
        this.getPromotions(page);
    };
    PromotionsComponent.prototype.getPromotions = function (page) {
        var _this = this;
        this.promotionService.getPromotions(page, this.search)
            .subscribe(function (res) {
            _this.paginationData = res.paginationData;
            _this.fetchedPromotions = res.data;
        }, function (error) {
            console.log(error);
        });
    };
    PromotionsComponent.prototype.ngOnInit = function () { };
    PromotionsComponent.prototype.isAdmin = function () {
        return this.authService.isAdmin();
    };
    return PromotionsComponent;
}());
PromotionsComponent = __decorate([
    Component({
        selector: 'app-promotions',
        templateUrl: './promotions.component.html',
        styleUrls: ['./promotion.component.css'],
    }),
    __metadata("design:paramtypes", [PromotionService,
        ToastsManager,
        Location,
        AuthService])
], PromotionsComponent);
export { PromotionsComponent };
//# sourceMappingURL=promotions.component.js.map