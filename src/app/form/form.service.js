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
var FormService = (function () {
    function FormService(http, errorService, toastr, requestOptions, authService) {
        this.http = http;
        this.errorService = errorService;
        this.toastr = toastr;
        this.requestOptions = requestOptions;
        this.authService = authService;
        this.url = '/';
        this.token = localStorage.getItem('id_token');
        this.userId = localStorage.getItem('userId');
        this.forms = [];
        this.singleForm = Object;
    }
    // get user forms from backend in order to display them in the front end
    FormService.prototype.getUserForms = function (page, search) {
        var _this = this;
        var headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', '' + this.authService.currentUser.token);
        var options = new RequestOptions({ headers: headers, search: search });
        return this.http.get(this.url + 'forms/page/' + page, options)
            .timeout(8000)
            .map(function (response) {
            return response.json();
        })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    };
    // getUserFormsByUserId(userId) {
    //   console.log(userId)
    //   let headers = new Headers({'Content-Type': 'application/json'});
    //   headers.append('Authorization', '' + this.token);
    //   return this.http.get(this.url + 'forms/form/' + userId, {headers: headers})
    //     .timeout(8000)
    //     .map((response: Response) => {
    //
    //       const forms = response.json().forms;
    //       let fetchedForms = [];
    //       for (let form of forms) {
    //         fetchedForms.push(form);
    //       }
    //
    //       this.forms = fetchedForms;
    //       return fetchedForms;
    //     })
    //     .catch((error: Response) => {
    //       this.errorService.handleError(error.json());
    //       return Observable.throw(error.json());
    //     });
    // }
    FormService.prototype.deleteForm = function (form) {
        var _this = this;
        this.forms.splice(this.forms.indexOf(form), 1);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', '' + this.token);
        return this.http.delete(this.url + 'forms/' + form, { headers: headers })
            .map(function (response) {
            _this.toastr.success('Form deleted successfully!');
            response.json();
        })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    };
    FormService.prototype.getSingleForm = function (formId) {
        var _this = this;
        var headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', '' + this.token);
        return this.http.get(this.url + 'forms/edit/' + formId, { headers: headers })
            .map(function (response) {
            _this.singleForm = response.json();
            return _this.singleForm;
        })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    };
    return FormService;
}());
FormService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http,
        ErrorService,
        ToastsManager,
        RequestOptions,
        AuthService])
], FormService);
export { FormService };
//# sourceMappingURL=form.service.js.map