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
import { AuthService } from '../../auth/auth.service';
import { ProductService } from '../product.service';
import { ToastsManager } from 'ng2-toastr';
import { MdDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { ViewEncapsulation } from '@angular/core';
var ProductsAdminComponent = (function () {
    function ProductsAdminComponent(sanitizer, productService, toastr, dialog, router, location, authService) {
        this.sanitizer = sanitizer;
        this.productService = productService;
        this.toastr = toastr;
        this.dialog = dialog;
        this.router = router;
        this.location = location;
        this.authService = authService;
        this.token = localStorage.getItem('id_token');
        this.fetchedProducts = [];
        this.urlMagento = 'http://52.2.61.43/pub/media/catalog/product';
        this.search = {
            categories: [],
            search: ''
        };
        //inputSearch:''
        this.paginationData = {
            currentPage: 1,
            itemsPerPage: 0,
            totalItems: 0
        };
        //
        // categoriesHard1 = [
        //   { name:'Phyto', selected : false },
        //   { name:'Phyto Specific', selected : false },
        //   { name:'Subtil', selected : false }
        // ]
        //
        // categoriesHard2 = []
        // categories2Dynamic = [
        //     [
        //       { name:'Conditioners & masks', selected : false },
        //       { name:'Diateray supplements', selected : false },
        //       { name:'Leave-in care', selected : false },
        //       { name:'Relaxers', selected : false },
        //       { name:'Styling', selected : false },
        //       { name:'Serums', selected : false },
        //       { name:'Shampoos', selected : false },
        //       { name:'Treatments', selected : false }
        //     ],
        //     [
        //      { name:'Toto & masks', selected : false },
        //      { name:'Tata & masks', selected : false },
        //    ],
        //    [
        //      { name:'random Data', selected : false },
        //      { name:'Random Data', selected : false },
        //    ]
        // ]
        //
        // categories2PhytoSpecific =
        //
        // categories2Subtil =
        // categories3 = [
        //   { name:'COLORED', selected : false},
        //   { name:'FINE', selected : false },
        //   { name:'GRAY/PLATINUM', selected : false },
        //   { name:'CURLY', selected : false },
        //   { name:'NORMAL', selected : false },
        //   { name:'RELAXED', selected : false },
        //   { name:'UNRULY', selected : false },
        // ]
        //
        // categories4 = [
        //   { name:'DAMAGED', selected : false},
        //   { name:'AGING', selected : false },
        //   { name:'DRY', selected : false },
        //   { name:'DANDRUFF', selected : false },
        //   { name:'UNBALANCED SCALP', selected : false },
        //   { name:'SENSITIVE SCALP', selected : false },
        //   { name:'THINNING', selected : false },
        //   { name:'LIFE-STRESSED', selected : false },
        // ]
        this.showFilters = false;
        this.categories2 = '';
        this.categories1 = '';
    }
    ProductsAdminComponent.prototype.goBack = function () {
        this.location.back();
    };
    ProductsAdminComponent.prototype.updateCategerories = function () {
        this.fetchedProducts = [];
        this.getProducts(1, this.search);
    };
    ProductsAdminComponent.prototype.addSearchInput = function () {
        //    console.log(this.search.categories)
        this.updateCategerories();
        // this.search.categories.pop()
    };
    ProductsAdminComponent.prototype.loadMore = function () {
        this.paginationData.currentPage = this.paginationData.currentPage + 1;
        this.getProducts(this.paginationData.currentPage, this.search);
    };
    ProductsAdminComponent.prototype.getProducts = function (page, search) {
        var _this = this;
        //this.fetchedProducts =[]
        this.loading = true;
        this.productService.getProducts(page, search)
            .subscribe(function (res) {
            if (page === 1)
                _this.fetchedProducts = [];
            _this.paginationData = res.paginationData;
            var fetchedProductsNotSecure = res.data;
            fetchedProductsNotSecure.forEach(function (product) {
                product['categoriesTag'] = [];
                product.categories.forEach(function (categorie) {
                    if (categorie.type === 'tag') {
                        product['categoriesTag'].push(categorie);
                    }
                });
                _this.fetchedProducts.push(product);
            });
            _this.loading = false;
        }, function (error) {
            console.log(error);
        });
    };
    ProductsAdminComponent.prototype.ngOnInit = function () {
        // this.categoriesHard2 = this.categories2Dynamic[0]
        // this.categories1 = this.categoriesHard1[0].name
        // this.categories2 = this.categoriesHard2[0].name
        this.updateCategerories();
    };
    ProductsAdminComponent.prototype.isAdmin = function () {
        return this.authService.isAdmin();
    };
    return ProductsAdminComponent;
}());
ProductsAdminComponent = __decorate([
    Component({
        selector: 'app-products',
        templateUrl: './productsAdmin.component.html',
        styleUrls: ['../../product/product.component.css'],
        encapsulation: ViewEncapsulation.None
    }),
    __metadata("design:paramtypes", [DomSanitizer,
        ProductService,
        ToastsManager,
        MdDialog,
        Router,
        Location,
        AuthService])
], ProductsAdminComponent);
export { ProductsAdminComponent };
//# sourceMappingURL=productsAdmin.component.js.map