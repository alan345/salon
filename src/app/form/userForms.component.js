var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormService } from './form.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { SeePictureDialogComponent } from '../seePictureDialog/seePictureDialog.component';
import { MdDialog } from '@angular/material';
var UserFormsComponent = (function () {
    function UserFormsComponent(dialog, formService, activatedRoute, authService) {
        this.dialog = dialog;
        this.formService = formService;
        this.activatedRoute = activatedRoute;
        this.authService = authService;
        this.onPassForm = new EventEmitter();
        this.fetchedForms = [];
        this.paginationData = {
            currentPage: 1,
            itemsPerPage: 0,
            totalItems: 0
        };
        this.search = {
            id: '',
            itemsPerPage: 5,
            seeAll: false
        };
    }
    UserFormsComponent.prototype.ngOnInit = function () {
        this.refresh();
    };
    UserFormsComponent.prototype.refresh = function () {
        var this2 = this;
        setTimeout(function () {
            this2.getUserForms(this2.paginationData.currentPage);
        }, 50);
    };
    UserFormsComponent.prototype.getPage = function (page) {
        this.getUserForms(page);
    };
    UserFormsComponent.prototype.getUserForms = function (page) {
        var _this = this;
        this.search['id'] = this.authService.currentUser.userId,
            this.search['itemsPerPage'] = this.itemsPerPage,
            this.formService.getUserForms(page, this.search)
                .subscribe(function (res) {
                _this.paginationData = res.paginationData;
                _this.fetchedForms = res.data;
            }, function (error) { return console.log(error); });
    };
    UserFormsComponent.prototype.isFormPdf = function (form) {
        if (form.type === 'pdf')
            return true;
        return false;
    };
    UserFormsComponent.prototype.onSelectRow = function (form) {
        if (this.isDialog) {
            this.onPassForm.emit(form);
        }
        else {
            if (this.isFormPdf(form)) {
                var url = './uploads/forms/' + form.owner + '/' + form.imagePath;
                window.open(url);
            }
            else {
                var dialogRef = this.dialog.open(SeePictureDialogComponent);
                dialogRef.componentInstance.form = form;
                // dialogRef.afterClosed().subscribe(result => {
                // })
            }
        }
    };
    UserFormsComponent.prototype.isAdmin = function () {
        return this.authService.isAdmin();
    };
    UserFormsComponent.prototype.onDelete = function (formId) {
        var _this = this;
        this.formService.deleteForm(formId)
            .subscribe(function (res) {
            _this.getUserForms(_this.paginationData.currentPage);
        }, function (error) { return console.log(error); });
    };
    UserFormsComponent.prototype.onUploadFinisedParentToChild = function () {
        this.ngOnInit();
    };
    return UserFormsComponent;
}());
__decorate([
    Input(),
    __metadata("design:type", Number)
], UserFormsComponent.prototype, "itemsPerPage", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], UserFormsComponent.prototype, "isDialog", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], UserFormsComponent.prototype, "onPassForm", void 0);
UserFormsComponent = __decorate([
    Component({
        selector: 'app-user-form',
        templateUrl: './userForms.component.html',
        styleUrls: ['./form.component.css']
    }),
    __metadata("design:paramtypes", [MdDialog,
        FormService,
        ActivatedRoute,
        AuthService])
], UserFormsComponent);
export { UserFormsComponent };
//# sourceMappingURL=userForms.component.js.map