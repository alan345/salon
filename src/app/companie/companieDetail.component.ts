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
import { Form } from '../user/users/user.model'
import { FormBuilder, FormGroup, FormArray, FormControl, Validators} from '@angular/forms';
import { EditOptionsComponentDialog } from '../modalLibrary/modalLibrary.component'

@Component({
  selector: 'app-companie',
  templateUrl: './companieDetail.component.html',
  styleUrls: ['./companie.component.css'],
})
export class CompanieDetailComponent implements OnInit {
  fetchedCompanie = {
    _id:'',
    forms:[],
    name:'',
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

    private modalService: NgbModal,
    private toastr: ToastsManager,
    public dialog: MdDialog,
    private router: Router,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private _fb: FormBuilder,
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

  save(form) {}

  addForm(form) {
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
        this.companieService.updateCompanie(this.fetchedCompanie)
          .subscribe(
            res => {
              this.toastr.success('Great!', res.message)
            },
            error => {console.log(error)}
          )
      }
    })
  }

  getCompanie(id) {
    this.companieService.getCompanie(id)
      .subscribe(
        res => {
          this.fetchedCompanie = res
          this.fetchedCompanie.forms.forEach((form: Form) => {
            this.addForm(form)
          })
        },
        error => {
          console.log(error);
        }
      );
  }

}
