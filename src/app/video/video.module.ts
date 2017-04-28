import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule, RequestOptions, Http} from '@angular/http';


import { MaterialModule } from '@angular/material';
import {Ng2PaginationModule} from 'ng2-pagination';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ProgressBarModule} from 'ng2-progress-bar';
import {RouterModule} from '@angular/router';
import {CommonModule, HashLocationStrategy, LocationStrategy} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastModule, ToastOptions} from 'ng2-toastr';

import {AuthHttp, AuthConfig} from 'angular2-jwt';
import {AuthGuardService} from '../auth/authguard.service';
import {AuthService} from '../auth/auth.service';
import {ErrorService} from '../errorHandler/error.service';


import {  ApplicationRef } from '@angular/core';

let options = <ToastOptions> {
  animate: 'flyRight',
  positionClass: 'toast-top-right',
};



// import { VideoListComponent }    from './video-list.component';
// import { VideoDetailComponent }  from './video-detail.component';
// import { VideoService }          from './video.service';

import {VideoDeleteDialog} from './videoDeleteDialog.component';
import {VideoComponent} from './video.component';
import {VideosComponent} from './videos.component';
import {VideoSingleComponent} from './videoSingle.component';
import {VideoService} from './video.service';



import { VideoRoutingModule }    from './videoRouting.module';
export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp( new AuthConfig({}), http, options);
}

@NgModule({
  imports:      [

    BrowserModule,
    CommonModule,
    HttpModule,
    RouterModule,
    ReactiveFormsModule,

    BrowserAnimationsModule,
    ToastModule.forRoot(options),
    ProgressBarModule,
    FormsModule,
    Ng2PaginationModule,
    NgbModule.forRoot(),
    MaterialModule.forRoot(),

    CommonModule,
     VideoRoutingModule,
     Ng2PaginationModule,
     NgbModule.forRoot(),
     MaterialModule.forRoot(),
  ],
  declarations: [
        VideoDeleteDialog,
        VideoComponent,
        VideosComponent,
        VideoSingleComponent,
      ],
  providers:    [
       VideoService,
       AuthGuardService,
       {provide: LocationStrategy, useClass: HashLocationStrategy},
       AuthService,
       ErrorService,
       //CompanieService,
       //  VideoService,

       //AdminGuardService,

       {
         provide: AuthHttp,
         useFactory: authHttpServiceFactory,
         deps: [ Http, RequestOptions ]
       }



],
entryComponents: [

  VideoDeleteDialog
]
})
export class VideoModule {}
