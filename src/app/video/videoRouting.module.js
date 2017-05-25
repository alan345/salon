var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { VideosComponent } from './videos.component';
import { VideoSingleComponent } from './videoSingle.component';
export var routes = [
    { path: '', component: VideosComponent },
    { path: 'videoSingle', component: VideoSingleComponent },
    { path: 'videoSingle/:id', component: VideoSingleComponent },
    { path: ':id', component: VideoSingleComponent },
];
var VideoRouting = (function () {
    function VideoRouting() {
    }
    return VideoRouting;
}());
VideoRouting = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], VideoRouting);
export { VideoRouting };
//# sourceMappingURL=videoRouting.module.js.map