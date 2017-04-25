import {Component, OnInit, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {MdDialog, MdDialogRef} from '@angular/material';
import { UserFormsComponent }  from './userForms.component';



@Component({
  selector: 'user-FormsUploadAndList',
  templateUrl: './userFormsUploadAndList.component.html',
})

export class UserFormsUploadAndList {
  @ViewChild(UserFormsComponent)
  private userFormsComponent: UserFormsComponent;

  constructor() {}


  onUploadFinisedChildToParent(){
    // Parent to child
    //https://angular.io/docs/ts/latest/cookbook/component-communication.html#!#parent-to-view-child
    this.userFormsComponent.onUploadFinisedParentToChild()
  }
}
