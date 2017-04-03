import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {UserService} from '../user.service';
//import {RegionComponent} from '../region/region.component';
import {User} from '../user.model';
import {ChangeDetectionStrategy, Input} from "@angular/core";
import {ToastsManager} from 'ng2-toastr';
import {Inject, forwardRef} from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';
import {Router, ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';




@Component({
  selector: 'app-users',
  templateUrl: './singleUser.component.html',
  styleUrls: ['./user.component.css'],

})
export class SingleUserComponent implements OnInit {
  fetchedUser : {}
  userId : ''



  constructor(
    private userService: UserService,
    private toastr: ToastsManager,
    public dialog: MdDialog,
    private router: Router,
    private location: Location,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
        this.userId = params['id'];
      });

    this.getUser(this.userId);
  }

  goBack() {
    this.location.back();
  }


  onDelete(id: string) {
    this.userService.deleteUser(id)
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



  getUser(id) {
    console.log(id)
    this.userService.getUser(id)
      .subscribe(
        res => {
          this.fetchedUser = res
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
