import { Component, OnInit} from '@angular/core';
import { AuthService} from '../auth/auth.service';
import { SocialService} from './social.service';
//import {RegionComponent} from '../region/region.component';

import { ChangeDetectionStrategy, Input} from "@angular/core";
import { ToastsManager} from 'ng2-toastr';
import { Inject, forwardRef} from '@angular/core';
import { MdDialog, MdDialogRef} from '@angular/material';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { Social } from './social.model'
import { EditOptionsComponentDialog } from '../modalLibrary/modalLibrary.component'
import { FormBuilder, FormGroup, FormArray, FormControl, Validators} from '@angular/forms';
import { SocialDeleteDialog } from './socialDeleteDialog.component'


@Component({
  selector: 'app-socials',
  templateUrl: './singleSocial.component.html',
  styleUrls: ['./social.component.css'],

})

export class SingleSocialComponent implements OnInit {
  //fetchedSocial = new Social()
  //fetchedSocial: Social;
  //fetchedSocial._id='';


  fetchedSocial = {
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
    private socialService: SocialService,
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
        this.getSocial(params['id'])
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
  //     this.fetchedSocial.forms.splice(i, 1)
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
        this.fetchedSocial.form = result
      }
    })
  }

  save(form) {
    if(this.fetchedSocial._id) {
      this.socialService.updateSocial(this.fetchedSocial)
        .subscribe(
          res => {
            this.toastr.success('Great!', res.message)
          },
          error => {console.log(error)}
        )
    } else {
      this.socialService.saveSocial(this.fetchedSocial)
        .subscribe(
          res => {
            this.toastr.success('Great!', res.message)
          },
          error => {console.log(error)}
        );
    }
  }

  openDialogDelete(){
    let dialogRefDelete = this.dialog.open(SocialDeleteDialog)
    dialogRefDelete.afterClosed().subscribe(result => {
      if(result) {
        this.onDelete(this.fetchedSocial._id)
        this.router.navigate(['social']);
      }
    })
  }


  getSocial(id) {

    this.socialService.getSocial(id)
      .subscribe(
        res => {
          this.fetchedSocial = res
        },
        error => {
          console.log(error);
        }
      )
  }



  onDelete(id: string) {
    this.socialService.deleteSocial(id)
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
//   selector: 'social-dialog',
//   templateUrl: './socialDialog.component.html',
// })
// export class SocialDialogComponent {
//   constructor(public dialogRef: MdDialogRef<SocialDialogComponent>) {}
//
// }
