import { Component, OnInit} from '@angular/core';
import { AuthService} from '../../auth/auth.service';
import { UserService} from '../user.service';
//import {RegionComponent} from '../region/region.component';

import { ChangeDetectionStrategy, Input} from "@angular/core";
import { ToastsManager} from 'ng2-toastr';
import { Inject, forwardRef} from '@angular/core';
import { MdDialog, MdDialogRef} from '@angular/material';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { User } from './user.model'
import { EditOptionsComponentDialog } from '../../modalLibrary/modalLibrary.component'
import { FormBuilder, FormGroup, FormArray, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './singleUser.component.html',
  styleUrls: ['./user.component.css'],

})

export class SingleUserComponent implements OnInit {
  //fetchedUser = new User()
  fetchedUser = {
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
        hairDensity : '',
        hairPorosity : '',
        hairTexture : '',
      }
    }
  }

  public myForm: FormGroup;

  constructor(
    private userService: UserService,
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
        addresses: this._fb.array([]),
        forms: this._fb.array([]),
        profile: this._fb.group({
            name: ['', [Validators.required, Validators.minLength(5)]],
            hair: this._fb.group({
                hairTexture: ['', <any>Validators.required],

            })
        })
    });

    this.addAddress();
    this.addForm();
    this.activatedRoute.params.subscribe((params: Params) => {
      this.getUser(params['id'])
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
      const control = <FormArray>this.myForm.controls['forms'];
      control.removeAt(i);
  }
  addForm() {
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
        this.fetchedUser.forms.push(result)
      }
    })
  }

  save(model: User) {
      // call API to save
      // ...
      console.log(model);
  }
  // save(model: FormGroup, isValid: boolean) {
  //   console.log(model)
  //
  //   this.userService.updateUser(model)
  //     .subscribe(
  //       res => {
  //         this.toastr.success('Great!', res.message)
  //       },
  //       error => {console.log(error)}
  //     );
  //   }



  getUser(id) {
    this.userService.getUser(id)
      .subscribe(
        res => {
          this.fetchedUser = res.user

        },
        error => {
          console.log(error);
        }
      )
  }



  onDelete(id: string) {
    this.userService.deleteUser(id)
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
//   selector: 'user-dialog',
//   templateUrl: './userDialog.component.html',
// })
// export class UserDialogComponent {
//   constructor(public dialogRef: MdDialogRef<UserDialogComponent>) {}
//
// }
