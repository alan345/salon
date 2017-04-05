import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {PromotionService} from './promotion.service';
//import {RegionComponent} from '../region/region.component';
import {Promotion} from './promotion.model';
import {ChangeDetectionStrategy, Input} from "@angular/core";
import {ToastsManager} from 'ng2-toastr';
import {Inject, forwardRef} from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';
import {Router, ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';




@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotion.component.css'],

})
export class PromotionsComponent implements OnInit {
  fetchedPromotions : Array<PromotionsComponent> = [];
  paginationData = {
    currentPage: 1,
    itemsPerPage: 0,
    totalItems: 0
  };


  constructor(
    private promotionService: PromotionService,
    private toastr: ToastsManager,
    public dialog: MdDialog,
    private router: Router,
    private location: Location,
  ) {
    this.getPromotions(this.paginationData.currentPage);
  }


  goBack() {
    this.location.back();
  }


  onDelete(id: string) {
    this.promotionService.deletePromotion(id)
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

    this.getPromotions(page);
  }

  getPromotions(page) {
    this.promotionService.getPromotions(page)
      .subscribe(
        res => {
          this.paginationData = res.paginationData;
          this.fetchedPromotions =  res.data
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
//   selector: 'promotion-dialog',
//   templateUrl: './promotionDialog.component.html',
// })
// export class PromotionDialogComponent {
//   constructor(public dialogRef: MdDialogRef<PromotionDialogComponent>) {}
//
// }
