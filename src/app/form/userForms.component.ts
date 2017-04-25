import {Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import {FormService} from './form.service';



@Component({
  selector: 'app-user-form',
  templateUrl: './userForms.component.html',
  styleUrls: ['./form.component.css']
})
export class UserFormsComponent implements OnInit {

  @Output() onPassForm = new EventEmitter<any>();
  fetchedForms = [];


  constructor(private formService: FormService) {
  }

  ngOnInit() {
    this.formService.getUserForms()
      .subscribe(
        forms => this.fetchedForms = forms,
        error => console.log(error));
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
