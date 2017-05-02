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
  templateUrl: './users.component.html',
  styleUrls: ['./user.component.css'],

})
export class UsersComponent implements OnInit {
  fetchedUsers : Array<UsersComponent> = [];
  fetchedRegions = [];
  loading: boolean;
  search = {
    orderBy : '',
    search:'',
    parentUser:'',
    role:''
  }
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
    private location: Location,
    private authService: AuthService,
  ) {}


  ngOnInit() {

    this.search.orderBy = 'profile.name'
    this.search.role = 'client'
    this.search.parentUser = this.authService.currentUser.userId
    this.getUsers(this.paginationData.currentPage, this.search)
  }
  goBack() {
    this.location.back();
  }

  searchInput(){
    this.getUsers(this.paginationData.currentPage, this.search)
  }
  orderBy(orderBy:string) {
    this.search.orderBy = orderBy
    this.getUsers(this.paginationData.currentPage, this.search)
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
    this.getUsers(page, this.search)
  }

  getUsers(page, search) {
    this.userService.getUsers(page, search)
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


}
