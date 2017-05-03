import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {PressService} from './press.service';
import {Press} from './press.model';
import {ChangeDetectionStrategy, Input} from "@angular/core";
import {ToastsManager} from 'ng2-toastr';
import {Inject, forwardRef} from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';
import {Router, ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { UserService} from '../user/user.service';




@Component({
  selector: 'app-presses',
  templateUrl: './presses.component.html',
  styleUrls: ['./press.component.css'],

})
export class PressesComponent implements OnInit {
  fetchedPresses : Press[] = [];
  loading: boolean;
  paginationData = {
    currentPage: 1,
    itemsPerPage: 0,
    totalItems: 0
  };

  trackinPage = {
    lastVisitPagePressCount:[],
    lastVisitPageVideoCount:[]
  }

  constructor(
    private pressService: PressService,
    private toastr: ToastsManager,
    public dialog: MdDialog,
    private router: Router,
    private location: Location,
    private authService: AuthService,
    private userService: UserService
  ) {
    this.getPresses(this.paginationData.currentPage);
  }


  goBack() {
    this.location.back();
  }

  onDelete(id: string) {
    this.pressService.deletePress(id)
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

  loadMore(){
    this.paginationData.currentPage = this.paginationData.currentPage+1
    this.getPresses(this.paginationData.currentPage)
  }

  getPage(page: number) {
    this.getPresses(page);
  }

  getPresses(page: number) {
    this.pressService.getPresses(page)
      .subscribe(
        res => {
          this.paginationData = res.paginationData;
          let fetchedPressesTemp = res.data
          fetchedPressesTemp.forEach((press) => {
            press['isNewVideo'] = false
            this.trackinPage.lastVisitPageVideoCount.forEach(videoNotRead => {
                if(videoNotRead._id == press._id)
                  press['isNewVideo'] = true
            })
            this.fetchedPresses.push(press)
          })
        },
        error => {
          console.log(error);
        }
      );
  }


  ngOnInit() {
    let userId : string = this.authService.currentUser.userId

    this.pressService.countNewItemForUser()
    .subscribe(
      data => {
        this.trackinPage.lastVisitPagePressCount = data.item
        this.userService.getUser(userId)
          .subscribe(
            res => {
              res.user.trackinPage.lastVisitPagePress = new Date()
              this.userService.updateUser(res.user)
                .subscribe(
                  res => {},
                  error => {
                    console.log(error);
                  }
                )
            },
            error => {
              console.log(error);
            }
          )
      },
      error => console.log(error)
    )



  }
}
