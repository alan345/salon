import { Component, OnInit} from '@angular/core';
import { AuthService} from '../auth/auth.service';
import { PressService} from './press.service';
//import {RegionComponent} from '../region/region.component';

import { ChangeDetectionStrategy, Input} from "@angular/core";
import { ToastsManager} from 'ng2-toastr';
import { Inject, forwardRef} from '@angular/core';
import { MdDialog, MdDialogRef} from '@angular/material';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { Press } from './press.model'
import { EditOptionsComponentDialog } from '../modalLibrary/modalLibrary.component'
import { FormBuilder, FormGroup, FormArray, FormControl, Validators} from '@angular/forms';
import { PressDeleteDialog } from './pressDeleteDialog.component'



@Component({
  selector: 'app-presses',
  templateUrl: './pressSingle.component.html',
  styleUrls: ['./press.component.css'],

})

export class PressSingleComponent implements OnInit {
  //fetchedPress = new Press()
  //fetchedPress: Press;
  //fetchedPress._id='';


  fetchedPress : Press = {
    _id: '',
    title: '',
    link: '',
    formPDF: [],
    form: [],
    owner: []
  }


  public myForm: FormGroup;

  constructor(
    private pressService: PressService,
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
      title: ['', [Validators.required, Validators.minLength(5)]],
      link: [''],
    });

    //this.addAddress();

    this.activatedRoute.params.subscribe((params: Params) => {
      if(params['id'])
       this.getPress(params['id'])
    })
  }


  openDialogDelete(){
    let dialogRefDelete = this.dialog.open(PressDeleteDialog)
    dialogRefDelete.afterClosed().subscribe(result => {
      if(result) {
        this.onDelete(this.fetchedPress._id)
        this.router.navigate(['press']);
      }
    })
  }


  // removeAddress(i: number) {
  //     const control = <FormArray>this.myForm.controls['addresses'];
  //     control.removeAt(i);
  // }
  //
  // addAddress() {
  //   const control = <FormArray>this.myForm.controls['addresses'];
  //   const addrCtrl = this._fb.group({
  //       street: ['', Validators.required],
  //       postcode: ['']
  //   });
  //   control.push(addrCtrl);
  // }

  // removeForm(i: number) {
  //     this.fetchedPress.forms.splice(i, 1)
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
    let dialogRef = this.dialog.open(EditOptionsComponentDialog)

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.fetchedPress[positionImage][0] = result
      }
    })
  }

  save() {
    let press: Press = this.fetchedPress
    if(press._id) {
      this.pressService.updatePress(press)
        .subscribe(
          res => {
            this.toastr.success('Great!', res.message)
            this.router.navigate(['press'])
          },
          error => {console.log(error)}
        );
    } else {
      this.pressService.savePress(press)
        .subscribe(
          res => {
            this.toastr.success('Great!', res.message)
            this.router.navigate(['press'])
          },
          error => {console.log(error)}
        );
    }
  }




  getPress(id: string) {
    this.pressService.getPress(id)
      .subscribe(
        res => {
          this.fetchedPress = res
        },
        error => {
          console.log(error);
        }
      )
  }



  onDelete(id: string) {
    this.pressService.deletePress(id)
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
//   selector: 'press-dialog',
//   templateUrl: './pressDialog.component.html',
// })
// export class PressDialogComponent {
//   constructor(public dialogRef: MdDialogRef<PressDialogComponent>) {}
//
// }
