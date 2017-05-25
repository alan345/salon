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
import { UserService } from '../user.service';
import { ToastsManager } from 'ng2-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
var AddNoteComponent = (function () {
    function AddNoteComponent(userService, toastr, 
        //    public dialog: MdDialog,
        router, location, activatedRoute, _fb) {
        this.userService = userService;
        this.toastr = toastr;
        this.router = router;
        this.location = location;
        this.activatedRoute = activatedRoute;
        this._fb = _fb;
        //fetchedUser = new User()
        //fetchedUser : User;
        this.fetchedUser = {
            notes: []
        };
        this.newTextNote = '';
    }
    AddNoteComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.myForm = this._fb.group({
            newTextNote: ['', [Validators.required, Validators.minLength(5)]],
        });
        this.activatedRoute.params.subscribe(function (params) {
            _this.getUser(params['id']);
        });
    };
    AddNoteComponent.prototype.getUser = function (id) {
        var _this = this;
        this.userService.getUser(id)
            .subscribe(function (res) {
            _this.fetchedUser = res.user;
        }, function (error) {
            console.log(error);
        });
    };
    AddNoteComponent.prototype.goBack = function () {
        this.location.back();
    };
    AddNoteComponent.prototype.save = function (model, isValid) {
        var _this = this;
        this.fetchedUser.notes.unshift({
            text: model.value.newTextNote,
            dateNote: Date.now()
        });
        this.userService.updateUser(this.fetchedUser)
            .subscribe(function (res) {
            _this.toastr.success('Great!', res.message);
        }, function (error) { console.log(error); });
        this.goBack();
    };
    return AddNoteComponent;
}());
AddNoteComponent = __decorate([
    Component({
        selector: 'app-users',
        templateUrl: './addNote.component.html',
        styleUrls: ['./user.component.css'],
    }),
    __metadata("design:paramtypes", [UserService,
        ToastsManager,
        Router,
        Location,
        ActivatedRoute,
        FormBuilder])
], AddNoteComponent);
export { AddNoteComponent };
//# sourceMappingURL=addNote.component.js.map