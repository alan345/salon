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
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { Reset } from '../../auth/resetPassword';
import { ToastsManager } from 'ng2-toastr';
var ForgetPasswordComponent = (function () {
    function ForgetPasswordComponent(_fb, _authService, _router, toastr, renderer) {
        this._fb = _fb;
        this._authService = _authService;
        this._router = _router;
        this.toastr = toastr;
        this.renderer = renderer;
    }
    ForgetPasswordComponent.prototype.ngOnInit = function () {
        this.email = new FormControl('', [Validators.required, this.emailValidator]);
        this.myForm = this._fb.group({
            email: this.email
        });
        if (this._authService.isLoggedIn()) {
            this._router.navigate(['/']);
        }
    };
    ForgetPasswordComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.renderer.invokeElementMethod(_this.userEmail.nativeElement, 'focus', []);
        }, 50);
    };
    ForgetPasswordComponent.prototype.onSubmit = function () {
        var _this = this;
        var email = new Reset(this.myForm.value.email, null, null);
        this._authService.forget(email)
            .subscribe(function (data) {
            _this._router.navigate(['/']);
            _this.toastr.success('An email has been sent with password reset instructions');
        }, function (error) { return console.log(error); });
    };
    ForgetPasswordComponent.prototype.emailValidator = function (control) {
        var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
        if (!EMAIL_REGEXP.test(control.value)) {
            return { invalidEmail: true };
        }
    };
    return ForgetPasswordComponent;
}());
__decorate([
    ViewChild('userEmail'),
    __metadata("design:type", ElementRef)
], ForgetPasswordComponent.prototype, "userEmail", void 0);
ForgetPasswordComponent = __decorate([
    Component({
        selector: 'app-forget-password',
        templateUrl: './forgetPassword.component.html',
        styleUrls: ['./resetPagesStyle.css']
    }),
    __metadata("design:paramtypes", [FormBuilder, AuthService,
        Router, ToastsManager, Renderer])
], ForgetPasswordComponent);
export { ForgetPasswordComponent };
//# sourceMappingURL=forgetPassword.component.js.map