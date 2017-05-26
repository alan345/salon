var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Renderer, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { User } from '../user.model';
var RegisterComponent = (function () {
    function RegisterComponent(_fb, _authService, _router, toastr, renderer) {
        this._fb = _fb;
        this._authService = _authService;
        this._router = _router;
        this.toastr = toastr;
        this.renderer = renderer;
    }
    RegisterComponent.prototype.ngOnInit = function () {
        // if the user tries to hit the register page, first we check if he is logged in or not, if he is then we redirect him to the form page
        if (this._authService.isLoggedIn()) {
            this._router.navigateByUrl('/form');
        }
        this.email = new FormControl('', [Validators.required, this.emailValidator]);
        this.password = new FormControl('', [Validators.required, Validators.minLength(6)]);
        this.myForm = this._fb.group({
            email: this.email,
            password: this.password,
            profile: this._fb.group({
                name: ['', [Validators.required, Validators.minLength(2)]],
                lastName: ['', [Validators.required, Validators.minLength(2)]],
                title: ['', [Validators.required, Validators.minLength(2)]],
            })
        });
    };
    RegisterComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.renderer.invokeElementMethod(_this.userEmail.nativeElement, 'focus', []);
        }, 50);
    };
    // submit the register form to the backend with the user's desired credentials
    RegisterComponent.prototype.onSubmit = function () {
        var _this = this;
        //const user = new User(this.myForm.value.email, this.myForm.value.password);
        var user = new User();
        user.email = this.myForm.value.email;
        user.password = this.myForm.value.password;
        user.profile = this.myForm.value.profile;
        this._authService.signup(user)
            .subscribe(function (data) {
            // after successfull registration, the user is redirected to the login page
            _this._router.navigate(['/user/login']);
            // toastr message pops up to inform user that the registration was successfull
            _this.toastr.success('Please Login', 'Registration Successfull');
        });
    };
    // input validator to check if the email entered by the user is actually text in an email form
    RegisterComponent.prototype.emailValidator = function (control) {
        var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
        if (!EMAIL_REGEXP.test(control.value)) {
            return { invalidEmail: true };
        }
    };
    return RegisterComponent;
}());
__decorate([
    ViewChild('userEmail'),
    __metadata("design:type", ElementRef)
], RegisterComponent.prototype, "userEmail", void 0);
RegisterComponent = __decorate([
    Component({
        selector: 'app-register',
        templateUrl: './register.component.html',
        styleUrls: ['./register.component.css']
    }),
    __metadata("design:paramtypes", [FormBuilder, AuthService,
        Router, ToastsManager, Renderer])
], RegisterComponent);
export { RegisterComponent };
//# sourceMappingURL=register.component.js.map