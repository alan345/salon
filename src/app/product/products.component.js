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
import { AuthService } from '../auth/auth.service';
import { ProductService } from './product.service';
import { ToastsManager } from 'ng2-toastr';
import { MdDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { ViewEncapsulation } from '@angular/core';
var ProductsComponent = (function () {
    function ProductsComponent(sanitizer, productService, toastr, dialog, router, location, authService) {
        var _this = this;
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
        this.categoriesHard1 = [
            { name: 'Phyto', selected: false },
            { name: 'Phyto Specific', selected: false },
            { name: 'Subtil', selected: false }
        ];
        this.categoriesHard2 = [];
        this.categories2Dynamic = [
            [
                { name: 'Conditioners & masks', selected: false },
                { name: 'Diateray supplements', selected: false },
                { name: 'Leave-in care', selected: false },
                { name: 'Relaxers', selected: false },
                { name: 'Styling', selected: false },
                { name: 'Serums', selected: false },
                { name: 'Shampoos', selected: false },
                { name: 'Treatments', selected: false }
            ],
            [
                { name: 'Toto & masks', selected: false },
                { name: 'Tata & masks', selected: false },
            ],
            [
                { name: 'random Data', selected: false },
                { name: 'Random Data', selected: false },
            ]
        ];
        //
        // categories2PhytoSpecific =
        //
        // categories2Subtil =
        this.categories3 = [
            { name: 'COLORED', selected: false },
            { name: 'FINE', selected: false },
            { name: 'GRAY/PLATINUM', selected: false },
            { name: 'CURLY', selected: false },
            { name: 'NORMAL', selected: false },
            { name: 'RELAXED', selected: false },
            { name: 'UNRULY', selected: false },
        ];
        this.categories4 = [
            { name: 'DAMAGED', selected: false },
            { name: 'AGING', selected: false },
            { name: 'DRY', selected: false },
            { name: 'DANDRUFF', selected: false },
            { name: 'UNBALANCED SCALP', selected: false },
            { name: 'SENSITIVE SCALP', selected: false },
            { name: 'THINNING', selected: false },
            { name: 'LIFE-STRESSED', selected: false },
        ];
        this.showFilters = false;
        this.categories2 = '';
        this.categories1 = '';
        this.onSelectChange = function ($event) {
            _this.categories2 = $event.tab.textLabel;
            _this.updateCategerories();
        };
        this.onSelectChange1 = function ($event) {
            if ($event.tab.textLabel === _this.categoriesHard1[0].name)
                _this.categoriesHard2 = _this.categories2Dynamic[0];
            if ($event.tab.textLabel === _this.categoriesHard1[1].name)
                _this.categoriesHard2 = _this.categories2Dynamic[1];
            if ($event.tab.textLabel === _this.categoriesHard1[2].name)
                _this.categoriesHard2 = _this.categories2Dynamic[2];
            _this.categories1 = $event.tab.textLabel;
            _this.updateCategerories();
        };
    }
    ProductsComponent.prototype.goBack = function () {
        this.location.back();
    };
    ProductsComponent.prototype.updateCategerories = function () {
        var _this = this;
        this.search.categories = [];
        this.search.categories.push({ name: this.categories2 });
        this.search.categories.push({ name: this.categories1 });
        // if(this.inputSearch)
        //   this.search.categories.push({name:this.inputSearch})
        this.categories3.forEach(function (categorie3) {
            if (categorie3.selected == true) {
                _this.search.categories.push({ name: categorie3.name });
            }
        });
        this.categories4.forEach(function (categorie4) {
            if (categorie4.selected == true) {
                _this.search.categories.push({ name: categorie4.name });
            }
        });
        this.fetchedProducts = [];
        this.getProducts(1, this.search);
    };
    ProductsComponent.prototype.changeCateg3 = function (nameCateg) {
        var _this = this;
        this.categories3.forEach(function (categ, index) {
            if (categ.name === nameCateg) {
                _this.categories3[index].selected = !_this.categories3[index].selected;
            }
        });
        this.updateCategerories();
    };
    ProductsComponent.prototype.changeCateg4 = function (nameCateg) {
        var _this = this;
        this.categories4.forEach(function (categ, index) {
            if (categ.name === nameCateg) {
                _this.categories4[index].selected = !_this.categories4[index].selected;
            }
        });
        this.updateCategerories();
    };
    ProductsComponent.prototype.addSearchInput = function () {
        //    console.log(this.search.categories)
        this.updateCategerories();
        // this.search.categories.pop()
    };
    ProductsComponent.prototype.toogleFilters = function () {
        this.showFilters = !this.showFilters;
    };
    ProductsComponent.prototype.onDelete = function (id) {
        var _this = this;
        this.productService.deleteProduct(id)
            .subscribe(function (res) {
            _this.toastr.success('Great!', res.message);
            console.log(res);
        }, function (error) {
            console.log(error);
        });
    };
    // getPage(page: number) {
    //   this.getProducts(page, this.search);
    // }
    ProductsComponent.prototype.loadMore = function () {
        this.paginationData.currentPage = this.paginationData.currentPage + 1;
        this.getProducts(this.paginationData.currentPage, this.search);
    };
    ProductsComponent.prototype.getProducts = function (page, search) {
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
    ProductsComponent.prototype.ngOnInit = function () {
        this.categoriesHard2 = this.categories2Dynamic[0];
        this.categories1 = this.categoriesHard1[0].name;
        this.categories2 = this.categoriesHard2[0].name;
        this.updateCategerories();
    };
    ProductsComponent.prototype.isAdmin = function () {
        return this.authService.isAdmin();
    };
    return ProductsComponent;
}());
ProductsComponent = __decorate([
    Component({
        selector: 'app-products',
        templateUrl: './products.component.html',
        styleUrls: ['./product.component.css'],
        encapsulation: ViewEncapsulation.None
    }),
    __metadata("design:paramtypes", [DomSanitizer,
        ProductService,
        ToastsManager,
        MdDialog,
        Router,
        Location,
        AuthService])
], ProductsComponent);
export { ProductsComponent };
//# sourceMappingURL=products.component.js.map