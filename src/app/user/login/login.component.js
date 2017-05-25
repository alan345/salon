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
import { AuthService } from '../../auth/auth.service';
import { User } from '../../auth/user.model';
var LoginComponent = (function () {
    function LoginComponent(_fb, _authService, _router, toastr, renderer) {
        this._fb = _fb;
        this._authService = _authService;
        this._router = _router;
        this.toastr = toastr;
        this.renderer = renderer;
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.email = new FormControl('', [Validators.required, this.emailValidator]);
        this.password = new FormControl('', [Validators.required, Validators.minLength(6)]);
        this.myForm = this._fb.group({
            email: this.email,
            password: this.password
        });
        // check if the user is logged in while trying to access the login page, if the user is logged in, we redirect him to the form page
        if (this._authService.isLoggedIn()) {
            this.toastr.info('You are already logged in');
            this._router.navigate(['/']);
        }
    };
    LoginComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.renderer.invokeElementMethod(_this.userEmail.nativeElement, 'focus', []);
        }, 50);
    };
    // submit the login form with the user credentials and navigate the user to the index page of our app
    LoginComponent.prototype.onSubmit = function () {
        var _this = this;
        var user = new User(this.myForm.value.email, this.myForm.value.password);
        this._authService.signin(user)
            .subscribe(function (data) {
            //console.log(data)
            // if the user credentials are correct, set the localStorage token and userId,
            // we need these info in order to do stuff later when the user is signed in and verified
            localStorage.setItem('id_token', data.token);
            localStorage.setItem('token', data.token);
            //localStorage.setItem('userId', data.userId);
            // navigate user to index page of our app
            //gooplus
            _this._router.navigate(['/']);
            //location.reload();
            // display toastr success message pop up to inform the user that he logged in successfully
            _this.toastr.success('You have been logged in!');
        }, function (error) { return console.log(error); });
    };
    // input validator to check if the email entered by the user is actually text in an email form
    LoginComponent.prototype.emailValidator = function (control) {
        var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
        if (!EMAIL_REGEXP.test(control.value)) {
            return { invalidEmail: true };
        }
    };
    return LoginComponent;
}());
__decorate([
    ViewChild('userEmail'),
    __metadata("design:type", ElementRef)
], LoginComponent.prototype, "userEmail", void 0);
LoginComponent = __decorate([
    Component({
        selector: 'app-login',
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.css']
    }),
    __metadata("design:paramtypes", [FormBuilder, AuthService,
        Router, ToastsManager, Renderer])
], LoginComponent);
export { LoginComponent };
//# sourceMappingURL=login.component.js.map