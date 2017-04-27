import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { MainPageHomeService} from './mainPageHome.service';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { ToastsManager} from 'ng2-toastr';
import { MdDialog, MdDialogRef} from '@angular/material';
import { EditOptionsComponentDialog }  from '../modalLibrary/modalLibrary.component';
import { AdminService} from '../admin/services/admin.service';
import { VideoService} from '../video/video.service';
import { PressService} from '../press/press.service';
import { Design } from './design.model';

@Component({
  selector: 'app-admin',
  templateUrl: './mainPageHome.component.html',
  styleUrls: ['./mainPageHome.component.css']
})
export class MainPageHomeComponent implements OnInit {

  design  = {
    mainPage:{
      _imgHome1:[{
        _id:'',
        owner:'',
        imagePath:''
      }],
      _imgHome2:[{
        _id:'',
        owner:'',
        imagePath:''
      }],
      _imgHome3:[{
        _id:'',
        owner:'',
        imagePath:''
      }],
      _imgHome4:[{
        _id:'',
        owner:'',
        imagePath:''
      }],
      _imgHome5:[{
        _id:'',
        owner:'',
        imagePath:''
      }],
      _imgHome6:[{
        _id:'',
        owner:'',
        imagePath:''
      }],
    }
  };

  trackinPage = {
    lastVisitPagePressCount:0,
    lastVisitPageVideoCount:0
  }

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
    public videoService: VideoService,
    public pressService: PressService
  ) {}


  openDialog(positionImage) {
    let dialogRef = this.dialog.open(EditOptionsComponentDialog);
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.fetchedObj.design.mainPage[positionImage][0] = result
        this.saveAuto()
      }
    })
  }
  save(model: FormGroup, isValid: boolean) {
    // this.mainPageHomeService.updateOptions(model)
    //   .subscribe(
    //     res => {
    //       this.toastr.success('Great!', res.message)
    //     },
    //     error => {console.log(error)}
    //   )
  }
  saveAuto(){
    this.mainPageHomeService.updateOptions(this.fetchedObj)
      .subscribe(
        res => {
          this.toastr.success('Great!', res.message)
        },
        error => {console.log(error)}
      )
  }




  isAdmin() {
    return this.adminService.isAdmin();
  }

  ngOnInit() {
    this.videoService.countNewItemForUser()
    .subscribe(
      data => this.trackinPage.lastVisitPageVideoCount = data.item,
      error => console.log(error)
    )
    this.pressService.countNewItemForUser()
    .subscribe(
      data => this.trackinPage.lastVisitPagePressCount = data.item,
      error => console.log(error)
    )
    this.mainPageHomeService.getOptions()
      .subscribe(
        options => this.fetchedObj = options.obj,
        error => {console.log(error)}
      );
  }

}
