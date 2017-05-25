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
import { Headers, Http } from '@angular/http';
import { ErrorService } from '../errorHandler/error.service';
import { ToastsManager } from 'ng2-toastr';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
var MainPageHomeService = (function () {
    //private userId: string = localStorage.getItem('userId');
    function MainPageHomeService(http, errorService, toastr) {
        this.http = http;
        this.errorService = errorService;
        this.toastr = toastr;
        this.url = '/';
        this.token = localStorage.getItem('id_token');
    }
    // get user forms from backend in order to display them in the front end
    MainPageHomeService.prototype.getOptions = function () {
        var _this = this;
        var headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', '' + this.token);
        return this.http.get(this.url + 'options/', { headers: headers })
            .timeout(8000)
            .map(function (response) {
            var obj = response.json();
            return obj;
        })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    };
    MainPageHomeService.prototype.updateOptions = function (options) {
        var _this = this;
        var body = JSON.stringify(options);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', '' + this.token);
        return this.http.put(this.url + 'options/' + 'updateoption', body, { headers: headers })
            .map(function (response) { return response.json(); })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    };
    return MainPageHomeService;
}());
MainPageHomeService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http, ErrorService, ToastsManager])
], MainPageHomeService);
export { MainPageHomeService };
//# sourceMappingURL=mainPageHome.service.js.map