import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {CompanieService} from './companie.service';

import {Companie} from './companie.model';

import {ToastsManager} from 'ng2-toastr';

import {MdDialog } from '@angular/material';
import {Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

import { DeleteDialog } from '../deleteDialog/deleteDialog.component';
import { User } from '../user/user.model';



@Component({
  selector: 'app-companie',
  templateUrl: './editCompanie.component.html',
  styleUrls: ['./companie.component.css'],
})
export class EditCompanieComponent implements OnInit {
  fetchedCompanie: Companie = new Companie();

  userAdmins : User[] = []
  userManagers : User[] = []
  userClients : User[] = []
  usersSalesRep : User[] = []
  userStylists : User[] = []
  myForm: FormGroup;

  slicerIsHQ: boolean = false;



  constructor(
    private companieService: CompanieService,
//    private modalService: NgbModal,
    private toastr: ToastsManager,
    public dialog: MdDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private _fb: FormBuilder,
    private authService:AuthService,
  ) {}

  ngOnInit() {
    this.myForm = this._fb.group({
      name: [''],
      phoneNumber: ['', [Validators.required, Validators.minLength(2)]],
      address: this._fb.group({
        address: ['', [Validators.required, Validators.minLength(2)]],
        city: ['', [Validators.required, Validators.minLength(2)]],
        state: ['', [Validators.required, Validators.minLength(2)]],
        zip: ['', [Validators.required, Validators.minLength(2)]],
      }),
      _users: this._fb.array([])
    })


    this.activatedRoute.params.subscribe((params: Params) => {
      if(params['id'])
        this.getCompanie(params['id'])
    })
  }


    onChange(e: any) {
      if (e.checked === true) {
        this.fetchedCompanie.typeCompanie = 'HQ'
      } else {
        this.fetchedCompanie.typeCompanie = 'salon'
      }
    }

  removeUserFromCompanie(i:number, typeUser: string){
    let this2 = this
    let dialogRefDelete = this.dialog.open(DeleteDialog)
    dialogRefDelete.afterClosed().subscribe(result => {
      if(result) {
        this[typeUser].splice(i, 1)
        this.save(false)
      }
    })
  }

  save(redirect:boolean) {
    this.fetchedCompanie._users = []
    this.userAdmins.forEach(user => this.fetchedCompanie._users.push(user))
    this.userManagers.forEach(user => this.fetchedCompanie._users.push(user))
    this.userClients.forEach(user => this.fetchedCompanie._users.push(user))
    this.userStylists.forEach(user => this.fetchedCompanie._users.push(user))
    this.usersSalesRep.forEach(user => this.fetchedCompanie._users.push(user))

    if(this.fetchedCompanie._id) {
      this.companieService.updateCompanie(this.fetchedCompanie)
        .subscribe(
          res => {
            this.toastr.success('Great!', res.message)
            if(redirect)
              this.router.navigate(['companie/' + this.fetchedCompanie._id])
          },
          error => {
            //console.log(error)
            this.toastr.error('error!', error)
          }
        )
    } else {
      this.companieService.saveCompanie(this.fetchedCompanie)
        .subscribe(
          res => {
            this.toastr.success('Great!', res.message)
            if(redirect)
              this.router.navigate(['companie/' + res.obj._id])
          },
          error => {console.log(error)}
        )
    }

  }

  move(i: number, incremet: number, typeUser: string) {
    if(i>=0 && i<=this[typeUser].length + incremet) {
      var tmp = this[typeUser][i];
      this[typeUser][i] = this[typeUser][i + incremet]
      this[typeUser][i + incremet] = tmp
      this.save(false)
    }
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

  // addUser(user) {
  //   const control = <FormArray>this.myForm.controls['_users'];
  //   const addrCtrl = this._fb.group({
  //       _id: ['', Validators.required],
  //   });
  //   control.push(addrCtrl);
  // }

  getCompanie(id: string) {
    this.companieService.getCompanie(id, {})
      .subscribe(
        res => {
          this.fetchedCompanie = res
          if(this.fetchedCompanie.typeCompanie === 'HQ')
            this.slicerIsHQ = true
          this.fetchedCompanie._users.forEach((user) => {
            if(user.role[0] === 'admin')
              this.userAdmins.push(user)
            if(user.role[0] === 'salesRep')
              this.usersSalesRep.push(user)
            if(user.role[0] === 'client')
              this.userClients.push(user)
            if(user.role[0] === 'stylist')
              this.userStylists.push(user)
            if(user.role[0] === 'manager')
              this.userManagers.push(user)
          //  this.addUser(user)
          })
        },
        error => {
          console.log(error);
        }
      )
  }
  // toggleTypeCompanie() {
  //   if(this.isHQcompanie()) {
  //     this.fetchedCompanie.typeCompanie = 'salon'
  //   } else {
  //     this.fetchedCompanie.typeCompanie = 'HQ'
  //   }
  //
  // }
  isAdmin() {
    return this.authService.isAdmin();
  }
  isManager() {
    return this.authService.isManager();
  }
  isSalesRep() {
    return this.authService.isSalesRep();
  }
  isHQcompanie(){
    if(this.fetchedCompanie.typeCompanie === 'HQ')
      return true
    return false
  }

}
