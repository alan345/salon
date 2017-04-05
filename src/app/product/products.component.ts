import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {ProductService} from './product.service';
//import {RegionComponent} from '../region/region.component';
import {Product} from './product.model';
import {ChangeDetectionStrategy, Input} from "@angular/core";
import {ToastsManager} from 'ng2-toastr';
import {Inject, forwardRef} from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';
import {Router, ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';




@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./product.component.css'],

})
export class ProductsComponent implements OnInit {
  fetchedProducts : Array<ProductsComponent> = [];
  paginationData = {
    currentPage: 1,
    itemsPerPage: 0,
    totalItems: 0
  };


  constructor(
    private productService: ProductService,
    private toastr: ToastsManager,
    public dialog: MdDialog,
    private router: Router,
    private location: Location,
  ) {
    this.getProducts(this.paginationData.currentPage);
  }


  goBack() {
    this.location.back();
  }


  onDelete(id: string) {
    this.productService.deleteProduct(id)
      .subscribe(
        res => {
          this.toastr.success('Great!', res.message);
          console.log(res);
        },
        error => {
          console.log(error);
        }
      );
  }

  getPage(page: number) {

    this.getProducts(page);
  }

  getProducts(page) {
    this.productService.getProducts(page)
      .subscribe(
        res => {
          this.paginationData = res.paginationData;
          this.fetchedProducts =  res.data
        },
        error => {
          console.log(error);
        }
      );
  }





  ngOnInit() {

  }
}


// @Component({
//   selector: 'product-dialog',
//   templateUrl: './productDialog.component.html',
// })
// export class ProductDialogComponent {
//   constructor(public dialogRef: MdDialogRef<ProductDialogComponent>) {}
//
// }
