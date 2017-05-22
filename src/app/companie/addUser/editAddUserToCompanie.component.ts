import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {CompanieService} from '../companie.service';
import {Companie} from '../companie.model';
import {User} from '../../user/user.model';
import {ToastsManager} from 'ng2-toastr';
import {Router, ActivatedRoute, Params } from '@angular/router';
import {Location} from '@angular/common';
import {FormBuilder, FormGroup, FormArray, Validators} from '@angular/forms';
import {UserService} from '../../user/user.service';


@Component({
  selector: 'editAddUserToCompanie',
  templateUrl: './editAddUserToCompanie.component.html',
  styleUrls: ['../companie.component.css'],
})
export class EditAddUserToCompanieComponent implements OnInit {

  fetchedCompanie: Companie = {
    _id:'',
    forms:[],
    name:'',
    typeCompanie:'',
    phoneNumber:'',
    address: {
      address : '',
      city :  '',
      state :  '',
      zip :  ''
    },
    _users:[]
  }
  search = {
    email : '',
  }
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
        hairCondition : 'Normal',
        scalpCondition : 'Healthy',
        hairTexture : 'Fine',
      }
    },
    notes:[],
    forms:[],
    role:['stylist'],
  }

  myForm: FormGroup;
  filteredUsers = []


  constructor(
    private router: Router,
    private userService: UserService,
    private companieService: CompanieService,
    private toastr: ToastsManager,
    private _fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private authService: AuthService,
  ) {

  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.getCompanie(params['id'])
    })
    this.myForm = this._fb.group({
      lastVisit: [''],
      _id: [''],
      role: this._fb.array([]),
      email: [{value: '', disabled: true}],
      profile: this._fb.group({
        phoneNumber: [''],
        title: ['', [Validators.required, Validators.minLength(2)]],
        name: ['', [Validators.required, Validators.minLength(2)]],
        lastName: ['', [Validators.required, Validators.minLength(2)]],
      })
    })

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
    this.fetchedUser.role.forEach((role) => {
      this.addRole(role)
    })
  }

  userFounded(i) {
    this.fetchedUser = this.filteredUsers[i]
    //this.fetchedUser
    this.fetchedUser.role.forEach((role) => {
      this.addRole(role)
    })

    this.filteredUsers = []
  }

  addRole(role) {
    const control = <FormArray>this.myForm.controls['role'];
    const addrCtrl = this._fb.group({
        role: ['']
    });
    control.push(addrCtrl);
  }

  save(form: FormGroup) {

    if(this.fetchedUser._id) {
      this.userService.updateUser(this.fetchedUser)
        .subscribe(
          res => {
            this.toastr.success('Great!', res.message)
            this.addUserIdToCompanie(res.obj)
            //this.addUserIdToCompanie(res.obj)
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
  addUserIdToCompanie(user : User) {

      let okAddUserToCompanie = true
      this.fetchedCompanie._users.forEach((userFetch) => {
        if(userFetch._id === user._id) {
          okAddUserToCompanie = false
        }
      })
      if(!okAddUserToCompanie){
        this.toastr.error('error! user already exists in salon')
        this.router.navigate(['companie/' + this.fetchedCompanie._id]);
      } else {
        this.fetchedCompanie._users.push(user)
        this.companieService.updateCompanie(this.fetchedCompanie)
          .subscribe(
            res => {
              //this.onPassForm.emit();
              this.toastr.success('Great!', res.message)
              this.router.navigate(['companie/' + this.fetchedCompanie._id]);
            },
            error => {console.log(error)}
          )
      }



  }

  getObjects(myForm){
    return myForm.get('profile').get('parentUser').controls
  }
  getObjectsRole(myForm){
    return myForm.get('role').controls
  }
  getCompanie(id: string) {
    this.companieService.getCompanie(id, {})
      .subscribe(
        res => {
          this.fetchedCompanie = res
        },
        error => {
          console.log(error);
        }
      )
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
  isAdmin() {
    return this.authService.isAdmin();
  }
  isStylist() {
    return this.authService.isStylist();
  }
  isSalesRep(){
    return this.authService.isSalesRep();
  }
  isManager(){
    return this.authService.isManager();
  }
}
