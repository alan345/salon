import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { MainPageHomeService} from './mainPageHome.service';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { ToastsManager} from 'ng2-toastr';
import { MdDialog, MdDialogRef} from '@angular/material';
import { EditOptionsComponentDialog }  from '../modalLibrary/modalLibrary.component';
import { AdminService} from '../admin/services/admin.service';



@Component({
  selector: 'app-admin',
  templateUrl: './mainPageHome.component.html',
  styleUrls: ['./mainPageHome.component.css']
})
export class MainPageHomeComponent implements OnInit {

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
    private adminService: AdminService,
    private mainPageHomeService: MainPageHomeService,
    private toastr: ToastsManager,
    public dialog: MdDialog,
  ) {}


  openDialog(positionImage) {
    let dialogRef = this.dialog.open(EditOptionsComponentDialog);
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.fetchedObj.design.mainPage[positionImage][0] = result
      }
    })
  }

  // onPassForm(obj) {
  //   console.log('alan')
  //   console.log(obj)
  //   this.fetchedObj.design.mainPage._imgLeft[0] = obj
  // }

  isAdmin() {
    return this.adminService.isAdmin();
  }

  ngOnInit() {
    this.mainPageHomeService.getOptions()
      .subscribe(
        options => this.fetchedObj = options.obj,
        error => {console.log(error)}
      );
  }


  save(model: FormGroup, isValid: boolean) {
    this.mainPageHomeService.updateOptions(model)
      .subscribe(
        res => {
          this.toastr.success('Great!', res.message)
        },
        error => {console.log(error)}
      );
    }
}
