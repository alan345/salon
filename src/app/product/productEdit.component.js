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
var ProductEditComponent = (function () {
    function ProductEditComponent(sanitizer, productService, toastr, dialog, router, location, activatedRoute, _fb) {
        this.sanitizer = sanitizer;
        this.productService = productService;
        this.toastr = toastr;
        this.dialog = dialog;
        this.router = router;
        this.location = location;
        this.activatedRoute = activatedRoute;
        this._fb = _fb;
        this.loading = false;
        this.urlMagento = 'http://52.2.61.43/pub/media/catalog/product';
        this.fetchedProduct = new Product(this.sanitizer);
        this.fetchedRelatedProducts = [];
        this.categoriesHard2 = [
            { name: 'Conditioners & masks', selected: false },
            { name: 'Diateray supplements', selected: false },
            { name: 'Leave-in care', selected: false },
            { name: 'Relaxers', selected: false },
            { name: 'Styling', selected: false },
            { name: 'Serums', selected: false },
            { name: 'Shampoos', selected: false },
            { name: 'Treatments', selected: false }
        ];
        this.categoriesHard1 = [
            { name: 'Phyto', selected: false },
            { name: 'Phyto Specific', selected: false },
            { name: 'Subtil', selected: false }
        ];
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
        this.inputCategorie = '';
        this.inputRelatedProduct = '';
    }
    ProductEditComponent.prototype.getObjects = function (myForm) {
        //console.log(myForm.get('categories').controls)
        return myForm.get('categories').controls;
    };
    ProductEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.myForm = this._fb.group({
            _id: [''],
            description: this._fb.group({
                benefitsAndResults: [''],
                howToApply: [''],
                activeIngredients: [''],
                title: this._fb.group({
                    prononciation: [''],
                    embed: [''],
                })
            }),
            categories: this._fb.array([])
        });
        this.activatedRoute.params.subscribe(function (params) {
            if (params['id'])
                _this.getProduct(params['id']);
        });
    };
    ProductEditComponent.prototype.removeCategorie = function (i) {
        this.fetchedProduct.categories.splice(i, 1);
        var control = this.myForm.controls['categories'];
        control.removeAt(i);
        var _2this = this;
        //  setTimeout(function(){
        _2this.refreshHardCategories();
        //  }, 10);
        //this.updatecategoriesHard2()
    };
    ProductEditComponent.prototype.addCategorie = function () {
        //console.log('addCategorie')
        var control = this.myForm.controls['categories'];
        var addrCtrl = this._fb.group({
            name: [''],
            type: ['']
        });
        control.push(addrCtrl);
    };
    ProductEditComponent.prototype.addCategorieInput = function () {
        //console.log('addCategorieInput')
        this.togglCategorieButton(this.inputCategorie, 'tag');
        this.inputCategorie = '';
    };
    ProductEditComponent.prototype.togglCategorieButton = function (nameCateg, type) {
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
    ProductEditComponent.prototype.searchRelatedProducts = function () {
        var search = {
            categories: [],
            search: this.inputRelatedProduct
        };
        this.getProducts(1, search);
    };
    ProductEditComponent.prototype.getProducts = function (page, search) {
        var _this = this;
        //this.fetchedProducts =[]
        this.loading = true;
        this.productService.getProducts(page, search)
            .subscribe(function (res) {
            _this.fetchedRelatedProducts = [];
            _this.fetchedRelatedProducts = res.data;
            // let fetchedProductsNotSecure =  res.data
            // fetchedProductsNotSecure.forEach((product) => {
            //   product['categoriesTag'] = []
            //   product.categories.forEach((categorie) => {
            //     if(categorie.type === 'tag') {
            //       product['categoriesTag'].push(categorie)
            //     }
            //   })
            //   this.fetchedProducts.push(product)
            // })
            _this.loading = false;
        }, function (error) {
            console.log(error);
        });
    };
    ProductEditComponent.prototype.selectProduct = function (product) {
        this.fetchedProduct.relatedProducts.push(product);
        this.fetchedRelatedProducts = [];
        this.inputRelatedProduct = '';
    };
    ProductEditComponent.prototype.removeProduct = function (i) {
        this.fetchedProduct.relatedProducts.splice(i, 1);
    };
    ProductEditComponent.prototype.goBack = function () {
        this.location.back();
    };
    ProductEditComponent.prototype.disableInputRelatedProduct = function () {
        if (this.fetchedProduct.relatedProducts.length < 3)
            return false;
        return true;
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
    ProductEditComponent.prototype.openDialog = function (positionImage) {
        var _this = this;
        var dialogRef = this.dialog.open(EditOptionsComponentDialog);
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this.fetchedProduct[positionImage] = result;
            }
        });
    };
    ProductEditComponent.prototype.save = function (product) {
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
                //this.router.navigate(['product']);
                _this.goBack();
            }, function (error) { console.log(error); });
        }
        else {
            this.productService.saveProduct(this.fetchedProduct)
                .subscribe(function (res) {
                _this.toastr.success('Great!', res.message);
                //this.router.navigate(['product']);
                _this.goBack();
            }, function (error) { console.log(error); });
        }
    };
    ProductEditComponent.prototype.refreshHardCategories = function () {
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
        this.categories3.forEach(function (categorie, index) {
            _this.categories3[index].selected = false;
        });
        this.categories3.forEach(function (categorie, index) {
            _this.fetchedProduct.categories.forEach(function (fetchedCategorie, indexFetched) {
                if (categorie.name == fetchedCategorie.name) {
                    _this.categories3[index].selected = true;
                }
            });
        });
        this.categories4.forEach(function (categorie, index) {
            _this.categories4[index].selected = false;
        });
        this.categories4.forEach(function (categorie, index) {
            _this.fetchedProduct.categories.forEach(function (fetchedCategorie, indexFetched) {
                if (categorie.name == fetchedCategorie.name) {
                    _this.categories4[index].selected = true;
                }
            });
        });
    };
    ProductEditComponent.prototype.getProduct = function (id) {
        var _this = this;
        this.productService.getProduct(id)
            .subscribe(function (res) {
            _this.fetchedProduct = res;
            //  this.fetchedProduct.embedSecure = this.sanitizer.bypassSecurityTrustResourceUrl('https://player.vimeo.com/product/' + res.embed )
            //this.fetchedProduct.embedSecure = this.sanitizer.bypassSecurityTrustResourceUrl('//fast.wistia.net/embed/iframe/' + res.embed)
            _this.fetchedProduct.categories.forEach(function (categorie) {
                _this.addCategorie();
            });
            _this.refreshHardCategories();
        }, function (error) {
            console.log(error);
        });
    };
    ProductEditComponent.prototype.onDelete = function (id) {
        var _this = this;
        this.productService.deleteProduct(id)
            .subscribe(function (res) {
            _this.toastr.success('Great!', res.message);
        }, function (error) {
            console.log(error);
        });
    };
    return ProductEditComponent;
}());
ProductEditComponent = __decorate([
    Component({
        selector: 'app-products',
        templateUrl: './productEdit.component.html',
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
], ProductEditComponent);
export { ProductEditComponent };
//# sourceMappingURL=productEdit.component.js.map