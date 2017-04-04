import {Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {MdDialog, MdDialogRef} from '@angular/material';
//import { UserFormsComponent }  from '../../userForms/formsTable/userForms.component';



@Component({
  selector: 'edit-options-dialog',
  templateUrl: './editOptionsDialog.component.html',
})
export class EditOptionsComponentDialog {
  constructor(public dialogRef: MdDialogRef<EditOptionsComponentDialog>) {}

}
