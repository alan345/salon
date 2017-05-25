var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Renderer, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Reset } from '../../auth/resetPassword';
import { ToastsManager } from 'ng2-toastr';
var ResetPasswordComponent = (function () {
    function ResetPasswordComponent(_fb, _authService, _router, _activatedRoute, toastr, renderer) {
        this._fb = _fb;
        this._authService = _authService;
        this._router = _router;
        this._activatedRoute = _activatedRoute;
        this.toastr = toastr;
        this.renderer = renderer;
        this.token = _activatedRoute.snapshot.params['token'];
    }
    ResetPasswordComponent.prototype.ngOnInit = function () {
        this.password = new FormControl('', [Validators.required, Validators.minLength(6)]);
        this.myForm = this._fb.group({
            password: this.password
        });
        if (this._authService.isLoggedIn()) {
            this._router.navigate(['/']);
        }
    };
    ResetPasswordComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.renderer.invokeElementMethod(_this.newPassword.nativeElement, 'focus', []);
        }, 50);
    };
    ResetPasswordComponent.prototype.onSubmit = function () {
        var _this = this;
        var password = new Reset(null, this.token, this.myForm.value.password);
        console.log(password);
        this._authService.reset(password)
            .subscribe(function (data) {
            _this._router.navigate(['/user/login']);
            _this.toastr.success('Your password has been changed succesfully');
        }, function (error) { return console.log(error); });
    };
    return ResetPasswordComponent;
}());
__decorate([
    ViewChild('newPassword'),
    __metadata("design:type", ElementRef)
], ResetPasswordComponent.prototype, "newPassword", void 0);
ResetPasswordComponent = __decorate([
    Component({
        selector: 'app-reset-password',
        templateUrl: './resetPassword.component.html',
        styleUrls: ['./resetPagesStyle.css']
    }),
    __metadata("design:paramtypes", [FormBuilder, AuthService, Router,
        ActivatedRoute, ToastsManager, Renderer])
], ResetPasswordComponent);
export { ResetPasswordComponent };
//# sourceMappingURL=resetPassword.component.js.map