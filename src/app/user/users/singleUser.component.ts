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
    img:[],
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
    private activatedRoute: ActivatedRoute
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
    console.log('ss')
    let dialogRef = this.dialog.open(EditOptionsComponentDialog);
    dialogRef.afterClosed().subscribe(result => {
      console.log('ss')
      if(result) {
        console.log(result)
        this.fetchedUser.img[positionImage][0] = result
      }
    })
  }

  getUser(id) {
    console.log(id)
    this.userService.getUser(id)
      .subscribe(
        res => {
          this.fetchedUser = res.user
        },
        error => {
          console.log(error);
        }
      );
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
