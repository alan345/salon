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
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ErrorService } from '../../errorHandler/error.service';
import { AuthService } from '../../auth/auth.service';
var ProfileService = (function () {
    // private token = localStorage.getItem('id_token');
    // private userId = localStorage.getItem('userId');
    function ProfileService(http, errorService, authService) {
        this.http = http;
        this.errorService = errorService;
        this.authService = authService;
        this.token = localStorage.getItem('id_token');
        this.userId = localStorage.getItem('userId');
        this.url = '/profile/';
    }
    // get user details from database to display them in front end profile page
    ProfileService.prototype.getUserDetails = function (userId) {
        var _this = this;
        if (this.authService.isLoggedIn()) {
            var token = this.authService.currentUser.token;
            var userId_1 = this.authService.currentUser.userId;
            var headers = new Headers({ 'Content-Type': 'application/json' });
            headers.append('Authorization', '' + token);
            return this.http.get(this.url + userId_1, { headers: headers })
                .map(function (response) { return response.json(); })
                .catch(function (error) {
                _this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
        }
    };
    ProfileService.prototype.updateUser = function (user) {
        var _this = this;
        //  console.log(user)
        var body = JSON.stringify(user);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', '' + this.token);
        return this.http.put('/profile/' + user._id, body, { headers: headers })
            .map(function (response) { return response.json(); })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    };
    // submit the new password via the form in front end
    ProfileService.prototype.newPassword = function (newPass) {
        var _this = this;
        if (this.authService.isLoggedIn()) {
            var token = localStorage.getItem('id_token');
            var body = JSON.stringify(newPass);
            var headers = new Headers({ 'Content-Type': 'application/json' });
            headers.append('Authorization', '' + token);
            return this.http.post('/profile/password', body, { headers: headers })
                .map(function (response) { return response.json(); })
                .catch(function (error) {
                _this.errorService.handleError((error.json()));
                return Observable.throw(error.json());
            });
        }
    };
    return ProfileService;
}());
ProfileService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http, ErrorService, AuthService])
], ProfileService);
export { ProfileService };
//# sourceMappingURL=profile.service.js.map