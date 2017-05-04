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
import { User } from '../user.model'
import { Form } from '../../form/form.model'
import { EditOptionsComponentDialog } from '../../modalLibrary/modalLibrary.component'
import { FormBuilder, FormGroup, FormArray, FormControl, Validators} from '@angular/forms';


@Component({
  selector: 'app-users',
  templateUrl: './singleUser.component.html',
  styleUrls: ['./user.component.css'],
})


export class SingleUserComponent implements OnInit {
  //fetchedUser = new User()
  //fetchedUser : User;
  maxPictureToShow=3
  fetchedUser : User = {
    _id: '',
    lastVisit: new Date,
    email:'',
    profile:{
      parentUser:[],
      isFeatured:false,
      phoneNumber:'',
      name:'',
      lastName:'',
      title:'',
      _profilePicture:[],
      hair:{
        hairDensity : 'alan',
        hairPorosity : 'alan',
        hairTexture : 'alan',
      }
    },
    notes:[],
    forms:[],
    role:[],
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

  getObjects(myForm){
     return myForm.get('forms').controls
   }



  ngOnInit() {
    this.myForm = this._fb.group({
      lastVisit: [''],
      forms: this._fb.array([])
    })



    this.activatedRoute.params.subscribe((params: Params) => {
      this.getUser(params['id'])
    })
  }



  removeNote(i: number){
    this.fetchedUser.notes.splice(i, 1)

    this.save()
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
    this.router.navigate(['user/' + this.fetchedUser._id + "/userPictures"]);
  }
  openDialog(positionImage) {
    let dialogRef = this.dialog.open(EditOptionsComponentDialog);
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.addForm(result)
        this.fetchedUser.forms.unshift(result)
        this.save()
      }
    })
  }

  save() {
    // let user = form.value
    // console.log(user)
    // console.log(model);
    //this.fetchedUser.forms = form.value.forms
    //this.fetchedUser.notes = form.value.notes

    this.userService.updateUser(this.fetchedUser)
      .subscribe(
        res => {
          this.toastr.success('Great!', res.message)
        },
        error => {console.log(error)}
      )
  }



  setDateToday(){
    this.fetchedUser.lastVisit = new Date()
    this.userService.updateUser(this.fetchedUser)
      .subscribe(
        res => {
          this.toastr.success('Great!', res.message)
        },
        error => {console.log(error)}
      )
  }

  getUser(id) {
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
