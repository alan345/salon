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





@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./user.component.css'],

})
export class UsersComponent implements OnInit {
  fetchedUsers : Array<UsersComponent> = [];
  fetchedRegions = [];
  loading: boolean;
  paginationData = {
    currentPage: 1,
    itemsPerPage: 0,
    totalItems: 0
  };


  constructor(
    private userService: UserService,
    private toastr: ToastsManager,
    public dialog: MdDialog,
    private router: Router,
  ) {
    this.getUsers(this.paginationData.currentPage);
  }


  openDialog() {
    let dialogRef = this.dialog.open(UserDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
    //    this.fetchedObj.design.mainPage[positionImage][0] = result
      }

    });
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

  getPage(page: number) {
    this.loading = true;
    this.getUsers(page);
  }

  getUsers(page) {
    this.userService.getUsers(page)
      .subscribe(
        res => {
          this.paginationData = res.paginationData;
          this.fetchedUsers =  res.data
          this.loading = false;
        },
        error => {
          console.log(error);
        }
      );
  }





  ngOnInit() {

  }
}


@Component({
  selector: 'user-dialog',
  templateUrl: './userDialog.component.html',
})
export class UserDialogComponent {
  constructor(public dialogRef: MdDialogRef<UserDialogComponent>) {}

}
