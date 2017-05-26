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
import { ProductService } from './product.service';
import { ToastsManager } from 'ng2-toastr';
import { MdDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Product } from './product.model';
import { EditOptionsComponentDialog } from '../modalLibrary/modalLibrary.component';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
var ProductSingleComponent = (function () {
    function ProductSingleComponent(sanitizer, productService, toastr, dialog, router, location, activatedRoute, _fb) {
        this.sanitizer = sanitizer;
        this.productService = productService;
        this.toastr = toastr;
        this.dialog = dialog;
        this.router = router;
        this.location = location;
        this.activatedRoute = activatedRoute;
        this._fb = _fb;
        this.urlMagento = 'http://52.2.61.43/pub/media/catalog/product';
        this.fetchedProduct = new Product(this.sanitizer);
        // fetchedProduct: Product = {
        //   _id: '',
        //   categories: [],
        //   categoriesTag: [],
        //   description: {
        //     benefitsAndResults: '',
        //     howToApply: '',
        //     activeIngredients: '',
        //     title : {
        //       prononciation: '',
        //       embed: '',
        //       embedSecure: this.sanitizer.bypassSecurityTrustResourceUrl(''),
        //     }
        //   },
        //   magento : {
        //     id: '',
        //     sku: '',
        //     name: '',
        //     price: 0,
        //     weight: '',
        //     custom_attributes: [],
        //   }
        // };
        this.categories5 = [
            { name: 'Benefits & Results', selected: false },
            { name: 'How to apply', selected: false },
            { name: 'Active Ingredients', selected: false },
        ];
        this.categoriesHard2 = [
            {
                name: 'treatments',
                selected: false
            },
            {
                name: 'knowledges',
                selected: false
            },
            {
                name: 'testimonials',
                selected: false
            },
            {
                name: 'merchandising',
                selected: false
            },
            {
                name: 'promotions',
                selected: false
            }
        ];
        this.categoriesHard1 = [{
                name: 'phyto',
                selected: false
            },
            {
                name: 'phytoSpecific',
                selected: false
            },
            {
                name: 'subtil',
                selected: false
            }];
        this.inputCategorie = '';
        this.onSelectChange = function ($event) {
            //
        };
    }
    ProductSingleComponent.prototype.getObjects = function (myForm) {
        //console.log(myForm.get('categories').controls)
        return myForm.get('categories').controls;
    };
    ProductSingleComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.myForm = this._fb.group({
            _id: [''],
            categories: this._fb.array([])
        });
        this.activatedRoute.params.subscribe(function (params) {
            if (params['id'])
                _this.getProduct(params['id']);
        });
    };
    ProductSingleComponent.prototype.removeCategorie = function (i) {
        this.fetchedProduct.categories.splice(i, 1);
        var control = this.myForm.controls['categories'];
        control.removeAt(i);
        var _2this = this;
        //  setTimeout(function(){
        _2this.refreshHardCategories();
        //  }, 10);
        //this.updatecategoriesHard2()
    };
    ProductSingleComponent.prototype.addCategorie = function () {
        //console.log('addCategorie')
        var control = this.myForm.controls['categories'];
        var addrCtrl = this._fb.group({
            name: [''],
            type: ['']
        });
        control.push(addrCtrl);
    };
    ProductSingleComponent.prototype.addCategorieInput = function () {
        //console.log('addCategorieInput')
        this.togglCategorieButton(this.inputCategorie, 'tag');
        this.inputCategorie = '';
    };
    ProductSingleComponent.prototype.togglCategorieButton = function (nameCateg, type) {
        //console.log('togglCategorieButton')
        var indexFound;
        this.fetchedProduct.categories.forEach(function (categorie, index) {
            if (categorie.name == nameCateg)
                indexFound = index;
        });
        if (indexFound || indexFound == 0) {
            var _2this_1 = this;
            setTimeout(function () {
                _2this_1.removeCategorie(+indexFound);
            }, 10);
        }
        else {
            this.fetchedProduct.categories.push({ name: nameCateg, type: type });
            this.addCategorie();
        }
    };
    ProductSingleComponent.prototype.goBack = function () {
        this.location.back();
    };
    // openDialogWhereProduct(){
    //   let dialogRefDelete = this.dialog.open(ProductWhereDialogComponent)
    //   dialogRefDelete.afterClosed().subscribe(result => {
    //     // if(result) {
    //     //   this.onDelete(this.fetchedProduct._id)
    //     //   this.router.navigate(['product']);
    //     // }
    //   })
    // }
    ProductSingleComponent.prototype.openDialog = function (positionImage) {
        var _this = this;
        var dialogRef = this.dialog.open(EditOptionsComponentDialog);
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this.fetchedProduct[positionImage] = result;
            }
        });
    };
    // openDialogDelete(){
    //   let dialogRefDelete = this.dialog.open(ProductDeleteDialog)
    //   dialogRefDelete.afterClosed().subscribe(result => {
    //     if(result) {
    //       this.onDelete(this.fetchedProduct._id)
    //       this.router.navigate(['product']);
    //     }
    //   })
    // }
    ProductSingleComponent.prototype.save = function (product) {
        var _this = this;
        //console.log(this.fetchedProduct)
        if (!this.fetchedProduct.categories.length) {
            this.toastr.error('Error!', 'Please select at least one categorie');
            return;
        }
        if (this.fetchedProduct._id) {
            this.productService.updateProduct(this.fetchedProduct)
                .subscribe(function (res) {
                _this.toastr.success('Great!', res.message);
                _this.router.navigate(['product']);
            }, function (error) { console.log(error); });
        }
        else {
            this.productService.saveProduct(this.fetchedProduct)
                .subscribe(function (res) {
                _this.toastr.success('Great!', res.message);
                _this.router.navigate(['product']);
            }, function (error) { console.log(error); });
        }
    };
    ProductSingleComponent.prototype.refreshHardCategories = function () {
        var _this = this;
        this.categoriesHard2.forEach(function (HardCategorie, indexHard) {
            _this.categoriesHard2[indexHard].selected = false;
        });
        this.categoriesHard2.forEach(function (HardCategorie, indexHard) {
            _this.fetchedProduct.categories.forEach(function (fetchedCategorie, indexFetched) {
                if (HardCategorie.name == fetchedCategorie.name) {
                    _this.categoriesHard2[indexHard].selected = true;
                }
            });
        });
        this.categoriesHard1.forEach(function (HardCategorie, indexHard) {
            _this.categoriesHard1[indexHard].selected = false;
        });
        this.categoriesHard1.forEach(function (HardCategorie, indexHard) {
            _this.fetchedProduct.categories.forEach(function (fetchedCategorie, indexFetched) {
                if (HardCategorie.name == fetchedCategorie.name) {
                    _this.categoriesHard1[indexHard].selected = true;
                }
            });
        });
    };
    ProductSingleComponent.prototype.getProduct = function (id) {
        var _this = this;
        this.productService.getProduct(id)
            .subscribe(function (res) {
            _this.fetchedProduct = res;
            //  this.fetchedProduct.embedSecure = this.sanitizer.bypassSecurityTrustResourceUrl('https://player.vimeo.com/product/' + res.embed )
            //this.fetchedProduct.embedSecure = this.sanitizer.bypassSecurityTrustResourceUrl('//fast.wistia.net/embed/iframe/' + res.embed)
            _this.fetchedProduct.description.title.embedSecure = _this.sanitizer.bypassSecurityTrustResourceUrl('https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/' + _this.fetchedProduct.description.title.embed);
            _this.fetchedProduct['categoriesTag'] = [];
            _this.fetchedProduct.categories.forEach(function (categorie) {
                _this.addCategorie();
                if (categorie.type === 'tag') {
                    _this.fetchedProduct['categoriesTag'].push(categorie);
                }
            });
            //this.fetchedProducts.push(product)
            // this.fetchedProduct.categories.forEach((categorie) => {
            //   this.addCategorie()
            // })
            _this.refreshHardCategories();
        }, function (error) {
            console.log(error);
        });
    };
    ProductSingleComponent.prototype.onDelete = function (id) {
        var _this = this;
        this.productService.deleteProduct(id)
            .subscribe(function (res) {
            _this.toastr.success('Great!', res.message);
        }, function (error) {
            console.log(error);
        });
    };
    return ProductSingleComponent;
}());
ProductSingleComponent = __decorate([
    Component({
        selector: 'app-products',
        templateUrl: './productSingle.component.html',
        styleUrls: ['./product.component.css'],
    }),
    __metadata("design:paramtypes", [DomSanitizer,
        ProductService,
        ToastsManager,
        MdDialog,
        Router,
        Location,
        ActivatedRoute,
        FormBuilder])
], ProductSingleComponent);
export { ProductSingleComponent };
//# sourceMappingURL=productSingle.component.js.map