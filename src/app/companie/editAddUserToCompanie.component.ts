import {Component, OnInit} from '@angular/core';

import {AuthService} from '../auth/auth.service';
import {CompanieService} from './companie.service';
import {RegionService} from '../region/region.service';
//import {RegionComponent} from '../region/region.component';
import {Companie} from './companie.model';
import {ChangeDetectionStrategy, Input} from "@angular/core";
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastsManager} from 'ng2-toastr';
import {Inject, forwardRef} from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';
import {Router, ActivatedRoute, Params } from '@angular/router';
import {Location} from '@angular/common';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';

import {UserService} from '../user/user.service';


@Component({
  selector: 'app-companie',
  templateUrl: './editAddUserToCompanie.component.html',
  styleUrls: ['./companie.component.css'],
})
export class EditAddUserToCompanieComponent implements OnInit {
  fetchedCompanie = {
    _id:'',
    address:{
      address : '',
      city : '',
      state:'',
      zip:'',
    },
    _users : [
      // {
      //   _user : [
      //     {
      //       email:''
      //     }
      //   ]
      // }
    ]
  }
  search = {
    email : '',
  }
  fetchedUser = {
    _id: '',
    lastVisit: '',
    email:'',
    forms:[
    //   {
    //   _id:'',
    //   owner:'',
    //   imagePath:'',
    // }
    ],
    profile:{
      name:'',
      lastName:'',
      parentUser:[
        // {
        //   _id:''
        // }
      ],
      hair:{
        // hairDensity : '',
        // hairPorosity : '',
        // hairTexture : '',
      }
    },
    notes:[],
    role: ['stylist']
  }

  myForm: FormGroup;
  filteredUsers = []


  constructor(
    private userService: UserService,
    private companieService: CompanieService,
    private toastr: ToastsManager,
    private _fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private location: Location,
  ) {

  }


  searchEmails() {
    this.filteredUsers = []
    if(this.search.email) {
      this.userService.getUsersByEmail(this.search)
        .subscribe(
          res => {
            this.filteredUsers = res.data
            if(res.data.length) {
              if(res.data[0].email === this.search.email) {
                this.userFounded(0)
              } else {
                this.initFormNewUser()
              }
            } else {
              this.initFormNewUser()
            }

          },
          error => {
            console.log(error);
          }
        )
      }
  }
  initFormNewUser() {
    this.fetchedUser.email = this.search.email
  }

  userFounded(i) {
    this.fetchedUser = this.filteredUsers[i]
    this.filteredUsers = []
  }

  save(form: FormGroup) {
    if(this.fetchedUser._id) {
      this.userService.updateUser(this.fetchedUser)
        .subscribe(
          res => {
            this.toastr.success('Great!', res.message)
            this.addUserIdToCompanie(res.obj)
          },
          error => {console.log(error)}
        );
    } else {
      this.userService.saveUser(this.fetchedUser)
        .subscribe(
          res => {
            this.toastr.success('Great!', res.message)
            this.addUserIdToCompanie(res.obj)
          },
          error => {console.log(error)}
        );
    }
  }

  addUserIdToCompanie(user) {
    let okAddUserToCompanie = true
    this.fetchedCompanie._users.forEach((userFetch) => {
      if(userFetch._id === user._id) {
        okAddUserToCompanie = false
      }
    })
    if(!okAddUserToCompanie){
      this.toastr.error('error! user already exists in salon')
      return
    }

    this.fetchedCompanie._users.push(user)
    this.companieService.updateCompanie(this.fetchedCompanie)
      .subscribe(
        res => {
          this.toastr.success('Great!', res.message)
        },
        error => {console.log(error)}
      )
  }

  getObjects(myForm){
    return myForm.get('profile').get('parentUser').controls
  }


  ngOnInit() {
    this.myForm = this._fb.group({
        lastVisit: [''],
        _id: [''],
        email: ['', [Validators.required, Validators.minLength(5)]],
        profile: this._fb.group({
            name: ['', [Validators.required, Validators.minLength(2)]],
            lastName: ['', [Validators.required, Validators.minLength(2)]],
            // parentUser: this._fb.array([]),
            // hair: this._fb.group({
            //     hairTexture: ['', <any>Validators.required],
            //     hairDensity: ['', <any>Validators.required],
            //     hairPorosity: ['', <any>Validators.required],
            //
            // })
        })
    })


    this.activatedRoute.params.subscribe((params: Params) => {
      this.getCompanie(params['id'])
    })
  }

  onDelete(id: string) {
    this.companieService.deleteCompanie(id)
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


  goBack() {
    this.location.back();
  }

  getCompanie(id) {

    this.activatedRoute.params
      .switchMap((params: Params) => this.companieService.getCompanie(params['id']))
  //    .subscribe((hero: Hero) => this.hero = hero);

    //this.companieService.getCompanie(id)
      .subscribe(
        res => {
        //  console.log("companies");
        //  console.log(res);
          this.fetchedCompanie = res
        },
        error => {
          console.log(error);
        }
      );
  }

}
