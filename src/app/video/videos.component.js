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
import { AuthService } from '../auth/auth.service';
import { VideoService } from './video.service';
import { ToastsManager } from 'ng2-toastr';
import { MdDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { ViewEncapsulation } from '@angular/core';
import { UserService } from '../user/user.service';
var VideosComponent = (function () {
    function VideosComponent(sanitizer, videoService, toastr, dialog, router, location, authService, userService) {
        var _this = this;
        this.sanitizer = sanitizer;
        this.videoService = videoService;
        this.toastr = toastr;
        this.dialog = dialog;
        this.router = router;
        this.location = location;
        this.authService = authService;
        this.userService = userService;
        this.token = localStorage.getItem('id_token');
        this.fetchedVideos = [];
        this.search = {
            categories: [],
            search: ''
        };
        this.paginationData = {
            currentPage: 1,
            itemsPerPage: 0,
            totalItems: 0
        };
        this.categories1 = [{
                name: 'phyto',
                selected: false
            },
            {
                name: 'phytoSpecific',
                selected: false
            },
            {
                name: 'subtil',
                selected: false
            }];
        this.categories2 = '';
        this.categoriesHard2 = [
            { name: 'Through your eyes', selected: false },
            { name: 'How to', selected: false },
            { name: 'Fashion', selected: false },
            { name: 'Merchandising', selected: false },
            { name: 'Behind the Scene & Testimonials', selected: false }
        ];
        this.trackinPage = {
            lastVisitPagePressCount: [],
            lastVisitPageVideoCount: []
        };
        this.onSelectChange = function ($event) {
            //    console.log($event)
            _this.categories2 = $event.tab.textLabel;
            _this.updateCategerories();
            // this.search.categories = []
            // this.search.categories.push({name:$event.tab.textLabel})
            // this.getVideos(this.paginationData.currentPage, this.search)
        };
    }
    VideosComponent.prototype.goBack = function () {
        this.location.back();
    };
    VideosComponent.prototype.updateCategerories = function () {
        var _this = this;
        this.search.categories = [];
        this.search.categories.push({ name: this.categories2 });
        // if(this.inputSearch)
        //   this.search.categories.push({name:this.inputSearch})
        this.categories1.forEach(function (categorie1) {
            if (categorie1.selected == true) {
                _this.search.categories.push({ name: categorie1.name });
            }
        });
        //    console.log(this.search.categories)
        this.fetchedVideos = [];
        this.getVideos(1, this.search);
    };
    VideosComponent.prototype.changeCateg1 = function (nameCateg) {
        var _this = this;
        //this.categories1[nameCateg] = !this.categories1[nameCateg]
        this.categories1.forEach(function (categ, index) {
            if (categ.name === nameCateg) {
                _this.categories1[index].selected = !_this.categories1[index].selected;
            }
        });
        this.updateCategerories();
    };
    VideosComponent.prototype.addSearchInput = function () {
        //    console.log(this.search.categories)
        this.updateCategerories();
        // this.search.categories.pop()
    };
    VideosComponent.prototype.onDelete = function (id) {
        var _this = this;
        this.videoService.deleteVideo(id)
            .subscribe(function (res) {
            _this.toastr.success('Great!', res.message);
            console.log(res);
        }, function (error) {
            console.log(error);
        });
    };
    // getPage(page: number) {
    //   this.getVideos(page, this.search);
    // }
    VideosComponent.prototype.loadMore = function () {
        this.paginationData.currentPage = this.paginationData.currentPage + 1;
        this.getVideos(this.paginationData.currentPage, this.search);
    };
    VideosComponent.prototype.getVideos = function (page, search) {
        var _this = this;
        //this.fetchedVideos =[]
        this.loading = true;
        this.videoService.getVideos(page, search)
            .subscribe(function (res) {
            _this.paginationData = res.paginationData;
            var fetchedVideosNotSecure = res.data;
            fetchedVideosNotSecure.forEach(function (video) {
                //isNewVideo = false
                //video['embedSecure'] = this.sanitizer.bypassSecurityTrustResourceUrl('//fast.wistia.net/embed/iframe/' + video['embed'])
                video['embedSecure'] = _this.sanitizer.bypassSecurityTrustResourceUrl('https://player.vimeo.com/video/' + video['embed']);
                video['isNewVideo'] = false;
                _this.trackinPage.lastVisitPageVideoCount.forEach(function (videoNotRead) {
                    if (videoNotRead._id == video._id)
                        video['isNewVideo'] = true;
                });
                _this.fetchedVideos.push(video);
            });
            _this.loading = false;
        }, function (error) {
            console.log(error);
        });
    };
    VideosComponent.prototype.ngOnInit = function () {
        var _this = this;
        var userId = this.authService.currentUser.userId;
        this.videoService.countNewItemForUser()
            .subscribe(function (data) {
            _this.trackinPage.lastVisitPageVideoCount = data.item;
            _this.userService.getUser(userId)
                .subscribe(function (res) {
                res.user.trackinPage.lastVisitPageVideo = new Date();
                _this.userService.updateUser(res.user)
                    .subscribe(function (res) { }, function (error) {
                    console.log(error);
                });
            }, function (error) {
                console.log(error);
            });
        }, function (error) { return console.log(error); });
        this.categories2 = 'what\'s new';
        this.updateCategerories();
    };
    VideosComponent.prototype.isAdmin = function () {
        return this.authService.isAdmin();
    };
    return VideosComponent;
}());
VideosComponent = __decorate([
    Component({
        selector: 'app-videos',
        templateUrl: './videos.component.html',
        styleUrls: ['./video.component.css'],
        encapsulation: ViewEncapsulation.None
    }),
    __metadata("design:paramtypes", [DomSanitizer,
        VideoService,
        ToastsManager,
        MdDialog,
        Router,
        Location,
        AuthService,
        UserService])
], VideosComponent);
export { VideosComponent };
//# sourceMappingURL=videos.component.js.map