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
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs';
import { ErrorService } from '../../errorHandler/error.service';
import { ToastsManager } from 'ng2-toastr';
import { JwtHelper } from 'angular2-jwt';
import { AuthService } from '../../auth/auth.service';
var AdminService = (function () {
    function AdminService(http, errorService, toastr, authService) {
        this.http = http;
        this.errorService = errorService;
        this.toastr = toastr;
        this.authService = authService;
        this.url = '/admin';
        this.token = localStorage.getItem('id_token');
        this.forms = [];
        this.singleForm = Object;
        this.jwtHelper = new JwtHelper();
    }
    AdminService.prototype.getUserForms = function () {
        var _this = this;
        if (this.authService.isLoggedIn()) {
            var token = localStorage.getItem('id_token');
            var headers = new Headers({ 'Content-Type': 'application/json' });
            headers.append('Authorization', '' + token);
            return this.http.get(this.url, { headers: headers })
                .map(function (response) {
                var forms = response.json().forms;
                var fetchedForms = [];
                for (var _i = 0, forms_1 = forms; _i < forms_1.length; _i++) {
                    var form = forms_1[_i];
                    fetchedForms.push(form);
                }
                _this.forms = fetchedForms;
                return fetchedForms;
            })
                .catch(function (error) {
                _this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
        }
    };
    AdminService.prototype.deleteForm = function (form) {
        var _this = this;
        this.forms.splice(this.forms.indexOf(form), 1);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', '' + this.token);
        return this.http.delete(this.url + '/' + form, { headers: headers })
            .map(function (response) {
            _this.toastr.success('Form deleted successfully!');
            response.json();
        })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    };
    AdminService.prototype.getSingleForm = function (formId) {
        var _this = this;
        var headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', '' + this.token);
        return this.http.get(this.url + '/edit/' + formId, { headers: headers })
            .map(function (response) {
            _this.singleForm = response.json();
            return _this.singleForm;
        })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    };
    // check if user is an Administrator by decoding the token from localStorage
    AdminService.prototype.isAdmin = function () {
        var userInfo = localStorage.getItem('id_token') ? this.jwtHelper.decodeToken(localStorage.getItem('id_token')) : null;
        if (userInfo) {
            if (userInfo.user.role[0] === 'admin') {
                return true;
            }
        }
        return false;
    };
    return AdminService;
}());
AdminService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http,
        ErrorService,
        ToastsManager,
        AuthService])
], AdminService);
export { AdminService };
//# sourceMappingURL=admin.service.js.map