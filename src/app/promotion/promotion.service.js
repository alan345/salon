var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Headers, Http, RequestOptions } from '@angular/http';
import { ErrorService } from '../errorHandler/error.service';
//import {Promotion} from './promotion.model';
import { ToastsManager } from 'ng2-toastr';
import { AuthService } from '../auth/auth.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { User } from '../user/user.model';
var PromotionService = (function () {
    //  private token: string = localStorage.getItem('id_token');
    //  private promotionId: string = localStorage.getItem('promotionId');
    // private promotions: Promotion[] = [];
    // private singlePromotion = Object;
    function PromotionService(http, errorService, toastr, requestOptions, authService) {
        this.http = http;
        this.errorService = errorService;
        this.toastr = toastr;
        this.requestOptions = requestOptions;
        this.authService = authService;
        this.url = '/';
    }
    // get promotion forms from backend in order to display them in the front end
    PromotionService.prototype.getPromotions = function (page, search) {
        var _this = this;
        var headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', '' + this.authService.currentUser.token);
        var options = new RequestOptions({ headers: headers, search: search });
        return this.http.get(this.url + 'promotion/page/' + page, options)
            .timeout(9000)
            .map(function (response) {
            var promotions = response.json();
            return promotions;
        })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    };
    //getPromotion(id: string) : Observable<Promotion> {
    PromotionService.prototype.getPromotion = function (id) {
        var _this = this;
        var headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', '' + this.authService.currentUser.token);
        return this.http.get(this.url + 'promotion/' + id, { headers: headers })
            .map(function (response) {
            return response.json().item;
        })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    };
    PromotionService.prototype.deletePromotion = function (id) {
        var _this = this;
        var headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', '' + this.authService.currentUser.token);
        return this.http.delete(this.url + 'promotion/' + id, { headers: headers })
            .map(function (response) {
            //  console.log("delete",response)
            return response.json();
            //  this.singleForm = response.json();
            //return this.singleForm;
        })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    };
    PromotionService.prototype.savePromotion = function (promotion) {
        var _this = this;
        //  console.log("this.authService.currentUser.token",this.authService.currentUser.token);
        //  delete promotion._id;
        promotion.owner = [];
        var currentUser = new User();
        currentUser._id = this.authService.currentUser.userId;
        promotion.owner.push(currentUser);
        var body = JSON.stringify(promotion);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        //  let headers = new Headers({'Content-Type': 'application/json'});
        headers.append('Authorization', '' + this.authService.currentUser.token);
        return this.http.post(this.url + 'promotion/', body, { headers: headers })
            .map(function (response) { return response.json(); })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    };
    PromotionService.prototype.updatePromotion = function (promotion) {
        var _this = this;
        var body = JSON.stringify(promotion);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', '' + this.authService.currentUser.token);
        return this.http.put(this.url + 'promotion/' + promotion._id, body, { headers: headers })
            .map(function (response) { return response.json(); })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    };
    return PromotionService;
}());
PromotionService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http,
        ErrorService,
        ToastsManager,
        RequestOptions,
        AuthService])
], PromotionService);
export { PromotionService };
//# sourceMappingURL=promotion.service.js.map