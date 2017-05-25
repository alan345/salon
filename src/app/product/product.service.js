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
var ProductService = (function () {
    //  private token: string = localStorage.getItem('id_token');
    //  private productId: string = localStorage.getItem('productId');
    // private products = [];
    // private singleProduct = Object;
    function ProductService(http, errorService, toastr, authService) {
        this.http = http;
        this.errorService = errorService;
        this.toastr = toastr;
        this.authService = authService;
        this.url = '/';
    }
    ProductService.prototype.getProducts = function (page, search) {
        var _this = this;
        var headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', '' + this.authService.currentUser.token);
        var options = new RequestOptions({ headers: headers, search: search });
        return this.http.get(this.url + 'product/page/' + page, options)
            .timeout(9000)
            .map(function (response) {
            var products = response.json();
            return products;
        })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    };
    ProductService.prototype.countNewItemForUser = function () {
        var _this = this;
        var headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', '' + this.authService.currentUser.token);
        var options = new RequestOptions({ headers: headers });
        return this.http.get(this.url + 'product/countNewItemForUser/' + this.authService.currentUser.userId, options)
            .timeout(9000)
            .map(function (response) {
            var products = response.json();
            return products;
        })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    };
    //getProduct(id: string) : Observable<Product> {
    ProductService.prototype.getProduct = function (id) {
        var _this = this;
        var headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', '' + this.authService.currentUser.token);
        return this.http.get(this.url + 'product/' + id, { headers: headers })
            .map(function (response) {
            //console.log(response.json().item)
            return response.json().item;
            //  this.singleForm = response.json();
            //return this.singleForm;
        })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    };
    ProductService.prototype.deleteProduct = function (id) {
        var _this = this;
        var headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', '' + this.authService.currentUser.token);
        return this.http.delete(this.url + 'product/' + id, { headers: headers })
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
    ProductService.prototype.saveProduct = function (product) {
        var _this = this;
        //  console.log("this.authService.currentUser.token",this.authService.currentUser.token);
        //  delete product._id;
        delete product._id;
        //console.log(product)
        var body = JSON.stringify(product);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', '' + this.authService.currentUser.token);
        return this.http.post(this.url + 'product/', body, { headers: headers })
            .map(function (response) { return response.json(); })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    };
    ProductService.prototype.updateProduct = function (product) {
        var _this = this;
        var body = JSON.stringify(product);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', '' + this.authService.currentUser.token);
        return this.http.put(this.url + 'product/' + product._id, body, { headers: headers })
            .map(function (response) { return response.json(); })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    };
    return ProductService;
}());
ProductService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http,
        ErrorService,
        ToastsManager,
        AuthService])
], ProductService);
export { ProductService };
//# sourceMappingURL=product.service.js.map