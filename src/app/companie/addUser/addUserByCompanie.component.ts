import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { CompanieService } from '../companie.service';
import { Companie } from '../companie.model';
import { User } from '../../user/user.model';
import { ToastsManager } from 'ng2-toastr';
import { Router, ActivatedRoute  } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { UserService } from '../../user/user.service';


@Component({
  selector: 'addUserByCompanie',
  templateUrl: './addUserByCompanie.component.html',
  styleUrls: ['../companie.component.css'],
})
export class AddUserByCompanieComponent implements OnInit {


  fetchedCompanie: Companie = new Companie();

  search: any = {
    search : '',
  }
  fetchedUser: User = new User();

  myForm: FormGroup;
  filteredUsers: User[]= []


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



  searchCompanie() {
    if( this.search.search ) {
      this.companieService.getCompanies(1, this.search)
        .subscribe(
          res => {
            if(res.data.length) {
              this.fetchedCompanie  = <Companie>res.data[0]
              console.log(this.fetchedCompanie)
            } else {
          //    this.fetchedCompanie = new Companie()
            }


          },
          error => {
            console.log(error);
          }
        );

      // this.companieService.getUsersByEmail(this.search)
      //   .subscribe(
      //     res => {
      //       this.filteredUsers = res.data
      //       if(res.data.length) {
      //         if(res.data[0].email === this.search.email) {
      //           this.userFounded(0)
      //         } else {
      //           this.initFormNewUser()
      //         }
      //       } else {
      //         this.initFormNewUser()
      //       }
      //
      //     },
      //     error => {
      //       console.log(error);
      //     }
      //   )
      }
  }
  initFormNewUser() {
    // this.fetchedUser.email = this.search.email
    // this.fetchedUser.role.forEach((role) => {
    //   this.addRole(role)
    // })
  }

  userFounded(i: number) {
    this.fetchedUser = this.filteredUsers[i]
    //this.fetchedUser
    this.fetchedUser.role.forEach((role) => {
      this.addRole(role)
    })

    this.filteredUsers = []
  }

  addRole(role: string) {
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



  requestAddUserToComp() {
    let meUser: User = new User()
    meUser._id = this.authService.currentUser.userId
    this.addUserIdToCompanie(meUser)
  }


  addUserIdToCompanie(user: User) {
      this.fetchedCompanie._users.push(user)
      this.companieService.updateCompanie(this.fetchedCompanie)
        .subscribe(
          res => {
            //this.onPassForm.emit();
            this.toastr.success('Great!', res.message)
            //this.router.navigate(['companie/' + this.fetchedCompanie._id]);
          },
          error => {
            this.toastr.error('error! user already exists in salon')
            console.log(error)
          }
        )




  }

  getObjects(myForm: any){
    return myForm.get('profile').get('parentUser').controls
  }
  getObjectsRole(myForm: any){
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
