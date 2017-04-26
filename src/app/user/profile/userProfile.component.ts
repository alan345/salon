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
import { User } from '../users/user.model'
import { Form } from '../users/user.model'
import { EditOptionsComponentDialog } from '../../modalLibrary/modalLibrary.component'
import { FormBuilder, FormGroup, FormArray, FormControl, Validators} from '@angular/forms';


@Component({
  selector: 'app-users',
  templateUrl: './userProfile.component.html',
  styleUrls: ['./userProfile.component.css'],
})


export class UserProfileComponent implements OnInit {
  //fetchedUser = new User()
  //fetchedUser : User;
  maxPictureToShow=3;
  fetchedUser = {
    _id: '',
    lastVisit: '',
    email:'',
    forms:[{
      _id:'',
      owner:'',
      imagePath:'',
    }],
    profile:{
      title:'',
      name:'',
      lastName:'',
      hair:{
        hairDensity : '',
        hairPorosity : '',
        hairTexture : '',
      },
      _profilePicture:{
        _id:'',
        owner:'',
        imagePath:''
      },
    },
    notes:[{
      text:'',
      dateNote: ''
    }]
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
    private authService: AuthService,
  ) {
  }

  getObjects(myForm){
     return myForm.get('forms').controls
   }


  ngOnInit() {
    this.myForm = this._fb.group({
      lastVisit: [''],
      profile: this._fb.group({
        _profilePicture: this._fb.group({
          _id: ['', [Validators.required, Validators.minLength(5)]]
        }),
        name: ['', [Validators.required, Validators.minLength(2)]],
        lastName: ['', [Validators.required, Validators.minLength(2)]],
        title: ['', [Validators.required, Validators.minLength(2)]]
      }),
      forms: this._fb.array([])
    })



    this.activatedRoute.params.subscribe((params: Params) => {
      this.getUser(this.authService.currentUser.userId)
    })
  }






  removeForm(i: number) {
      this.fetchedUser.forms.splice(i, 1)
      const control = <FormArray>this.myForm.controls['forms'];
      control.removeAt(i)
      this.save()
  }
  addForm(form: Form) {
    const control = <FormArray>this.myForm.controls['forms'];
    const addrCtrl = this._fb.group({
        _id: ['', Validators.required],
        owner: ['', Validators.required],
        imagePath: ['', Validators.required],
    });
    control.push(addrCtrl);
  }


  goBack() {
    this.location.back();
  }
  seeAllPicture(){
    this.maxPictureToShow = 9999
  }
  openDialog(positionImage) {
    if(positionImage == '_profilePicture') {
      let dialogRef = this.dialog.open(EditOptionsComponentDialog);
      dialogRef.afterClosed().subscribe(result => {
        if(result) {
          this.fetchedUser.profile._profilePicture = result
          this.save()
        }
      })
    } else {
      let dialogRef = this.dialog.open(EditOptionsComponentDialog);
      dialogRef.afterClosed().subscribe(result => {
        if(result) {
          this.addForm(result)
          this.fetchedUser.forms.push(result)
          this.save()
        }
      })
    }
  }

  save() {
    this.userService.updateUser(this.fetchedUser)
      .subscribe(
        res => {
          this.toastr.success('Great!', res.message)
        },
        error => {console.log(error)}
      )
  }



  setDateToday(){
    this.fetchedUser.lastVisit = new Date().toLocaleDateString("en-US")
    this.userService.updateUser(this.fetchedUser)
      .subscribe(
        res => {
          this.toastr.success('Great!', res.message)
        },
        error => {console.log(error)}
      )
  }

  getUser(id : string) {
    this.userService.getUser(id)
      .subscribe(
        res => {
          this.fetchedUser = res.user
          this.fetchedUser.forms.forEach((form : Form) => {
            this.addForm(form)
          })
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
