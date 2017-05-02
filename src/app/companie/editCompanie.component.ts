import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {CompanieService} from './companie.service';

import {Companie} from './companie.model';
import {ChangeDetectionStrategy, Input} from "@angular/core";
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastsManager} from 'ng2-toastr';
import {Inject, forwardRef} from '@angular/core';
import {MdDialog, MdDialogRef, MdDialogConfig} from '@angular/material';
import {Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators} from '@angular/forms';
//import { CompanieAddUserDialog} from './companieAddUserDialog.component'
import { DeleteDialog } from '../deleteDialog/deleteDialog.component'
import { DragulaService } from 'ng2-dragula';


@Component({
  selector: 'app-companie',
  templateUrl: './editCompanie.component.html',
  styleUrls: ['./companie.component.css'],
})
export class EditCompanieComponent implements OnInit {
  fetchedCompanie : Companie = {
    _id:'',
    name:'',
    address:{
      address : '',
      city : '',
      state:'',
      zip:'',
    },
    _users : [],
    forms : []
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
    private authService:AuthService,
    private dragulaService:DragulaService
  ) {

    // dragulaService.setOptions('first-bag', {
    //   removeOnSpill: true
    // });

    dragulaService.drag.subscribe((value:any) => {
       console.log(`drag: ${value[0]}`); // value[0] will always be bag name
      this.onDrag(value.slice(1));
    });
    dragulaService.drop.subscribe((value:any) => {
       console.log(`drop: ${value[0]}`);
      this.onDrop(value.slice(1));
    });
    dragulaService.over.subscribe((value:any) => {
       console.log(`over: ${value[0]}`);
      this.onOver(value.slice(1));
    });
    dragulaService.out.subscribe((value:any) => {
       console.log(`out: ${value[0]}`);
      this.onOut(value.slice(1));
    });

  }



    private hasClass(el:any, name:string):any {
      return new RegExp('(?:^|\\s+)' + name + '(?:\\s+|$)').test(el.className);
    }

    private addClass(el:any, name:string):void {
      if (!this.hasClass(el, name)) {
        el.className = el.className ? [el.className, name].join(' ') : name;
      }
    }

    private removeClass(el:any, name:string):void {
      if (this.hasClass(el, name)) {
        el.className = el.className.replace(new RegExp('(?:^|\\s+)' + name + '(?:\\s+|$)', 'g'), '');
      }
    }

    private onDrag(args:any):void {
      let [e] = args;
      this.removeClass(e, 'ex-moved');
    }

    private onDrop(args:any):void {
      let [e] = args;
      this.addClass(e, 'ex-moved');
    }

    private onOver(args:any):void {
      let [el] = args;
      this.addClass(el, 'ex-over');
    }

    private onOut(args:any):void {
      let [el] = args;
      this.removeClass(el, 'ex-over');
    }


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
  removeUserFromCompanie(i:number){
    let this2 = this
    let dialogRefDelete = this.dialog.open(DeleteDialog)
    dialogRefDelete.afterClosed().subscribe(result => {
      if(result) {
        this.fetchedCompanie._users.splice(i, 1)
        this.save(false)
      }
    })
  }

  save(redirect:boolean) {
    this.companieService.updateCompanie(this.fetchedCompanie)
      .subscribe(
        res => {
          this.toastr.success('Great!', res.message)
          if(redirect)
            this.router.navigate(['companie/' + this.fetchedCompanie._id])
        },
        error => {console.log(error)}
      )
  }

  // openDialogAddUser(){
  //   let config = new MdDialogConfig();
  //   let dialogRef:MdDialogRef<CompanieAddUserDialog>= this.dialog.open(CompanieAddUserDialog, config)
  //   dialogRef.componentInstance.fetchedCompanie = this.fetchedCompanie
  //   dialogRef.afterClosed().subscribe(result => {
  //     if(result) {
  //       // this.onDelete(this.fetchedPress._id)
  //       // this.router.navigate(['press']);
  //     }
  //   })
  //
  // }
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
  isAdmin() {
    return this.authService.isAdmin();
  }

}
