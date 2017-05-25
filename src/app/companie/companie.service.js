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
import { ToastsManager } from 'ng2-toastr';
import { AuthService } from '../auth/auth.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
var CompanieService = (function () {
    function CompanieService(http, errorService, toastr, authService) {
        this.http = http;
        this.errorService = errorService;
        this.toastr = toastr;
        this.authService = authService;
        this.url = '/';
        //  private token: string = localStorage.getItem('id_token');
        //  private userId: string = localStorage.getItem('userId');
        this.companiesForCurrentUser = [];
        this.singleCompanie = Object;
    }
    CompanieService.prototype.getCompanies = function (page, search) {
        var _this = this;
        var headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', '' + this.authService.currentUser.token);
        var options = new RequestOptions({ headers: headers, search: search });
        return this.http.get(this.url + 'companie/page/' + page, options)
            .timeout(5000)
            .map(function (response) {
            var companies = response.json();
            return companies;
        })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    };
    CompanieService.prototype.getCompanieForCurrentUser = function () {
        var _this = this;
        // if(this.companiesForCurrentUser.length) {
        //   return Observable.of(this.companiesForCurrentUser)
        // } else {
        //   let id = this.authService.currentUser.userId
        //   let headers = new Headers({'Content-Type': 'application/json'});
        //   headers.append('Authorization', '' + this.authService.currentUser.token);
        //   return this.http.get(this.url + 'companie/byuserid/' + id, {headers: headers})
        //     .map((response: Response) => {
        //       this.companiesForCurrentUser = response.json().item
        //       return this.companiesForCurrentUser
        //     })
        //     .catch((error: Response) => {
        //       this.errorService.handleError(error.json());
        //       return Observable.throw(error.json());
        //     });
        // }
        var id = this.authService.currentUser.userId;
        var headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', '' + this.authService.currentUser.token);
        return this.http.get(this.url + 'companie/byuserid/' + id, { headers: headers })
            .map(function (response) {
            return response.json().item;
        })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    };
    CompanieService.prototype.getCompanieByUserId = function (id) {
        var _this = this;
        var headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', '' + this.authService.currentUser.token);
        return this.http.get(this.url + 'companie/byuserid/' + id, { headers: headers })
            .map(function (response) {
            return response.json().item;
        })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    };
    CompanieService.prototype.getCompanie = function (id, search) {
        var _this = this;
        var headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', '' + this.authService.currentUser.token);
        var options = new RequestOptions({ headers: headers, search: search });
        return this.http.get(this.url + 'companie/' + id, options)
            .map(function (response) {
            return response.json().item;
            //  this.singleForm = response.json();
            //return this.singleForm;
        })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    };
    CompanieService.prototype.deleteCompanie = function (id) {
        var _this = this;
        var headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', '' + this.authService.currentUser.token);
        return this.http.delete(this.url + 'companie/' + id, { headers: headers })
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
    CompanieService.prototype.saveCompanie = function (companie) {
        var _this = this;
        //  console.log("this.authService.currentUser.token",this.authService.currentUser.token);
        delete companie._id;
        var body = JSON.stringify(companie);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        //  let headers = new Headers({'Content-Type': 'application/json'});
        headers.append('Authorization', '' + this.authService.currentUser.token);
        return this.http.post(this.url + 'companie/', body, { headers: headers })
            .map(function (response) { return response.json(); })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    };
    CompanieService.prototype.updateCompanie = function (companie) {
        var _this = this;
        var body = JSON.stringify(companie);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', '' + this.authService.currentUser.token);
        return this.http.put(this.url + 'companie/' + companie._id, body, { headers: headers })
            .map(function (response) { return response.json(); })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    };
    return CompanieService;
}());
CompanieService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http,
        ErrorService,
        ToastsManager,
        AuthService])
], CompanieService);
export { CompanieService };
//# sourceMappingURL=companie.service.js.map