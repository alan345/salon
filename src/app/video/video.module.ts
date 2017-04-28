import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

// import { VideoListComponent }    from './video-list.component';
// import { VideoDetailComponent }  from './video-detail.component';
// import { VideoService }          from './video.service';

import {VideoDeleteDialog} from './videoDeleteDialog.component';
import {VideoComponent} from './video.component';
import {VideosComponent} from './videos.component';
import {VideoSingleComponent} from './videoSingle.component';
import {VideoService} from './video.service';



import { VideoRoutingModule }    from './videoRouting.module';

@NgModule({
  imports:      [ CommonModule,
     VideoRoutingModule
  ],
  declarations: [
        // VideoDeleteDialog,
        // VideoComponent,
        // VideosComponent,
        // VideoSingleComponent,
      ],
  providers:    [
//  VideoService,
],
entryComponents: [

  //VideoDeleteDialog
]
})
export class VideoModule {}
