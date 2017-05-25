var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { MdDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { SubmitPicDialog } from './submitPicDialog.component';
var SocialsComponent = (function () {
    function SocialsComponent(toastr, dialog, router, location) {
        this.toastr = toastr;
        this.dialog = dialog;
        this.router = router;
        this.location = location;
    }
    SocialsComponent.prototype.openDialog = function () {
        var dialogRef = this.dialog.open(SubmitPicDialog);
        dialogRef.afterClosed().subscribe(function (result) {
        });
    };
    SocialsComponent.prototype.goBack = function () {
        this.location.back();
    };
    SocialsComponent.prototype.ngOnInit = function () {
    };
    return SocialsComponent;
}());
SocialsComponent = __decorate([
    Component({
        selector: 'app-socials',
        templateUrl: './socials.component.html',
        styleUrls: ['./social.component.css'],
    }),
    __metadata("design:paramtypes", [ToastsManager,
        MdDialog,
        Router,
        Location])
], SocialsComponent);
export { SocialsComponent };
//# sourceMappingURL=socials.component.js.map