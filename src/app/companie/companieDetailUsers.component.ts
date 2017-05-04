import {Component, OnInit} from '@angular/core';

import {AuthService} from '../auth/auth.service';
import {CompanieService} from './companie.service';
import {Companie} from './companie.model';
import {ChangeDetectionStrategy, Input} from "@angular/core";
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastsManager} from 'ng2-toastr';
import {Inject, forwardRef} from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';
import {Router, ActivatedRoute, Params } from '@angular/router';
import {Location} from '@angular/common';
import { Form } from '../form/form.model'
import { FormBuilder, FormGroup, FormArray, FormControl, Validators} from '@angular/forms';
import { EditOptionsComponentDialog } from '../modalLibrary/modalLibrary.component'
import { AdminService} from '../admin/services/admin.service';
import { User } from '../user/user.model'

@Component({
  selector: 'app-companie',
  templateUrl: './companieDetailUsers.component.html',
  styleUrls: ['./companie.component.css'],
})
export class CompanieDetailUsersComponent implements OnInit {
  maxPictureToShow = 3
  userSaleReps : User[] = []
  search = {
    orderBy : '',
    search:'',
    parentUser:'',
    role:''
  }
  fetchedCompanie : Companie = {
    _id:'',
    forms:[],
    name:'',
    phoneNumber:'',
    address: {
      address : '',
      city :  '',
      state :  '',
      zip :  ''
    },
    _users:[]
  }
  public myForm: FormGroup;



  constructor(
    private companieService: CompanieService,
    private adminService: AdminService,
    private modalService: NgbModal,
    private toastr: ToastsManager,
    public dialog: MdDialog,
    private router: Router,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private _fb: FormBuilder,
    private authService: AuthService,
  ) {

  }

  ngOnInit() {
    this.myForm = this._fb.group({
      forms: this._fb.array([])
    })

    this.activatedRoute.params.subscribe((params: Params) => {
      this.getCompanie(params['id'])
    })
  }
  goBack() {
    this.location.back();
  }

  removeForm(i: number) {
      this.fetchedCompanie.forms.splice(i, 1)
      const control = <FormArray>this.myForm.controls['forms'];
      control.removeAt(i)
      this.save()
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

  searchInput(){
    //this.getCompanie(this.fetchedCompanie._id)
  //  this.fetchedCompanie.

  }
  orderBy(orderBy:string) {
    this.search.orderBy = orderBy
    this.getCompanie(this.fetchedCompanie._id)
  }
  save() {
    this.companieService.updateCompanie(this.fetchedCompanie)
      .subscribe(
        res => {
          this.toastr.success('Great!', res.message)
        },
        error => {console.log(error)}
      )
  }

  seeAllPicture(){
    this.router.navigate(['companie/' + this.fetchedCompanie._id + "/companiePictures"]);
  }

  addForm(form : Form) {
    const control = <FormArray>this.myForm.controls['forms'];
    const addrCtrl = this._fb.group({
        _id: ['', Validators.required],
        owner: ['', Validators.required],
        imagePath: ['', Validators.required],
    });
    control.push(addrCtrl);
  }

  getObjects(myForm){
    return myForm.get('forms').controls
  }

  openDialog(positionImage) {
    let dialogRef = this.dialog.open(EditOptionsComponentDialog);
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.addForm(result)
        this.fetchedCompanie.forms.push(result)
        this.save()
      }
    })
  }


  getCompanie(id : string) {
    this.companieService.getCompanie(id, this.search)
      .subscribe(
        res => {
          this.fetchedCompanie = res

          this.fetchedCompanie._users.forEach((user) => {
            if(user.role[0] === 'saleRep')
              this.userSaleReps.push(user)
          })

          this.fetchedCompanie.forms.forEach((form: Form) => {
            this.addForm(form)
          })
        },
        error => {
          console.log(error);
        }
      );
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

}
