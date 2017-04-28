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
  templateUrl: './chooseDate.component.html',
  styleUrls: ['./user.component.css'],

})

export class ChooseDateComponent implements OnInit {
  //fetchedUser = new User()
  //fetchedUser : User;
  fetchedUser = {
    lastVisit : ''
  }
  newDate = {
    newDate: ''
    // monthNewDate: Number,
    // dayNewDate: Number,
    // yearNewDate: Number
  }

  public myForm: FormGroup;

  constructor(
    private userService: UserService,
    private toastr: ToastsManager,
//    public dialog: MdDialog,
    private router: Router,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private _fb: FormBuilder,
  ) {
  }



  ngOnInit() {
    this.myForm = this._fb.group({
        newDate: ['', [Validators.required, Validators.minLength(2)]],
        // newDate: this._fb.group({
        //   monthNewDate: ['', [Validators.required, Validators.minLength(2)]],
        //   dayNewDate: ['', [Validators.required, Validators.minLength(2)]],
        //   yearNewDate: ['', [Validators.required, Validators.minLength(2)]]
        // })
    })

    this.activatedRoute.params.subscribe((params: Params) => {
      this.getUser(params['id'])
    })
  }

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



  goBack() {
    this.location.back();
  }


  save(model: FormGroup, isValid: boolean) {

    //let stringNewDate = model.value.newDate.yearNewDate + '-' + model.value.newDate.monthNewDate   + '-' + model.value.newDate.dayNewDate
    this.fetchedUser.lastVisit = model.value.newDate
    this.userService.updateUser(this.fetchedUser)
      .subscribe(
        res => {
          this.toastr.success('Great!', res.message)
        },
        error => {console.log(error)}
      )
    this.goBack()
    }

}
