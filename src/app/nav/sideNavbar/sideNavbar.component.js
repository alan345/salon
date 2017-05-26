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
import { CompanieService } from '../../companie/companie.service';
import { Companie } from '../../companie/companie.model';
var SideNavbarComponent = (function () {
    function SideNavbarComponent(authService, adminService, profileService, router, companieService) {
        this.authService = authService;
        this.adminService = adminService;
        this.profileService = profileService;
        this.router = router;
        this.companieService = companieService;
        this.showAdminMenu = false;
        // private userId: string = localStorage.getItem('userId');
        // private userId: string;
        this.fetchedUser = {
            _id: ''
        };
        this.companies = [];
        this.userBelongToHQ = false;
        this.HQCompanie = new Companie();
        this.search = {
            orderBy: 'name',
            search: '',
            typeCompanie: 'HQ',
        };
    }
    SideNavbarComponent.prototype.ngOnInit = function () {
        this.refresh();
    };
    SideNavbarComponent.prototype.toogleFilters = function () {
        this.showAdminMenu = !this.showAdminMenu;
    };
    SideNavbarComponent.prototype.refresh = function () {
        var _this = this;
        //console.log(this.authService.isLoggedIn())
        if (this.authService.isLoggedIn()) {
            var userId = this.authService.currentUser.userId;
            // this.companieService.getCompanieByUserId(userId)
            this.companieService.getCompanieForCurrentUser()
                .subscribe((function (data) {
                _this.companies = data;
                _this.companies.forEach(function (companie) {
                    if (companie.typeCompanie === 'HQ')
                        _this.userBelongToHQ = true;
                });
            }));
            this.profileService.getUserDetails(userId)
                .subscribe((function (data) {
                _this.fetchedUser = data.user;
            }));
            this.companieService.getCompanieForCurrentUser()
                .subscribe(function (res) {
                //  console.log("companies");
                //console.log(res);
                //console.log(res)
                if (res.length) {
                    _this.HQCompanie = res[0];
                    res.forEach(function (companie) {
                        if (_this.isHQcompanie(companie))
                            _this.HQCompanie = companie;
                    });
                }
            }, function (error) {
                console.log(error);
            });
        }
    };
    SideNavbarComponent.prototype.isHQcompanie = function (companie) {
        if (companie.typeCompanie === 'HQ')
            return true;
        return false;
    };
    // check if user is logged in by asking our authentication service, we use this function in html file *ngIf directive
    SideNavbarComponent.prototype.isLoggedIn = function () {
        return this.authService.isLoggedIn();
    };
    SideNavbarComponent.prototype.goToExterne = function (link) {
        window.open(link, '_blank');
    };
    SideNavbarComponent.prototype.goTo = function (path) {
        this.sidenav.close();
        this.router.navigate([path]);
    };
    SideNavbarComponent.prototype.logout = function () {
        this.sidenav.close();
        this.authService.logout();
        var this2 = this;
        setTimeout(function () {
            this2.router.navigate(['/user/login']);
        }, 150);
    };
    SideNavbarComponent.prototype.isAdmin = function () {
        return this.authService.isAdmin();
    };
    SideNavbarComponent.prototype.isSalesRep = function () {
        return this.authService.isSalesRep();
    };
    return SideNavbarComponent;
}());
__decorate([
    Input(),
    __metadata("design:type", Object)
], SideNavbarComponent.prototype, "sidenav", void 0);
SideNavbarComponent = __decorate([
    Component({
        selector: 'app-sideNavbar',
        templateUrl: './sideNavbar.component.html',
        styleUrls: ['./sideNavbar.component.css']
    }),
    __metadata("design:paramtypes", [AuthService,
        AdminService,
        ProfileService,
        Router,
        CompanieService])
], SideNavbarComponent);
export { SideNavbarComponent };
//# sourceMappingURL=sideNavbar.component.js.map