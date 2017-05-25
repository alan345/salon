var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { UserFormsComponent } from '../form/userForms.component';
var EditOptionsComponentDialog = (function () {
    function EditOptionsComponentDialog(dialogRef) {
        this.dialogRef = dialogRef;
    }
    EditOptionsComponentDialog.prototype.onUploadFinisedChildToParent = function () {
        // Parent to child
        //https://angular.io/docs/ts/latest/cookbook/component-communication.html#!#parent-to-view-child
        this.userFormsComponent.onUploadFinisedParentToChild();
    };
    return EditOptionsComponentDialog;
}());
__decorate([
    ViewChild(UserFormsComponent),
    __metadata("design:type", UserFormsComponent)
], EditOptionsComponentDialog.prototype, "userFormsComponent", void 0);
EditOptionsComponentDialog = __decorate([
    Component({
        selector: 'edit-options-dialog',
        templateUrl: './editOptionsDialog.component.html',
    }),
    __metadata("design:paramtypes", [MdDialogRef])
], EditOptionsComponentDialog);
export { EditOptionsComponentDialog };
//# sourceMappingURL=modalLibrary.component.js.map