import { Routes,
         RouterModule }        from '@angular/router';
import { NgModule }            from '@angular/core';
import {AuthGuardService} from '../auth/authguard.service';

import {AppComponent} from '../app.component';

import {VideosComponent} from './videos.component';
import {VideoSingleComponent} from './videoSingle.component';
//import {NewVideoComponent} from './newVideo.component';


export const routes: Routes = [
  {path: '', component: VideosComponent},
  {path: 'videoSingle', component: VideoSingleComponent},
  {path: 'videoSingle/:id', component: VideoSingleComponent},
  {path: ':id', component: VideoSingleComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideoRouting {}
