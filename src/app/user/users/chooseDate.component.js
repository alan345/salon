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
var ChooseDateComponent = (function () {
    function ChooseDateComponent(userService, toastr, 
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
            _id: '',
            lastVisit: new Date,
            email: '',
            profile: {
                parentUser: [],
                isFeatured: false,
                phoneNumber: '',
                name: '',
                lastName: '',
                title: '',
                _profilePicture: [],
                hair: {
                    hairCondition: 'Normal',
                    scalpCondition: 'Healthy',
                    hairTexture: 'Fine',
                }
            },
            notes: [],
            forms: [],
            role: [],
        };
        // fetchedUser = {
        //   lastVisit : new Date,
        // }
        this.newDate = '';
    }
    ChooseDateComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.myForm = this._fb.group({
            newDate: ['', [Validators.required, Validators.minLength(2)]],
        });
        this.activatedRoute.params.subscribe(function (params) {
            _this.getUser(params['id']);
        });
    };
    ChooseDateComponent.prototype.getUser = function (id) {
        var _this = this;
        this.userService.getUser(id)
            .subscribe(function (res) {
            _this.fetchedUser = res.user;
        }, function (error) {
            console.log(error);
        });
    };
    ChooseDateComponent.prototype.goBack = function () {
        this.location.back();
    };
    ChooseDateComponent.prototype.save = function (model, isValid) {
        //console.log(this.newDate)
        // console.log(year)
        // console.log(month)
        // console.log(day)
        // // console.log(new Date(Date.UTC(2017, 7, 7, 7, 7, 7,7)))
        // // console.log(new Date(this.newDate))
        // // console.log( model.value.newDate)
        // //let stringNewDate = model.value.newDate.yearNewDate + '-' + model.value.newDate.monthNewDate   + '-' + model.value.newDate.dayNewDate
        var _this = this;
        var year = Number(this.newDate.substring(0, 4));
        var month = Number(this.newDate.substring(5, 7));
        var day = Number(this.newDate.substring(8, 10));
        this.fetchedUser.lastVisit = new Date(year, month - 1, day);
        //this.fetchedUser.lastVisit = model.value.newDate
        this.userService.updateUser(this.fetchedUser)
            .subscribe(function (res) {
            _this.toastr.success('Great!', res.message);
        }, function (error) { console.log(error); });
        this.goBack();
    };
    return ChooseDateComponent;
}());
ChooseDateComponent = __decorate([
    Component({
        selector: 'app-users',
        templateUrl: './chooseDate.component.html',
        styleUrls: ['./user.component.css'],
    }),
    __metadata("design:paramtypes", [UserService,
        ToastsManager,
        Router,
        Location,
        ActivatedRoute,
        FormBuilder])
], ChooseDateComponent);
export { ChooseDateComponent };
//# sourceMappingURL=chooseDate.component.js.map