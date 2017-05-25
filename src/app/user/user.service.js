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
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { AuthService } from '../auth/auth.service';
var UserService = (function () {
    function UserService(http, errorService, toastr, authService) {
        this.http = http;
        this.errorService = errorService;
        this.toastr = toastr;
        this.authService = authService;
        this.url = '/';
        //private token: string = localStorage.getItem('id_token');
        //private userId: string = localStorage.getItem('userId');
        this.users = [];
        this.singleUser = Object;
    }
    // get user forms from backend in order to display them in the front end
    UserService.prototype.getUsers = function (page, search) {
        var _this = this;
        var headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', '' + this.authService.currentUser.token);
        var options = new RequestOptions({ headers: headers, search: search });
        return this.http.get(this.url + 'profile/page/' + page, options)
            .timeout(9000)
            .map(function (response) {
            var users = response.json();
            return users;
        })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    };
    // get user forms from backend in order to display them in the front end
    UserService.prototype.getUsersByEmail = function (search) {
        var _this = this;
        var headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', '' + this.authService.currentUser.token);
        var options = new RequestOptions({ headers: headers, search: search });
        return this.http.get(this.url + 'profile/getUsersByEmail/', options)
            .timeout(9000)
            .map(function (response) {
            var users = response.json();
            return users;
        })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    };
    UserService.prototype.getUser = function (id) {
        var _this = this;
        var headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', '' + this.authService.currentUser.token);
        return this.http.get(this.url + 'profile/' + id, { headers: headers })
            .map(function (response) {
            return response.json();
            //  this.singleForm = response.json();
            //return this.singleForm;
        })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    };
    UserService.prototype.deleteUser = function (id) {
        var _this = this;
        var headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', '' + this.authService.currentUser.token);
        return this.http.delete(this.url + 'profile/' + id, { headers: headers })
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
    UserService.prototype.saveUser = function (user) {
        var _this = this;
        user.profile.parentUser = [];
        //  console.log(this.authService.currentUser.userId)
        user.profile.parentUser.push(this.authService.currentUser.userId);
        var body = JSON.stringify(user);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        //  let headers = new Headers({'Content-Type': 'application/json'});
        headers.append('Authorization', '' + this.authService.currentUser.token);
        return this.http.post(this.url + 'profile/', body, { headers: headers })
            .map(function (response) { return response.json(); })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    };
    UserService.prototype.updateUser = function (user) {
        var _this = this;
        var body = JSON.stringify(user);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', '' + this.authService.currentUser.token);
        return this.http.put(this.url + 'profile/' + user._id, body, { headers: headers })
            .map(function (response) { return response.json(); })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    };
    return UserService;
}());
UserService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http,
        ErrorService,
        ToastsManager,
        AuthService])
], UserService);
export { UserService };
//# sourceMappingURL=user.service.js.map