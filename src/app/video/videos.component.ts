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
  token: string = localStorage.getItem('id_token');
  fetchedVideos : Array<VideosComponent> = [];
  search = {
    categories : []
  }
  loading: boolean
  inputSearch:''

  paginationData = {
    currentPage: 1,
    itemsPerPage: 0,
    totalItems: 0
  };

  // categories1 = {
  //   'phyto' : true,
  //   'phytoSpecific' : false,
  //   'subtil' : true
  // }
  categories1 = [{
      name:'phyto',
      selected : false
    },
    {
      name:'phytoSpecific',
      selected : false
    },
    {
      name:'subtil',
      selected : false
    }]

  categories2 = ''


  // categoriesHard = [{
  //     name:'treatments',
  //     selected : false
  //   },
  //   {
  //     name:'knowledges',
  //     selected : false
  //   },
  //   {
  //     name:'testimonials',
  //     selected : false
  //   },
  //   {
  //     name:'merchandising',
  //     selected : false
  //   },
  //   {
  //     name:'promotions',
  //     selected : false
  //   }
  // ]

  constructor(
    private sanitizer: DomSanitizer,
    private videoService: VideoService,
    private toastr: ToastsManager,
    public dialog: MdDialog,
    private router: Router,
    private location: Location,
  ) {
  }


  goBack() {
    this.location.back();
  }

  onSelectChange = ($event: any): void => {
//    console.log($event)
    this.categories2 = $event.tab.textLabel
    this.updateCategerories()
    // this.search.categories = []
    // this.search.categories.push({name:$event.tab.textLabel})
    // this.getVideos(this.paginationData.currentPage, this.search)

  }

  updateCategerories(){
    this.search.categories = []
    this.search.categories.push({name:this.categories2})
    if(this.inputSearch)
      this.search.categories.push({name:this.inputSearch})
    this.categories1.forEach((categorie1)=>{
      if(categorie1.selected == true) {
        this.search.categories.push({name : categorie1.name})
      }
    })
//    console.log(this.search.categories)
    this.getVideos(this.paginationData.currentPage, this.search)
  }

  changeCateg1(nameCateg){
    //this.categories1[nameCateg] = !this.categories1[nameCateg]
    this.categories1.forEach((categ, index)=>{
      if(categ.name === nameCateg) {
        this.categories1[index].selected = !this.categories1[index].selected
      }
    })
    this.updateCategerories()
  }

  addSearchInput(){
    //console.log(this.inputSearch)

//    console.log(this.search.categories)
    this.updateCategerories()
    // this.search.categories.pop()
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
//          console.log(fetchedVideosNotSecure)
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
    this.categories2 = 'whatsnew'
    this.updateCategerories()
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
