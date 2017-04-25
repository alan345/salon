import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {SocialService} from './social.service';
//import {RegionComponent} from '../region/region.component';
import {Social} from './social.model';
import {ChangeDetectionStrategy, Input} from "@angular/core";
import {ToastsManager} from 'ng2-toastr';
import {Inject, forwardRef} from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';
import {Router, ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';




@Component({
  selector: 'app-socials',
  templateUrl: './socials.component.html',
  styleUrls: ['./social.component.css'],

})
export class SocialsComponent implements OnInit {
  fetchedSocials : Array<SocialsComponent> = [];
  loading: boolean;
  paginationData = {
    currentPage: 1,
    itemsPerPage: 0,
    totalItems: 0
  };


  constructor(
    private socialService: SocialService,
    private toastr: ToastsManager,
    public dialog: MdDialog,
    private router: Router,
    private location: Location,
  ) {
    this.getSocials(this.paginationData.currentPage);
  }


  goBack() {
    this.location.back();
  }


  onDelete(id: string) {
    this.socialService.deleteSocial(id)
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

    this.getSocials(page);
  }

  getSocials(page) {
    this.socialService.getSocials(page)
      .subscribe(
        res => {
          this.paginationData = res.paginationData;
          this.fetchedSocials =  res.data
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
//   selector: 'social-dialog',
//   templateUrl: './socialDialog.component.html',
// })
// export class SocialDialogComponent {
//   constructor(public dialogRef: MdDialogRef<SocialDialogComponent>) {}
//
// }
