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
    users : [
      {
        _user : [
          {
            email:''
          }
        ]
      }
    ]
  }
  search = {
    email : 'email',
  }
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
      name:'',
      parentUser:[{
        _id:''
      }],
      hair:{
        hairDensity : '',
        hairPorosity : '',
        hairTexture : '',
      }
    },
    notes:[{
      text:'',
      dateNote: ''
    }]
  }

  myForm: FormGroup;
  emailCtrl: FormControl;
  filteredEmails: any;
  states = [
     'Alabama',
     'Alaska',
     'Arizona',
     'Arkansas',
     'California',
     'Colorado',
     'Connecticut',
     'Delaware',
     'Florida',
     'Georgia',
     'Hawaii',
     'Idaho',
     'Illinois',
     'Indiana',
     'Iowa',
     'Kansas',
     'Kentucky',
     'Louisiana',
     'Maine',
     'Maryland',
     'Massachusetts',
     'Michigan',
     'Minnesota',
     'Mississippi',
     'Missouri',
     'Montana',
     'Nebraska',
     'Nevada',
     'New Hampshire',
     'New Jersey',
     'New Mexico',
     'New York',
     'North Carolina',
     'North Dakota',
     'Ohio',
     'Oklahoma',
     'Oregon',
     'Pennsylvania',
     'Rhode Island',
     'South Carolina',
     'South Dakota',
     'Tennessee',
     'Texas',
     'Utah',
     'Vermont',
     'Virginia',
     'Washington',
     'West Virginia',
     'Wisconsin',
     'Wyoming',
   ];


  constructor(
    private userService: UserService,
    private companieService: CompanieService,
    private toastr: ToastsManager,
    private _fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private location: Location,

  ) {
    this.emailCtrl = new FormControl();
    this.filteredEmails = this.emailCtrl.valueChanges
        .startWith(null)
        .map(email => this.filterEmails(email));
  }


  filterEmails(email: string) {
    this.search.email = email
    this.userService.getUsersByEmail(this.search)
      .subscribe(
        res => {
          let emailsArr =[]
          //console.log(res.data)
          res.data.forEach(user => {
            emailsArr.push(user.email)
              //console.log(user.email)
          })
          console.log(emailsArr)
          console.log(this.states)
          return this.states
        },
        error => {
          console.log(error);
        }
      );
  }
  save(model: FormGroup, isValid: boolean) {
  }

  getObjects(myForm){
    return myForm.get('profile').get('parentUser').controls
  }

  ngOnInit() {
    this.myForm = this._fb.group({
        lastVisit: [''],
        _id: [''],
        profile: this._fb.group({
            name: ['', [Validators.required, Validators.minLength(5)]],
            parentUser: this._fb.array([]),
            email: ['', [Validators.required, Validators.minLength(5)]],
            hair: this._fb.group({
                hairTexture: ['', <any>Validators.required],
                hairDensity: ['', <any>Validators.required],
                hairPorosity: ['', <any>Validators.required],

            })
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
