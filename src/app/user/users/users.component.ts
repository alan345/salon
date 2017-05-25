import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {UserService} from '../user.service';
import {CompanieService} from '../../companie/companie.service';
import {User} from '../user.model';
import {ToastsManager} from 'ng2-toastr';
import {MdDialog } from '@angular/material';
import {Router } from '@angular/router';
import { Location } from '@angular/common';




@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./user.component.css'],

})

export class UsersComponent implements OnInit {
  fetchedUsers: User[] = [];
  loading: boolean;
  search = {
    orderBy : '',
    search: '',
    parentUser: '',
    role: ''
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
    private companieService: CompanieService
  ) {}


  ngOnInit() {
      //this.companieService.getCompanieByUserId(this.authService.currentUser.userId)
      this.companieService.getCompanieForCurrentUser()
      .subscribe((data => {
          if(data.length)
            this.router.navigate(['/companie/' + data[0]._id + '/users']);
        })
      )


    // if(this.isAdmin()) {
    //   this.companieService.getCompanieByUserId(this.authService.currentUser.userId)
    //   .subscribe((data => {
    //       if(data.length)
    //         this.router.navigate(['/companie/' + data[0]._id + '/users']);
    //     })
    //   )
    // } else {
      this.search.orderBy = 'profile.name'
      this.search.role = 'client'
      this.search.parentUser = this.authService.currentUser.userId
      this.getUsers(this.paginationData.currentPage, this.search)
    // }
  }
  goBack() {
    this.location.back();
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
  isManager(){
    return this.authService.isManager();
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

  getUsers(page: number, search: any) {
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
