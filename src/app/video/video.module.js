var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VideoDeleteDialog } from './videoDeleteDialog.component';
import { VideoWhereDialogComponent } from './videoWhereDialog.component';
import { VideoComponent } from './video.component';
import { VideosComponent } from './videos.component';
import { VideoSingleComponent } from './videoSingle.component';
import { VideoService } from './video.service';
import { VideoRouting } from './videoRouting.module';
import { MaterialModule } from '@angular/material';
import { Ng2PaginationModule } from 'ng2-pagination';
var VideoModule = (function () {
    function VideoModule() {
    }
    return VideoModule;
}());
VideoModule = __decorate([
    NgModule({
        imports: [
            VideoRouting,
            CommonModule,
            FormsModule,
            MaterialModule,
            Ng2PaginationModule,
            ReactiveFormsModule,
        ],
        declarations: [
            VideoDeleteDialog,
            VideoWhereDialogComponent,
            VideoComponent,
            VideosComponent,
            VideoSingleComponent,
        ],
        exports: [VideosComponent],
        providers: [VideoService],
        entryComponents: [
            VideoDeleteDialog,
            VideoWhereDialogComponent,
        ]
    })
], VideoModule);
export { VideoModule };
//# sourceMappingURL=video.module.js.map