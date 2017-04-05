import { Component, OnInit} from '@angular/core';
import { AuthService} from '../auth/auth.service';
import { PromotionService} from './promotion.service';
//import {RegionComponent} from '../region/region.component';
//import {Promotion} from '../promotion.model';
import { ChangeDetectionStrategy, Input} from "@angular/core";
import { ToastsManager} from 'ng2-toastr';
import { Inject, forwardRef} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { Location } from '@angular/common';



@Component({
  selector: 'app-promotions',
  templateUrl: './newPromotion.component.html',
  styleUrls: ['./promotion.component.css'],

})
export class NewPromotionComponent implements OnInit {
  fetchedPromotion = {
    profile: {
      name : '',
      hair: {
        hairDensity : '',
        hairPorosity : '',
        hairTexture : '',
      }
    }
  }
  myForm: FormGroup;


  constructor(
    private promotionService: PromotionService,
    private toastr: ToastsManager,
    private router: Router,
    private location: Location,
  ) {}

  goBack() {
    this.location.back();
  }

  save(model: FormGroup, isValid: boolean) {
    console.log(model)
    this.promotionService.savePromotion(model)
      .subscribe(
        res => {
          this.toastr.success('Great!', res.message)
        },
        error => {console.log(error)}
      );
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





  ngOnInit() {
    //this.fetchedPromotion.profile.name = 'toto'
  }
}
