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
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/operator/map';
import 'rxjs/operator/catch';
import { ToastsManager } from 'ng2-toastr';
import { ErrorService } from '../errorHandler/error.service';
import { tokenNotExpired } from 'angular2-jwt';
import { Router } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';
var AuthService = (function () {
    //public userId: string;
    function AuthService(http, errorService, toastr, router) {
        this.http = http;
        this.errorService = errorService;
        this.toastr = toastr;
        this.router = router;
        this.currentUser = {
            userId: '',
            token: '',
        };
        this.jwtHelper = new JwtHelper();
        // set token if saved in local storage
        //console.log('AuthService called')
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
        this.currentUser = currentUser;
    }
    // sending request to back end to register our user
    AuthService.prototype.signup = function (user) {
        var _this = this;
        var body = JSON.stringify(user);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post('/user/register', body, { headers: headers })
            .map(function (response) { return response.json(); })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    };
    // sending request to back end to login the user
    AuthService.prototype.signin = function (user) {
        var _this = this;
        var body = JSON.stringify(user);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post('/user/login', body, { headers: headers })
            .map(function (response) {
            var token = response.json() && response.json().token;
            var userId = response.json() && response.json().userId;
            if (token) {
                var currentUser = { userId: userId, token: token };
                _this.token = token;
                _this.currentUser = currentUser;
                //  console.log(this.currentUser)
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
            }
            // let id_token = response.json() && response.json().token;
            // let userId = response.json() && response.json().userId;
            // this.id_token = id_token
            // this.userId = userId
            //
            //
            //console.log(response)
            return response.json();
        })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    };
    AuthService.prototype.isAdmin = function () {
        var userInfo = localStorage.getItem('id_token') ? this.jwtHelper.decodeToken(localStorage.getItem('id_token')) : null;
        if (userInfo) {
            if (userInfo.user.role[0] === 'admin') {
                return true;
            }
        }
        return false;
    };
    AuthService.prototype.isStylist = function () {
        var userInfo = localStorage.getItem('id_token') ? this.jwtHelper.decodeToken(localStorage.getItem('id_token')) : null;
        if (userInfo) {
            if (userInfo.user.role[0] === 'stylist') {
                return true;
            }
        }
        return false;
    };
    AuthService.prototype.isSalesRep = function () {
        var userInfo = localStorage.getItem('id_token') ? this.jwtHelper.decodeToken(localStorage.getItem('id_token')) : null;
        if (userInfo) {
            if (userInfo.user.role[0] === 'salesRep') {
                return true;
            }
        }
        return false;
    };
    AuthService.prototype.isManager = function () {
        var userInfo = localStorage.getItem('id_token') ? this.jwtHelper.decodeToken(localStorage.getItem('id_token')) : null;
        if (userInfo) {
            if (userInfo.user.role[0] === 'manager') {
                return true;
            }
        }
        return false;
    };
    // sending request for password reset
    AuthService.prototype.forget = function (reset) {
        var _this = this;
        var body = JSON.stringify(reset);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post('/user/forgot', body, { headers: headers })
            .map(function (response) { return response.json(); })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    };
    // sending request with the newly created password
    AuthService.prototype.reset = function (reset) {
        var _this = this;
        var body = JSON.stringify(reset);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post('/user/reset/' + reset.token, body, { headers: headers })
            .map(function (response) { return response.json(); })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    };
    // logout function to be used in html file of both pages (login/register) in order to clear the localStorage from token and user id.
    AuthService.prototype.logout = function () {
        localStorage.clear();
        this.token = null;
        // this.router.navigate(['user/login']);
        //gooplus
        //location.reload();
        this.toastr.info('You have been logged out');
    };
    // check if the user is logged in or not, if token is expired, token is deleted from localstorage
    AuthService.prototype.isLoggedIn = function () {
        if (!tokenNotExpired()) {
            localStorage.clear();
        }
        return tokenNotExpired();
    };
    return AuthService;
}());
AuthService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http,
        ErrorService,
        ToastsManager,
        Router])
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map