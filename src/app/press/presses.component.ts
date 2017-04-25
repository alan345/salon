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




@Component({
  selector: 'app-presses',
  templateUrl: './presses.component.html',
  styleUrls: ['./press.component.css'],

})
export class PressesComponent implements OnInit {
  fetchedPresses : Array<PressesComponent> = [];
  loading: boolean;
  paginationData = {
    currentPage: 1,
    itemsPerPage: 0,
    totalItems: 0
  };


  constructor(
    private pressService: PressService,
    private toastr: ToastsManager,
    public dialog: MdDialog,
    private router: Router,
    private location: Location,
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

  getPage(page: number) {

    this.getPresses(page);
  }

  getPresses(page) {
    this.pressService.getPresses(page)
      .subscribe(
        res => {
          this.paginationData = res.paginationData;
          this.fetchedPresses =  res.data
        },
        error => {
          console.log(error);
        }
      );
  }





  ngOnInit() {

  }
}


// @Component({
//   selector: 'press-dialog',
//   templateUrl: './pressDialog.component.html',
// })
// export class PressDialogComponent {
//   constructor(public dialogRef: MdDialogRef<PressDialogComponent>) {}
//
// }
