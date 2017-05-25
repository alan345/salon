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
import { ToastsManager } from 'ng2-toastr';
import { AdminService } from './admin.service';
var AdminGuardService = (function () {
    function AdminGuardService(router, toastr, adminService) {
        this.router = router;
        this.toastr = toastr;
        this.adminService = adminService;
    }
    // we check if the user is an Administrator or not
    AdminGuardService.prototype.canActivate = function (route, state) {
        if (this.adminService.isAdmin()) {
            return true;
        }
        else {
            this.router.navigate(['/']);
        }
    };
    return AdminGuardService;
}());
AdminGuardService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Router, ToastsManager, AdminService])
], AdminGuardService);
export { AdminGuardService };
//# sourceMappingURL=adminGuard.js.map