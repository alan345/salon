import {Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import {FormService} from './form.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './userForms.component.html',
  styleUrls: ['./form.component.css']
})
export class UserFormsComponent implements OnInit {

  @Output() onPassForm = new EventEmitter<any>();
  fetchedForms = [];

  loading: boolean;
  paginationData = {
    currentPage: 1,
    itemsPerPage: 0,
    totalItems: 0
  };

  constructor(
    private formService: FormService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
  ) {}

  ngOnInit() {
      this.getUserForms(this.paginationData.currentPage)
  }

  getPage(page: number) {
    this.getUserForms(page);
  }

  getUserForms(page){
    //this.activatedRoute.params.subscribe((params: Params) => {
      let id=this.authService.currentUser.userId
      // if(params['id']) {
      //   id = params['id']
      // }
      this.formService.getUserForms(page, id)
        .subscribe(
          res => {
            this.paginationData = res.paginationData;
            this.fetchedForms = res.data
          },
          error => console.log(error))
  //  })
  }

  onSelectRow(formId){
    this.onPassForm.emit(formId);
  }

  onDelete(formId) {
    this.formService.deleteForm(formId)
      .subscribe(
        res => {
          this.getUserForms(this.paginationData.currentPage)
        },
        error => console.log(error))
  }
  onUploadFinisedParentToChild(){
    this.ngOnInit()
  }
}
