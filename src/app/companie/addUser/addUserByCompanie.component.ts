import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { CompanieService } from '../companie.service';
import { Companie } from '../companie.model';
import { User } from '../../user/user.model';
import { ToastsManager } from 'ng2-toastr';
import { Router, ActivatedRoute  } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../user/user.service';


@Component({
  selector: 'addUserByCompanie',
  templateUrl: './addUserByCompanie.component.html',
  styleUrls: ['../companie.component.css'],
})

export class AddUserByCompanieComponent implements OnInit {
  fetchedCompanie: Companie = new Companie();
  fetchedCompanies: Companie[] = [];
  search: any = {
    search : '',
  }
  fetchedUser: User = new User();

  myForm: FormGroup;
  filteredUsers: User[]= []
  link: string = ''

  userAdmins: User[] = [];
  usersSalesRep: User[] = [];
  userClients: User[] = [];
  userStylists: User[] = [];
  userManagers: User[] = [];
  userToSendMail: User[] = [];

  constructor(
    private router: Router,
    private userService: UserService,
    private companieService: CompanieService,
    private toastr: ToastsManager,
    private _fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.getUser(this.authService.currentUser.userId)
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


  getUser(id : string) {
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

  searchCompanie() {
    if( this.search.search ) {
      this.companieService.searchCompanies(this.search)
        .subscribe(
          res => {
            if(res.data.length) {
              this.fetchedCompanies  = res.data
              // let this2 = this
              // this.fetchedCompanie._users.forEach((user: User) => {
              //   if (user.role[0] === 'admin')
              //     this2.userAdmins.push(user);
              //   if (user.role[0] === 'salesRep')
              //     this2.usersSalesRep.push(user);
              //   if (user.role[0] === 'client')
              //     this2.userClients.push(user);
              //   if (user.role[0] === 'stylist')
              //     this2.userStylists.push(user);
              //   if (user.role[0] === 'manager')
              //     this2.userManagers.push(user);
              // });
            } else {
              this.toastr.error('error! No Salon Founded')
            }
          },
          error => {
            console.log(error);
          }
        );
      }
  }


  requestAddUserToComp(id: string) {
    // this.link = window.location.origin + "#/companie/edit/addUser/" + this.fetchedCompanie._id + '/' + this.fetchedUser.email;
    let objToSend  = {
      // link: this.link,
      fetchedCompanie: id,
      fetchedUser: this.fetchedUser.email
    }
    this.companieService.sendInvitationToJoinCompanie(objToSend)
      .subscribe(
        res => {
          this.toastr.success('Great!', 'Request has been sent');
          this.goBack()
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
