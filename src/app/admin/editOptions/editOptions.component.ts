import {Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import {EditOptionsService} from './editOptions.service';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {ToastsManager} from 'ng2-toastr';
import {MdDialog, MdDialogRef} from '@angular/material';
//import { UserFormsComponent }  from '../../userForms/formsTable/userForms.component';





@Component({
  selector: 'app-admin',
  templateUrl: './editOptions.component.html',
  styleUrls: ['./editOptions.component.css']
})
export class EditOptionsComponent implements OnInit {

  design = {
    mainPage:{
      _imgLeft:[{
        _id:'',
        owner:'',
        imagePath:''
      }],
      _imgRight:[{
        _id:'',
        owner:'',
        imagePath:''
      }]
    },
    imgRight:'',
  };

  myForm: FormGroup;
  fetchedObj = {
    'dateSubmitted' : '',
    'design' : this.design,
  }

  constructor(
    private editOptionsService: EditOptionsService,
    private toastr: ToastsManager,
    public dialog: MdDialog,
  ) {}


  openDialog(positionImage) {
    let dialogRef = this.dialog.open(EditOptionsComponentDialog);
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.fetchedObj.design.mainPage[positionImage][0] = result
      }

    });
  }

  // onPassForm(obj) {
  //   console.log('alan')
  //   console.log(obj)
  //   this.fetchedObj.design.mainPage._imgLeft[0] = obj
  // }


  ngOnInit() {
    this.editOptionsService.getOptions()
      .subscribe(
        options => this.fetchedObj = options.obj,
        error => {console.log(error)}
      );
  }


  save(model: FormGroup, isValid: boolean) {

    this.editOptionsService.updateOptions(model)
      .subscribe(
        res => {
          this.toastr.success('Great!', res.message)
        },
        error => {console.log(error)}
      );
    }
}



@Component({
  selector: 'edit-options-dialog',
  templateUrl: './editOptionsDialog.component.html',
})
export class EditOptionsComponentDialog {
  constructor(public dialogRef: MdDialogRef<EditOptionsComponentDialog>) {}

}
