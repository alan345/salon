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
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-companie',
  templateUrl: './editCompanie.component.html',
  styleUrls: ['./companie.component.css'],
})
export class EditCompanieComponent implements OnInit {
  fetchedCompanie = {
    _id:'',
    name:'',
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
  myForm: FormGroup;

  constructor(
    private companieService: CompanieService,
    private modalService: NgbModal,
    private toastr: ToastsManager,
    public dialog: MdDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private _fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.myForm = this._fb.group({
      name: [''],
      address: this._fb.group({
        address: ['', [Validators.required, Validators.minLength(2)]],
        city: ['', [Validators.required, Validators.minLength(2)]],
        state: ['', [Validators.required, Validators.minLength(2)]],
        zip: ['', [Validators.required, Validators.minLength(2)]],
      }),
      _users: this._fb.array([])
    })


    this.activatedRoute.params.subscribe((params: Params) => {
      this.getCompanie(params['id'])
    })
  }

  save() {
    this.companieService.updateCompanie(this.fetchedCompanie)
      .subscribe(
        res => {
          this.toastr.success('Great!', res.message)
          this.activatedRoute.params.subscribe((params: Params) => {
            this.router.navigate(['companie/' + params['id']]);
          })

        },
        error => {console.log(error)}
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





  addUser(user) {
    const control = <FormArray>this.myForm.controls['_users'];
    const addrCtrl = this._fb.group({
        _id: ['', Validators.required],
    });
    control.push(addrCtrl);
  }

  getCompanie(id: string) {
    this.companieService.getCompanie(id)
      .subscribe(
        res => {
          console.log(res)
          this.fetchedCompanie = res
          this.fetchedCompanie._users.forEach((user) => {
            this.addUser(user)
          })
        },
        error => {
          console.log(error);
        }
      )
  }

}
