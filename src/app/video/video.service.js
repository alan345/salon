var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Headers, Http, RequestOptions } from '@angular/http';
import { ErrorService } from '../errorHandler/error.service';
import { ToastsManager } from 'ng2-toastr';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { AuthService } from '../auth/auth.service';
var VideoService = (function () {
    //  private token: string = localStorage.getItem('id_token');
    //  private videoId: string = localStorage.getItem('videoId');
    // private videos = [];
    // private singleVideo = Object;
    function VideoService(http, errorService, toastr, authService) {
        this.http = http;
        this.errorService = errorService;
        this.toastr = toastr;
        this.authService = authService;
        this.url = '/';
    }
    VideoService.prototype.getVideos = function (page, search) {
        var _this = this;
        var headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', '' + this.authService.currentUser.token);
        var options = new RequestOptions({ headers: headers, search: search });
        return this.http.get(this.url + 'video/page/' + page, options)
            .timeout(9000)
            .map(function (response) {
            var videos = response.json();
            return videos;
        })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    };
    VideoService.prototype.countNewItemForUser = function () {
        var _this = this;
        var headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', '' + this.authService.currentUser.token);
        var options = new RequestOptions({ headers: headers });
        return this.http.get(this.url + 'video/countNewItemForUser/' + this.authService.currentUser.userId, options)
            .timeout(9000)
            .map(function (response) {
            var videos = response.json();
            return videos;
        })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    };
    //getVideo(id: string) : Observable<Video> {
    VideoService.prototype.getVideo = function (id) {
        var _this = this;
        var headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', '' + this.authService.currentUser.token);
        return this.http.get(this.url + 'video/' + id, { headers: headers })
            .map(function (response) {
            //console.log(response.json().item)
            return response.json().item;
            //  this.singleForm = response.json();
            //return this.singleForm;
        })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    };
    VideoService.prototype.deleteVideo = function (id) {
        var _this = this;
        var headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', '' + this.authService.currentUser.token);
        return this.http.delete(this.url + 'video/' + id, { headers: headers })
            .map(function (response) {
            //  console.log("delete",response)
            return response.json();
            //  this.singleForm = response.json();
            //return this.singleForm;
        })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    };
    VideoService.prototype.saveVideo = function (video) {
        var _this = this;
        //  console.log("this.authService.currentUser.token",this.authService.currentUser.token);
        //  delete video._id;
        delete video._id;
        //console.log(video)
        var body = JSON.stringify(video);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', '' + this.authService.currentUser.token);
        return this.http.post(this.url + 'video/', body, { headers: headers })
            .map(function (response) { return response.json(); })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    };
    VideoService.prototype.updateVideo = function (video) {
        var _this = this;
        var body = JSON.stringify(video);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', '' + this.authService.currentUser.token);
        return this.http.put(this.url + 'video/' + video._id, body, { headers: headers })
            .map(function (response) { return response.json(); })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    };
    return VideoService;
}());
VideoService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http,
        ErrorService,
        ToastsManager,
        AuthService])
], VideoService);
export { VideoService };
//# sourceMappingURL=video.service.js.map