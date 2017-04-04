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
import { Location } from '@angular/common';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-companie',
  templateUrl: './editCompanie.component.html',
  styleUrls: ['./companie.component.css'],
})
export class EditCompanieComponent implements OnInit {
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
  myForm: FormGroup;


  constructor(
    private companieService: CompanieService,
    private regionService: RegionService,
    private modalService: NgbModal,
    private toastr: ToastsManager,
    public dialog: MdDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.getCompanie(params['id'])
    })
  }

  save(model: FormGroup, isValid: boolean) {

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
