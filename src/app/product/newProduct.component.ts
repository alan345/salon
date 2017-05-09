import { Component, OnInit} from '@angular/core';
import { AuthService} from '../auth/auth.service';
import { ProductService} from './product.service';
//import {RegionComponent} from '../region/region.component';
//import {Product} from '../product.model';
import { ChangeDetectionStrategy, Input} from "@angular/core";
import { ToastsManager} from 'ng2-toastr';
import { Inject, forwardRef} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { Location } from '@angular/common';



@Component({
  selector: 'app-products',
  templateUrl: './newProduct.component.html',
  styleUrls: ['./product.component.css'],

})
export class NewProductComponent implements OnInit {
  fetchedProduct = {
    profile: {
      name : '',
      hair: {
        hairCondition : 'Normal',
        scalpCondition : 'Healthy',
        hairTexture : 'Fine',
      }
    }
  }
  myForm: FormGroup;


  constructor(
    private productService: ProductService,
    private toastr: ToastsManager,
    private router: Router,
    private location: Location,
  ) {}

  goBack() {
    this.location.back();
  }

  save(model: FormGroup, isValid: boolean) {
    console.log(model)
    this.productService.saveProduct(model)
      .subscribe(
        res => {
          this.toastr.success('Great!', res.message)
        },
        error => {console.log(error)}
      );
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





  ngOnInit() {
    //this.fetchedProduct.profile.name = 'toto'
  }
}
