import {Component, OnInit, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {MdDialog, MdDialogRef} from '@angular/material';
import { UserFormsComponent }  from '../userForms/formsTable/userForms.component';



@Component({
  selector: 'edit-options-dialog',
  templateUrl: './editOptionsDialog.component.html',
})

export class EditOptionsComponentDialog {
  @ViewChild(UserFormsComponent)
  private userFormsComponent: UserFormsComponent;

  constructor(public dialogRef: MdDialogRef<EditOptionsComponentDialog>) {}


  onUploadFinisedChildToParent(){
    // Parent to child
    //https://angular.io/docs/ts/latest/cookbook/component-communication.html#!#parent-to-view-child
    this.userFormsComponent.onUploadFinisedParentToChild()
  }
}
