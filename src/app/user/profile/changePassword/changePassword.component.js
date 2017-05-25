var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild, ElementRef, Renderer } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr';
import { Router } from '@angular/router';
import { newPassword } from '../userProfile.model';
import { ProfileService } from '../profile.service';
import { AuthService } from '../../../auth/auth.service';
import { UserService } from '../../user.service';
import { Location } from '@angular/common';
var ChangePasswordComponent = (function () {
    function ChangePasswordComponent(fb, profileService, router, toastr, renderer, authService, userService, location) {
        this.fb = fb;
        this.profileService = profileService;
        this.router = router;
        this.toastr = toastr;
        this.renderer = renderer;
        this.authService = authService;
        this.userService = userService;
        this.location = location;
        this.fetchedUser = {
            _id: '',
            lastVisit: new Date,
            email: '',
            profile: {
                parentUser: [],
                isFeatured: false,
                phoneNumber: '',
                name: '',
                lastName: '',
                title: '',
                _profilePicture: [],
                hair: {
                    hairCondition: 'Normal',
                    scalpCondition: 'Healthy',
                    hairTexture: 'Fine',
                }
            },
            notes: [],
            forms: [],
            role: [],
        };
    }
    ChangePasswordComponent.prototype.ngOnInit = function () {
        this.currentPassword = new FormControl('', [Validators.required, Validators.minLength(6)]);
        this.newPassword = new FormControl('', [Validators.required, Validators.minLength(6)]);
        this.resetPasswordForm = this.fb.group({
            currentPassword: this.currentPassword,
            newPassword: this.newPassword,
        });
        this.myForm = this.fb.group({
            email: ['', [Validators.required, Validators.minLength(2)]],
            phoneNumber: ['', [Validators.required, Validators.minLength(2)]],
        });
        this.getUser(this.authService.currentUser.userId);
    };
    ChangePasswordComponent.prototype.goBack = function () {
        this.location.back();
    };
    ChangePasswordComponent.prototype.getUser = function (id) {
        var _this = this;
        this.userService.getUser(id)
            .subscribe(function (res) {
            _this.fetchedUser = res.user;
        }, function (error) {
            console.log(error);
        });
    };
    // focus on 'current password' input box after content is initialized
    ChangePasswordComponent.prototype.ngAfterViewInit = function () {
        // setTimeout(() => {
        //   this.renderer.invokeElementMethod(this.userPassword.nativeElement, 'focus', []);
        // }, 50);
    };
    ChangePasswordComponent.prototype.save = function () {
        var _this = this;
        this.userService.updateUser(this.fetchedUser)
            .subscribe(function (res) {
            _this.toastr.success('Great!', res.message);
            _this.router.navigate(['/']);
        }, function (error) { console.log(error); });
    };
    // submit the password change form to the backend with the new desired credentials
    ChangePasswordComponent.prototype.onSubmit = function () {
        var _this = this;
        var newPass = new newPassword(this.resetPasswordForm.value.currentPassword, this.resetPasswordForm.value.newPassword);
        this.profileService.newPassword(newPass)
            .subscribe(function (data) {
            // after successfull registration, the user is redirected to the login page
            //this.router.navigate(['/user/login']);
            _this.authService.logout();
            var this2 = _this;
            setTimeout(function () {
                this2.router.navigate(['/user/login']);
            }, 150);
            //  localStorage.removeItem('id_token');
            // toastr message pops up to inform user that the registration was successfull
            //this.toastr.success('Please login with your new password', 'Password changed');
        });
    };
    return ChangePasswordComponent;
}());
__decorate([
    ViewChild('userPassword'),
    __metadata("design:type", ElementRef)
], ChangePasswordComponent.prototype, "userPassword", void 0);
ChangePasswordComponent = __decorate([
    Component({
        selector: 'app-change-password',
        templateUrl: './changePassword.component.html',
        styleUrls: ['./changePassword.component.css']
    }),
    __metadata("design:paramtypes", [FormBuilder,
        ProfileService,
        Router, ToastsManager,
        Renderer,
        AuthService,
        UserService,
        Location])
], ChangePasswordComponent);
export { ChangePasswordComponent };
//# sourceMappingURL=changePassword.component.js.map