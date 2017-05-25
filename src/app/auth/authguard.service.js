var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { ToastsManager } from 'ng2-toastr';
var AuthGuardService = (function () {
    function AuthGuardService(authService, router, toastr) {
        this.authService = authService;
        this.router = router;
        this.toastr = toastr;
    }
    // we check if the user is logged in or not
    AuthGuardService.prototype.canActivate = function (route, state) {
        // user is actually logged in
        if (this.authService.isLoggedIn()) {
            return true;
            // user is not logged in, return the user to the login page
        }
        else {
            this.router.navigate(['/user/login']);
            //  this.toastr.error('Please login first');
        }
    };
    return AuthGuardService;
}());
AuthGuardService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [AuthService, Router, ToastsManager])
], AuthGuardService);
export { AuthGuardService };
//# sourceMappingURL=authguard.service.js.map