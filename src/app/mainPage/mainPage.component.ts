import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {FormService} from '../form/form.service';
import {EditOptionsService} from '../admin/editOptions/editOptions.service';




@Component({
  selector: 'app-mainpage',
  templateUrl: './mainPage.component.html',
  styleUrls: ['./mainPage.component.css']
})


export class MainPageComponent implements OnInit {
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
  constructor(
    private authService: AuthService,
    private formService: FormService,
    private editOptionsService: EditOptionsService,
  ) {
  }

  ngOnInit() {
    // this.formService.getSingleFormFromOptions('design','mainPage','imgLeft')
    //   .subscribe(
    //     forms => this.fetchedForms.imgLeft = forms.obj,
    //     error => console.log(error));
    // this.formService.getSingleFormFromOptions('design','mainPage','imgRight')
    //   .subscribe(
    //     forms => this.fetchedForms.imgRight = forms.obj,
    //     error => console.log(error));
    this.editOptionsService.getOptions()
      .subscribe(
        options => this.design = options.obj.design,
        error => console.log(error));
  }

  // check if user is logged in by asking the authentication service, we use this function in html file *ngIf directive
  isLoggedIn() {
    return this.authService.isLoggedIn();
  }
}
