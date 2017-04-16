import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {VideoService} from './video.service';
//import {RegionComponent} from '../region/region.component';
import {Video} from './video.model';
import {ChangeDetectionStrategy, Input} from "@angular/core";
import {ToastsManager} from 'ng2-toastr';
import {Inject, forwardRef} from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';
import {Router, ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser'




@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./video.component.css'],

})
export class VideosComponent implements OnInit {
  fetchedVideos : Array<VideosComponent> = [];
  search = {
    categories : [{
      name : 'treatmentsALan'
    }]
  }
  loading: boolean;
  paginationData = {
    currentPage: 1,
    itemsPerPage: 0,
    totalItems: 0
  };
  categoriesHard = [{
      name:'treatments',
      selected : false
    },
    {
      name:'knowledges',
      selected : false
    },
    {
      name:'testimonials',
      selected : false
    },
    {
      name:'merchandising',
      selected : false
    },
    {
      name:'promotions',
      selected : false
    }
  ]

  constructor(
    private sanitizer: DomSanitizer,
    private videoService: VideoService,
    private toastr: ToastsManager,
    public dialog: MdDialog,
    private router: Router,
    private location: Location,
  ) {
    this.getVideos(this.paginationData.currentPage, this.search);
  }


  goBack() {
    this.location.back();
  }


  onSelectChange = ($event: any): void => {
    console.log('event => ', $event);
    console.log('index => ', $event.index);
  }


  onDelete(id: string) {
    this.videoService.deleteVideo(id)
      .subscribe(
        res => {
          this.toastr.success('Great!', res.message);
          console.log(res);
        },
        error => {
          console.log(error);
        }
      );
  }

  getPage(page: number) {
    this.getVideos(page, this.search);
  }

  getVideos(page, search) {
    this.videoService.getVideos(page, search)
      .subscribe(
        res => {
          this.paginationData = res.paginationData;
          let fetchedVideosNotSecure =  res.data
          console.log(fetchedVideosNotSecure)
          this.fetchedVideos = fetchedVideosNotSecure.map((video) => {
            var rObj = {};
            rObj[video] = video;
            rObj[video]['embedSecure'] = this.sanitizer.bypassSecurityTrustResourceUrl('//fast.wistia.net/embed/iframe/' + video['embed']);
            return rObj;
          })

          //console.log(this.fetchedVideos[0]['[object Object]'])
        },
        error => {
          console.log(error);
        }
      );
  }


  ngOnInit() {

  }
}


// @Component({
//   selector: 'video-dialog',
//   templateUrl: './videoDialog.component.html',
// })
// export class VideoDialogComponent {
//   constructor(public dialogRef: MdDialogRef<VideoDialogComponent>) {}
//
// }
