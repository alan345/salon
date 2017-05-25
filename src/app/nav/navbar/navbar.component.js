var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { AdminService } from '../../admin/services/admin.service';
import { ProfileService } from '../../user/profile/profile.service';
import { Router } from '@angular/router';
var NavbarComponent = (function () {
    function NavbarComponent(authService, adminService, profileService, router) {
        this.authService = authService;
        this.adminService = adminService;
        this.profileService = profileService;
        this.router = router;
        // private userId: string = localStorage.getItem('userId');
        // private userId: string;
        this.fetchedUser = [];
    }
    NavbarComponent.prototype.ngOnInit = function () {
        // if (this.authService.isLoggedIn()) {
        //   let userId = localStorage.getItem('userId');
        //   this.profileService.getUserDetails(userId)
        //     .subscribe(
        //       (data => {
        //         const userArray = [];
        //         for (let key in data) {
        //           userArray.push(data[key]);
        //         }
        //         this.fetchedUser = userArray;
        //       })
        //     );
        // }
    };
    // check if user is logged in by asking our authentication service, we use this function in html file *ngIf directive
    NavbarComponent.prototype.isLoggedIn = function () {
        return this.authService.isLoggedIn();
    };
    // this calls the logout function from our authentication service, it's activated when user clicks logout in front end.
    // It's called by the (click)='logout()' when the user presses the button
    // logout() {
    //   this.authService.logout();
    //   let this2 = this
    //   setTimeout(function(){
    //       this2.router.navigate(['/user/login']);
    //   }, 150);
    //
    // }
    NavbarComponent.prototype.sideNavOpen = function () {
        //this.sidenav.open()
        this.sidenav.toggle();
    };
    NavbarComponent.prototype.isAdmin = function () {
        return this.adminService.isAdmin();
    };
    return NavbarComponent;
}());
__decorate([
    Input(),
    __metadata("design:type", Object)
], NavbarComponent.prototype, "sidenav", void 0);
NavbarComponent = __decorate([
    Component({
        selector: 'app-navbar',
        templateUrl: './navbar.component.html',
        styleUrls: ['./navbar.component.css']
    }),
    __metadata("design:paramtypes", [AuthService,
        AdminService,
        ProfileService,
        Router])
], NavbarComponent);
export { NavbarComponent };
//# sourceMappingURL=navbar.component.js.map