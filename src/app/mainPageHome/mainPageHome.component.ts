import { Component, OnInit } from '@angular/core';
import { MainPageHomeService} from './mainPageHome.service';
import { FormGroup } from '@angular/forms';
import { ToastsManager} from 'ng2-toastr';
import { MdDialog} from '@angular/material';
import { EditOptionsComponentDialog }  from '../modalLibrary/modalLibrary.component';
import { AdminService} from '../admin/services/admin.service';
import { VideoService} from '../video/video.service';
import { PressService} from '../press/press.service';
import { Options } from './options.model';
import { Router} from '@angular/router';
import { CompanieService} from '../companie/companie.service';
import { AuthService} from '../auth/auth.service';
import { Companie} from '../companie/companie.model';

@Component({
  selector: 'app-admin',
  templateUrl: './mainPageHome.component.html',
  styleUrls: ['./mainPageHome.component.css']
})
export class MainPageHomeComponent implements OnInit {
  companies: Companie[] = []
  trackinPage = {
    lastVisitPagePressCount: [],
    lastVisitPageVideoCount: []
  }
  isEditTitle:boolean = false
  myForm: FormGroup;
  options: Options = {
    design : {
      mainPage:{
        titleHomePage: '',
        buttonHomePage: '',
        linkButtonHomePage: '',
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
    private companieService:CompanieService,
    private router:Router,
    private adminService: AdminService,
    private mainPageHomeService: MainPageHomeService,
    private toastr: ToastsManager,
    public dialog: MdDialog,
    public videoService: VideoService,
    public pressService: PressService,
    private authService: AuthService,
  ) {}

  editTitleHomePage(){
    if(this.isEditTitle)
      this.save()
    this.isEditTitle = !this.isEditTitle
  }
  openDialog(positionImage: string) {
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


  goTo(path: string) {
    if( path === 'user') {
      if(this.companies.length) {
        if(this.isSalesRep() || this.isAdmin()) {
          this.companies.forEach((companie, index) => {
            if(this.isHQcompanie(companie)) {
              this.router.navigate(['/companie/' + this.companies[index]._id + '/users']);
            }
          })
        }
        if(this.isStylist() || this.isManager()) {
          this.router.navigate(['/companie/' + this.companies[0]._id + '/users']);
        }
      }

    } else {
      this.router.navigate([path]);
    }


    // if( (this.isAdmin() || this.isManager()) && path === 'user') {
    //   if(this.companies.length)
    //     this.router.navigate(['/companie/' + this.companies[0]._id + '/users']);
    // } else {
    //   this.router.navigate([path]);
    // }
  }


  ngOnInit() {
    //this.companieService.getCompanieByUserId(this.authService.currentUser.userId)
    this.companieService.getCompanieForCurrentUser()
    .subscribe(
      (data => this.companies = data)
    )


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
        options => this.options = <Options>options.obj,
        error => {console.log(error)}
      );
  }
  isAdmin() {
    return this.authService.isAdmin();
  }
  isStylist() {
    return this.authService.isStylist();
  }
  isSalesRep(){
    return this.authService.isSalesRep();
  }
  isManager(){
    return this.authService.isManager();
  }
  isHQcompanie(companie: Companie) {
    if(companie.typeCompanie === 'HQ')
      return true
    return false
  }
}
