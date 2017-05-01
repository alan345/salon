import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { MainPageHomeService} from './mainPageHome.service';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { ToastsManager} from 'ng2-toastr';
import { MdDialog, MdDialogRef} from '@angular/material';
import { EditOptionsComponentDialog }  from '../modalLibrary/modalLibrary.component';
import { AdminService} from '../admin/services/admin.service';
import { VideoService} from '../video/video.service';
import { PressService} from '../press/press.service';
import { Options } from './options.model';

@Component({
  selector: 'app-admin',
  templateUrl: './mainPageHome.component.html',
  styleUrls: ['./mainPageHome.component.css']
})
export class MainPageHomeComponent implements OnInit {

  trackinPage = {
    lastVisitPagePressCount:0,
    lastVisitPageVideoCount:0
  }
  isEditTitle:boolean = false
  myForm: FormGroup;
  options : Options = {
    design : {
      mainPage:{
        titleHomePage:'',
        _imgHome1:[],
        _imgHome2:[],
        _imgHome3:[],
        _imgHome4:[],
        _imgHome5:[],
        _imgHome6:[],
      }
    }
  }

  constructor(
    private adminService: AdminService,
    private mainPageHomeService: MainPageHomeService,
    private toastr: ToastsManager,
    public dialog: MdDialog,
    public videoService: VideoService,
    public pressService: PressService
  ) {}

  editTitleHomePage(){
    if(this.isEditTitle)
      this.save()
    this.isEditTitle = !this.isEditTitle
  }
  openDialog(positionImage) {
    let dialogRef = this.dialog.open(EditOptionsComponentDialog);
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.options.design.mainPage[positionImage][0] = result
        this.save()
      }
    })
  }
  // save(model: FormGroup, isValid: boolean) {
  //   // this.mainPageHomeService.updateOptions(model)
  //   //   .subscribe(
  //   //     res => {
  //   //       this.toastr.success('Great!', res.message)
  //   //     },
  //   //     error => {console.log(error)}
  //   //   )
  // }
  save(){
    this.mainPageHomeService.updateOptions(this.options)
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
        options => this.options = options.obj,
        error => {console.log(error)}
      );
  }

}
