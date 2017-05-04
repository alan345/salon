import { Component, OnInit} from '@angular/core';
import { AuthService} from '../../auth/auth.service';
import { UserService} from '../user.service';
import { Companie } from '../../companie/companie.model';
import { CompanieService } from '../../companie/companie.service';
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
import { DeleteDialog } from '../../deleteDialog/deleteDialog.component'


@Component({
  selector: 'app-users',
  templateUrl: './newUser.component.html',
  styleUrls: ['./user.component.css'],

})

export class NewUserComponent implements OnInit {
  //fetchedUser = new User()
  //fetchedUser : User;
  companies=[]
  fetchedCompanie : Companie = {
    _id:'',
    name:'',
    phoneNumber:'',
    address:{
      address : '',
      city : '',
      state:'',
      zip:'',
    },
    _users : [],
    forms : []
  }

  fetchedUser : User = {
    _id: '',
    lastVisit: new Date,
    email:'',
    profile:{
      parentUser:[],
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
    private authService: AuthService,
    private companieService: CompanieService,
  ) {
  }



  ngOnInit() {
    this.myForm = this._fb.group({
        lastVisit: [''],
        _id: [''],
        profile: this._fb.group({
            name: ['', [Validators.required, Validators.minLength(5)]],
            // parentUser: this._fb.array([]),
            hair: this._fb.group({
                hairTexture: ['', <any>Validators.required],
                hairDensity: ['', <any>Validators.required],
                hairPorosity: ['', <any>Validators.required],

            })
        })
    })


    let userId = this.authService.currentUser.userId
    this.companieService.getCompanieByUserId(userId)
    .subscribe(
      (data => {
        if(data.length)
          this.fetchedCompanie = data[0]
      })
    )

    this.activatedRoute.params.subscribe((params: Params) => {
      if(params['id'])
        this.getUser(params['id'])
    })
  }

  // getObjects(myForm){
  //    return myForm.get('profile').get('parentUser').controls
  //  }



  // addParentUser(parentUser) {
  //   const control = <FormArray>this.myForm.get('profile').get('parentUser');
  //   //console.log(control)
  //   const addrCtrl = this._fb.group({
  //       _id: [''],
  //   });
  //   control.push(addrCtrl);
  // }



  // removeForm(i: number) {
  //     this.fetchedUser.forms.splice(i, 1)
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

  openDialogDelete(){
    let this2 = this
    let dialogRefDelete = this.dialog.open(DeleteDialog)
    dialogRefDelete.afterClosed().subscribe(result => {
      if(result) {
        this.onDelete(this.fetchedUser._id).then(function(){
          this2.router.navigate(['user']);
        })

      }
    })
  }


  save(form) {
    if(this.fetchedUser._id) {
      this.userService.updateUser(this.fetchedUser)
        .subscribe(
          res => {
            this.toastr.success('Great!', res.message)
            //this.router.navigate(['user/' + res.obj._id])
            //this.addUserIdToCompanie(res.obj)
          },
          error => {console.log(error)}
        )
    } else {
      this.fetchedUser.role=['client']
      this.userService.saveUser(this.fetchedUser)
        .subscribe(
          res => {
            this.toastr.success('Great!', res.message)
            //this.router.navigate(['user/' + res.obj._id])
            this.addUserIdToCompanie(res.obj)
            //this.router.navigate(['user'])
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
        //this.router.navigate(['companie/' + this.fetchedCompanie._id]);
        //this.navigate(this.fetchedCompanie._id)
      } else {
        this.fetchedCompanie._users.push(user)
        this.companieService.updateCompanie(this.fetchedCompanie)
          .subscribe(
            res => {
              //this.onPassForm.emit();
              this.toastr.success('Great!', res.message)
              //this.router.navigate(['companie/' + this.fetchedCompanie._id]);
              this.navigate(user._id)
            },
            error => {console.log(error)}
          )
      }


  }

  navigate(id: string){
    this.router.navigate(['user/' + id])
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
    let this2 = this
    return new Promise(function(resolve, reject) {
      this2.userService.deleteUser(id)
        .subscribe(
          res => {
            this2.toastr.success('Great!', res.message);
            resolve(res)
          },
          error => {
            console.log(error);
            reject(error)
          }
        )
      })
  }

}
