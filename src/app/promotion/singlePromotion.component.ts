import { Component, OnInit} from '@angular/core';
import { AuthService} from '../auth/auth.service';
import { PromotionService} from './promotion.service';
//import {RegionComponent} from '../region/region.component';

import { ChangeDetectionStrategy, Input} from "@angular/core";
import { ToastsManager} from 'ng2-toastr';
import { Inject, forwardRef} from '@angular/core';
import { MdDialog, MdDialogRef} from '@angular/material';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { Promotion } from './promotion.model'
import { EditOptionsComponentDialog } from '../modalLibrary/modalLibrary.component'
import { FormBuilder, FormGroup, FormArray, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-promotions',
  templateUrl: './singlePromotion.component.html',
  styleUrls: ['./promotion.component.css'],

})

export class SinglePromotionComponent implements OnInit {
  //fetchedPromotion = new Promotion()
  //fetchedPromotion: Promotion;
  //fetchedPromotion._id='';


  fetchedPromotion = {
    _id: '',
    date:{
      dateBegin:'',
      dateEnd:'',
    },
    name:'',
    form:{
      _id:'',
      owner:'',
      imagePath:'',
    }
  }

  public myForm: FormGroup;

  constructor(
    private promotionService: PromotionService,
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

        _id: [''],
        name: ['', [Validators.required, Validators.minLength(5)]],
        form: this._fb.group({
          _id: ['', [Validators.required, Validators.minLength(5)]]
        }),
        date: this._fb.group({
            dateBegin: ['', [Validators.required, Validators.minLength(5)]],
            dateEnd: ['', [Validators.required, Validators.minLength(5)]],
        })
    });

    //this.addAddress();

    this.activatedRoute.params.subscribe((params: Params) => {
      if(params['id'])
        this.getPromotion(params['id'])
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

  // removeForm(i: number) {
  //     this.fetchedPromotion.forms.splice(i, 1)
  //     const control = <FormArray>this.myForm.controls['forms'];
  //     control.removeAt(i);
  // }

  // addForm(form: Form) {
  //
  //   const control = <FormArray>this.myForm.controls['forms'];
  //   const addrCtrl = this._fb.group({
  //       _id: ['', Validators.required],
  //   });
  //   control.push(addrCtrl);
  // }


  goBack() {
    this.location.back();
  }

  openDialog(positionImage) {
    let dialogRef = this.dialog.open(EditOptionsComponentDialog);
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.fetchedPromotion.form = result
      }
    })
  }

  save(form) {


    if(this.fetchedPromotion._id) {
      this.promotionService.updatePromotion(this.fetchedPromotion)
        .subscribe(
          res => {
            this.toastr.success('Great!', res.message)
          },
          error => {console.log(error)}
        )
    } else {
      this.promotionService.savePromotion(this.fetchedPromotion)
        .subscribe(
          res => {
            this.toastr.success('Great!', res.message)
          },
          error => {console.log(error)}
        );
    }



    // console.log(model);

    // console.log(model);
  }
  // save(model: FormGroup, isValid: boolean) {
  //   console.log(model)
  //
  //   this.promotionService.updatePromotion(model)
  //     .subscribe(
  //       res => {
  //         this.toastr.success('Great!', res.message)
  //       },
  //       error => {console.log(error)}
  //     );
  //   }



  getPromotion(id) {

    this.promotionService.getPromotion(id)
      .subscribe(
        res => {
          this.fetchedPromotion = res
        },
        error => {
          console.log(error);
        }
      )
  }



  onDelete(id: string) {
    this.promotionService.deletePromotion(id)
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
//   selector: 'promotion-dialog',
//   templateUrl: './promotionDialog.component.html',
// })
// export class PromotionDialogComponent {
//   constructor(public dialogRef: MdDialogRef<PromotionDialogComponent>) {}
//
// }
