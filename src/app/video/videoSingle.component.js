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
import { VideoService } from './video.service';
import { ToastsManager } from 'ng2-toastr';
import { MdDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { VideoClass } from './video.model';
import { EditOptionsComponentDialog } from '../modalLibrary/modalLibrary.component';
import { FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { VideoDeleteDialog } from './videoDeleteDialog.component';
import { VideoWhereDialogComponent } from './videoWhereDialog.component';
var VideoSingleComponent = (function () {
    function VideoSingleComponent(sanitizer, videoService, toastr, dialog, router, location, activatedRoute, _fb) {
        this.sanitizer = sanitizer;
        this.videoService = videoService;
        this.toastr = toastr;
        this.dialog = dialog;
        this.router = router;
        this.location = location;
        this.activatedRoute = activatedRoute;
        this._fb = _fb;
        // fetchedVideo: Video = {
        //   _id: '',
        //   title: '',
        //   embed: '',
        //   embedSecure: this.sanitizer.bypassSecurityTrustResourceUrl(''),
        //   categories: [],
        //   owner: []
        // }
        this.fetchedVideo = new VideoClass(this.sanitizer);
        this.categoriesHard2 = [
            { name: 'Through your eyes', selected: false },
            { name: 'How to', selected: false },
            { name: 'Fashion', selected: false },
            { name: 'Merchandising', selected: false },
            { name: 'Behind the Scene & Testimonials', selected: false }
        ];
        this.categoriesHard1 = [{
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
        this.inputCategorie = '';
    }
    VideoSingleComponent.prototype.getObjects = function (myForm) {
        return myForm.get('categories').controls;
    };
    VideoSingleComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.myForm = this._fb.group({
            _id: [''],
            title: ['', [Validators.required, Validators.minLength(5)]],
            embed: ['', [Validators.required, Validators.minLength(5)]],
            categories: this._fb.array([])
        });
        this.activatedRoute.params.subscribe(function (params) {
            if (params['id'])
                _this.getVideo(params['id']);
        });
    };
    VideoSingleComponent.prototype.removeCategorie = function (i) {
        this.fetchedVideo.categories.splice(i, 1);
        var control = this.myForm.controls['categories'];
        control.removeAt(i);
        var _2this = this;
        //  setTimeout(function(){
        _2this.refreshHardCategories();
        //  }, 10);
        //this.updatecategoriesHard2()
    };
    VideoSingleComponent.prototype.addCategorie = function () {
        var control = this.myForm.controls['categories'];
        var addrCtrl = this._fb.group({
            name: [''],
            type: ['']
        });
        control.push(addrCtrl);
    };
    VideoSingleComponent.prototype.addCategorieInput = function () {
        this.togglCategorieButton(this.inputCategorie, 'tag');
        this.inputCategorie = '';
    };
    VideoSingleComponent.prototype.togglCategorieButton = function (nameCateg, type) {
        var indexFound;
        this.fetchedVideo.categories.forEach(function (categorie, index) {
            if (categorie.name == nameCateg)
                indexFound = index;
        });
        if (indexFound || indexFound == 0) {
            var _2this_1 = this;
            setTimeout(function () {
                _2this_1.removeCategorie(+indexFound);
            }, 10);
        }
        else {
            this.fetchedVideo.categories.push({ name: nameCateg, type: type });
            this.addCategorie();
        }
    };
    VideoSingleComponent.prototype.goBack = function () {
        this.location.back();
    };
    VideoSingleComponent.prototype.openDialogWhereVideo = function () {
        var dialogRefDelete = this.dialog.open(VideoWhereDialogComponent);
        dialogRefDelete.afterClosed().subscribe(function (result) {
            // if(result) {
            //   this.onDelete(this.fetchedVideo._id)
            //   this.router.navigate(['video']);
            // }
        });
    };
    VideoSingleComponent.prototype.openDialog = function (positionImage) {
        var _this = this;
        var dialogRef = this.dialog.open(EditOptionsComponentDialog);
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this.fetchedVideo[positionImage] = result;
            }
        });
    };
    VideoSingleComponent.prototype.openDialogDelete = function () {
        var _this = this;
        var dialogRefDelete = this.dialog.open(VideoDeleteDialog);
        dialogRefDelete.afterClosed().subscribe(function (result) {
            if (result) {
                _this.onDelete(_this.fetchedVideo._id);
                _this.router.navigate(['video']);
            }
        });
    };
    VideoSingleComponent.prototype.save = function (video) {
        var _this = this;
        if (!this.fetchedVideo.categories.length) {
            this.toastr.error('Error!', 'Please select at least one categorie');
            return;
        }
        if (video._id) {
            this.videoService.updateVideo(video)
                .subscribe(function (res) {
                _this.toastr.success('Great!', res.message);
                _this.router.navigate(['video']);
            }, function (error) { console.log(error); });
        }
        else {
            this.videoService.saveVideo(video)
                .subscribe(function (res) {
                _this.toastr.success('Great!', res.message);
                _this.router.navigate(['video']);
            }, function (error) { console.log(error); });
        }
    };
    VideoSingleComponent.prototype.refreshHardCategories = function () {
        var _this = this;
        this.categoriesHard2.forEach(function (HardCategorie, indexHard) {
            _this.categoriesHard2[indexHard].selected = false;
        });
        this.categoriesHard2.forEach(function (HardCategorie, indexHard) {
            _this.fetchedVideo.categories.forEach(function (fetchedCategorie, indexFetched) {
                if (HardCategorie.name == fetchedCategorie.name) {
                    _this.categoriesHard2[indexHard].selected = true;
                }
            });
        });
        this.categoriesHard1.forEach(function (HardCategorie, indexHard) {
            _this.categoriesHard1[indexHard].selected = false;
        });
        this.categoriesHard1.forEach(function (HardCategorie, indexHard) {
            _this.fetchedVideo.categories.forEach(function (fetchedCategorie, indexFetched) {
                if (HardCategorie.name == fetchedCategorie.name) {
                    _this.categoriesHard1[indexHard].selected = true;
                }
            });
        });
    };
    VideoSingleComponent.prototype.getVideo = function (id) {
        var _this = this;
        this.videoService.getVideo(id)
            .subscribe(function (res) {
            _this.fetchedVideo = res;
            _this.fetchedVideo.embedSecure = _this.sanitizer.bypassSecurityTrustResourceUrl('https://player.vimeo.com/video/' + res.embed);
            //this.fetchedVideo.embedSecure = this.sanitizer.bypassSecurityTrustResourceUrl('//fast.wistia.net/embed/iframe/' + res.embed)
            _this.fetchedVideo.categories.forEach(function (categorie) {
                _this.addCategorie();
            });
            _this.refreshHardCategories();
        }, function (error) {
            console.log(error);
        });
    };
    VideoSingleComponent.prototype.onDelete = function (id) {
        var _this = this;
        this.videoService.deleteVideo(id)
            .subscribe(function (res) {
            _this.toastr.success('Great!', res.message);
        }, function (error) {
            console.log(error);
        });
    };
    return VideoSingleComponent;
}());
VideoSingleComponent = __decorate([
    Component({
        selector: 'app-videos',
        templateUrl: './videoSingle.component.html',
        styleUrls: ['./video.component.css'],
    }),
    __metadata("design:paramtypes", [DomSanitizer,
        VideoService,
        ToastsManager,
        MdDialog,
        Router,
        Location,
        ActivatedRoute,
        FormBuilder])
], VideoSingleComponent);
export { VideoSingleComponent };
//# sourceMappingURL=videoSingle.component.js.map