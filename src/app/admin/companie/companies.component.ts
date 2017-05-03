import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {CompanieService} from '../../companie/companie.service';

import {Companie} from '../../companie/companie.model';
import {ChangeDetectionStrategy, Input} from "@angular/core";
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastsManager} from 'ng2-toastr';
import {Inject, forwardRef} from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';
import {Router, ActivatedRoute, Params } from '@angular/router';
import {Location} from '@angular/common';



@Component({
  selector: 'app-companie',
  templateUrl: './companies.component.html',
  styleUrls: ['./admin.component.css'],

})
export class CompaniesComponent implements OnInit {
  fetchedCompanies : Array<CompaniesComponent> = [];

  loading: boolean;
  paginationData = {
    currentPage: 1,
    itemsPerPage: 0,
    totalItems: 0
  };


  constructor(
    private companieService: CompanieService,

    private modalService: NgbModal,
    private toastr: ToastsManager,
    public dialog: MdDialog,
    private router: Router,
    private location: Location,
  ) {
    this.getCompanies(this.paginationData.currentPage);
  }


  openDialog() {
    // let dialogRef = this.dialog.open(CompanieDialogComponent);
    // dialogRef.afterClosed().subscribe(result => {
    //   if(result) {
    // //    this.fetchedObj.design.mainPage[positionImage][0] = result
    //   }

    // });
  }

  goBack() {
    this.location.back();
  }


  onDelete(id: string) {
    this.companieService.deleteCompanie(id)
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
    this.getCompanies(page);
  }

  getCompanies(page) {
    this.companieService.getCompanies(page)
      .subscribe(
        res => {
        //  console.log("companies");
        //  console.log(res);
          this.paginationData = res.paginationData;
          this.fetchedCompanies =  res.data
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
