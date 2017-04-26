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


  constructor(
      private formService: FormService,
      private activatedRoute: ActivatedRoute,
      private authService: AuthService,
      ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      let id=this.authService.currentUser.userId
      if(params['id']) {
        id = params['id']
      }

      this.formService.getUserForms(id)
        .subscribe(
          forms => this.fetchedForms = forms,
          error => console.log(error))
    })
  }

  onSelectRow(formId){
    this.onPassForm.emit(formId);
  }

  onDelete(formId) {
    this.formService.deleteForm(formId)
      .subscribe();
  }
  onUploadFinisedParentToChild(){
    this.ngOnInit()
  }
}
