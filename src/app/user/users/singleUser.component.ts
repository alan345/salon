import { Component, OnInit} from '@angular/core';
import { AuthService} from '../../auth/auth.service';
import { UserService} from '../user.service';
//import {RegionComponent} from '../region/region.component';

import { ChangeDetectionStrategy, Input} from "@angular/core";
import { ToastsManager} from 'ng2-toastr';
import { Inject, forwardRef} from '@angular/core';
import { MdDialog, MdDialogRef} from '@angular/material';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { User} from './user.model'
import { EditOptionsComponentDialog } from '../../modalLibrary/modalLibrary.component'
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './singleUser.component.html',
  styleUrls: ['./user.component.css'],

})

export class SingleUserComponent implements OnInit {
  //fetchedUser = new User()
  fetchedUser = {
    _id: '',
    updatedAt: '',
    email:'',
    forms:[{
      _id:'',
      owner:'',
      imagePath:'',
    }],
    profile:{
      name:'',
      hair:{
        hairDensity : '',
        hairPorosity : '',
        hairTexture : '',
      }
    }
  }


  constructor(
    private userService: UserService,
    private toastr: ToastsManager,
    public dialog: MdDialog,
    private router: Router,
    private location: Location,
    private activatedRoute: ActivatedRoute,
  ) {
  }


  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.getUser(params['id'])
    })
  }

  goBack() {
    this.location.back();
  }

  openDialog(positionImage) {

    let dialogRef = this.dialog.open(EditOptionsComponentDialog);
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.fetchedUser.forms.push(result)
      }
    })
  }


  save(model: FormGroup, isValid: boolean) {
    console.log(model)
    // this.editOptionsService.updateOptions(model)
    //   .subscribe(
    //     res => {
    //       this.toastr.success('Great!', res.message)
    //     },
    //     error => {console.log(error)}
    //   );
    }



  getUser(id) {
    console.log(id)

    this.userService.getUser(id)
      .subscribe(
        res => {
          console.log(res)
          this.fetchedUser = res.user
        },
        error => {
          console.log(error);
        }
      )
  }

  onDelete(id: string) {
    this.userService.deleteUser(id)
      .subscribe(
        res => {
          this.toastr.success('Great!', res.message);
        },
        error => {
          console.log(error);
        }
      );
  }


}


// @Component({
//   selector: 'user-dialog',
//   templateUrl: './userDialog.component.html',
// })
// export class UserDialogComponent {
//   constructor(public dialogRef: MdDialogRef<UserDialogComponent>) {}
//
// }
