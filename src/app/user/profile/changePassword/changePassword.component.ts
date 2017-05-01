import {Component, OnInit, ViewChild, ElementRef, Renderer, AfterViewInit} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import {ToastsManager} from 'ng2-toastr';
import {Router} from '@angular/router';
import {newPassword} from '../userProfile.model';
import {ProfileService} from '../profile.service';
import { AuthService} from '../../../auth/auth.service';
import { UserService} from '../../user.service';
import { User } from '../../user.model'

@Component({
  selector: 'app-change-password',
  templateUrl: './changePassword.component.html',
  styleUrls: ['./changePassword.component.css']
})
export class ChangePasswordComponent implements OnInit, AfterViewInit {
  fetchedUser : User = {
    _id: '',
    lastVisit: new Date,
    email:'',
    profile:{
      parentUser:[],
      phoneNumber:'',
      name:'',
      lastName:'',
      title:'',
      _profilePicture:[],
      hair:{
        hairDensity : 'alan',
        hairPorosity : 'alan',
        hairTexture : 'alan',
      }
    },
    notes:[],
    forms:[],
    role:[],
  }
  resetPasswordForm: FormGroup;
  currentPassword: FormControl;
  newPassword: FormControl;
  @ViewChild('userPassword') userPassword: ElementRef;

  constructor(private fb: FormBuilder,
    private profileService: ProfileService,
    private router: Router, private toastr: ToastsManager,
    private renderer: Renderer,
    private authService: AuthService,
    private userService: UserService,
  ) {
  }

  ngOnInit() {

    this.currentPassword = new FormControl('', [Validators.required, Validators.minLength(6)]);
    this.newPassword = new FormControl('', [Validators.required, Validators.minLength(6)]);

    this.resetPasswordForm = this.fb.group({
      currentPassword: this.currentPassword,
      newPassword: this.newPassword,
      email: ['', [Validators.required, Validators.minLength(2)]],
      phoneNumber: ['', [Validators.required, Validators.minLength(2)]],
    })

    this.getUser(this.authService.currentUser.userId)


  }



  getUser(id : string) {
    this.userService.getUser(id)
      .subscribe(
        res => {
          this.fetchedUser = <User>res.user
        },
        error => {
          console.log(error);
        }
      )
  }



  // focus on 'current password' input box after content is initialized
  ngAfterViewInit() {
    // setTimeout(() => {
    //   this.renderer.invokeElementMethod(this.userPassword.nativeElement, 'focus', []);
    // }, 50);
  }

  // submit the password change form to the backend with the new desired credentials
  onSubmit() {
    const newPass = new newPassword(this.resetPasswordForm.value.currentPassword, this.resetPasswordForm.value.newPassword);
    this.profileService.newPassword(newPass)
      .subscribe(
        data => {
          // after successfull registration, the user is redirected to the login page
          this.router.navigate(['/user/login']);
          localStorage.removeItem('id_token');
          // toastr message pops up to inform user that the registration was successfull
          this.toastr.success('Please login with your new password', 'Password changed');
        }
      );
  }
}
