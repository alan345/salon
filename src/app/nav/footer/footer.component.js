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
import { Router } from '@angular/router';
var FooterComponent = (function () {
    function FooterComponent(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    FooterComponent.prototype.ngOnInit = function () { };
    FooterComponent.prototype.isLoggedIn = function () {
        return this.authService.isLoggedIn();
    };
    return FooterComponent;
}());
__decorate([
    Input(),
    __metadata("design:type", Object)
], FooterComponent.prototype, "sidenav", void 0);
FooterComponent = __decorate([
    Component({
        selector: 'app-footer',
        templateUrl: './footer.component.html',
        styleUrls: ['./footer.component.css']
    }),
    __metadata("design:paramtypes", [AuthService,
        Router])
], FooterComponent);
export { FooterComponent };
//# sourceMappingURL=footer.component.js.map