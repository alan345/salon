import { Component, OnInit} from '@angular/core';
import { AuthService} from '../auth/auth.service';
import { ProductService} from './product.service';
//import {RegionComponent} from '../region/region.component';

import { ChangeDetectionStrategy, Input} from "@angular/core";
import { ToastsManager} from 'ng2-toastr';
import { Inject, forwardRef} from '@angular/core';
import { MdDialog, MdDialogRef} from '@angular/material';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { Product } from './product.model'
import { Form } from './product.model'
import { EditOptionsComponentDialog } from '../modalLibrary/modalLibrary.component'
import { FormBuilder, FormGroup, FormArray, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './singleProduct.component.html',
  styleUrls: ['./product.component.css'],

})


export class SingleProductComponent implements OnInit {
  //fetchedProduct = new Product()
  //fetchedProduct : Product;
  fetchedProduct = {
    _id: '',
    updatedAt: '',
    email:'',
    forms:[{
      _id:'',
      owner:'',
      imagePath:'',
    }],
    profile:{
      name:'',
      hair:{
        hairCondition : '',
        scalpCondition : '',
        hairTexture : '',
      }
    }
  }

  public myForm: FormGroup;

  constructor(
    private productService: ProductService,
    private toastr: ToastsManager,
    public dialog: MdDialog,
    private router: Router,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private _fb: FormBuilder,
  ) {
  }


  ngOnInit() {
    this.myForm = this._fb.group({
        email: ['', [Validators.required, Validators.minLength(5)]],
        _id: ['', [Validators.required, Validators.minLength(5)]],

        forms: this._fb.array([]),
        profile: this._fb.group({
            name: ['', [Validators.required, Validators.minLength(5)]],
            hair: this._fb.group({
                hairTexture: ['', <any>Validators.required],

            })
        })
    });



    this.activatedRoute.params.subscribe((params: Params) => {
      this.getProduct(params['id'])
    })
  }


  removeAddress(i: number) {
      const control = <FormArray>this.myForm.controls['addresses'];
      control.removeAt(i);
  }

  addAddress() {
    const control = <FormArray>this.myForm.controls['addresses'];
    const addrCtrl = this._fb.group({
        street: ['', Validators.required],
        postcode: ['']
    });
    control.push(addrCtrl);
  }

  removeForm(i: number) {
      this.fetchedProduct.forms.splice(i, 1)
      const control = <FormArray>this.myForm.controls['forms'];
      control.removeAt(i);
  }
  addForm(form: Form) {

    const control = <FormArray>this.myForm.controls['forms'];
    const addrCtrl = this._fb.group({
        _id: ['', Validators.required],
    });
    control.push(addrCtrl);
  }


  goBack() {
    this.location.back();
  }

  openDialog(positionImage) {
    let dialogRef = this.dialog.open(EditOptionsComponentDialog);
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.addForm(result)
        this.fetchedProduct.forms.push(result)
      }
    })
  }

  save(form) {
    let product = form.value
    console.log(product)
    // console.log(model);
    this.productService.updateProduct(product)
      .subscribe(
        res => {
          this.toastr.success('Great!', res.message)
        },
        error => {console.log(error)}
      );
    // console.log(model);
  }
  // save(model: FormGroup, isValid: boolean) {
  //   console.log(model)
  //
  //   this.productService.updateProduct(model)
  //     .subscribe(
  //       res => {
  //         this.toastr.success('Great!', res.message)
  //       },
  //       error => {console.log(error)}
  //     );
  //   }



  getProduct(id) {

    this.productService.getProduct(id)
      .subscribe(
        res => {
          this.fetchedProduct = res.product
          this.fetchedProduct.forms.forEach((form : Form) => {
            this.addForm(form)
          })
        },
        error => {
          console.log(error);
        }
      )
  }



  onDelete(id: string) {
    this.productService.deleteProduct(id)
      .subscribe(
        res => {
          this.toastr.success('Great!', res.message);
        },
        error => {
          console.log(error);
        }
      );
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
