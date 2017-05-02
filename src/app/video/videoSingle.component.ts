import { Component, OnInit} from '@angular/core';
import { AuthService} from '../auth/auth.service';
import { VideoService} from './video.service';
//import {RegionComponent} from '../region/region.component';

import { ChangeDetectionStrategy, Input} from "@angular/core";
import { ToastsManager} from 'ng2-toastr';
import { Inject, forwardRef} from '@angular/core';
import { MdDialog, MdDialogRef} from '@angular/material';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { Video } from './video.model'
import { EditOptionsComponentDialog } from '../modalLibrary/modalLibrary.component'
import { FormBuilder, FormGroup, FormArray, FormControl, Validators} from '@angular/forms';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser'
import { VideoDeleteDialog } from './videoDeleteDialog.component'
import { VideoWhereDialogComponent } from './videoWhereDialog.component'



@Component({
  selector: 'app-videos',
  templateUrl: './videoSingle.component.html',
  styleUrls: ['./video.component.css'],

})

export class VideoSingleComponent implements OnInit {


  fetchedVideo : Video = {
    _id: '',
    title: '',
    embed:'',
    embedSecure: this.sanitizer.bypassSecurityTrustResourceUrl(''),
    categories: [],
    owner: []
  }
  categoriesHard2 = [
    {
      name:'whatsnew',
      selected : false
    },
    {
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

  categoriesHard1 = [{
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

  inputCategorie = ''



  public myForm: FormGroup;

  constructor(
    private sanitizer: DomSanitizer,
    private videoService: VideoService,
    private toastr: ToastsManager,
    public dialog: MdDialog,
    private router: Router,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private _fb: FormBuilder,
  ) {
  }




  getObjects(myForm){
     return myForm.get('categories').controls
   }

  ngOnInit() {
    this.myForm = this._fb.group({
      _id: [''],
      title: [''],
      embed: ['', [Validators.required, Validators.minLength(5)]],
      categories: this._fb.array([])
    });

    this.activatedRoute.params.subscribe((params: Params) => {
      if(params['id'])
       this.getVideo(params['id'])
    })
  }


  removeCategorie(i: number) {
      this.fetchedVideo.categories.splice(i, 1)
      const control = <FormArray>this.myForm.controls['categories'];
      control.removeAt(i);
      let _2this = this
    //  setTimeout(function(){
          _2this.refreshHardCategories()
    //  }, 10);


      //this.updatecategoriesHard2()
  }
  addCategorie() {
    const control = <FormArray>this.myForm.controls['categories'];
    const addrCtrl = this._fb.group({
        name: [''],
        type:['']
    });
    control.push(addrCtrl);
  }
  addCategorieInput() {
    this.togglCategorieButton(this.inputCategorie, 'tag')
    this.inputCategorie=''
  }
  togglCategorieButton(nameCateg, type) {
    var indexFound
    this.fetchedVideo.categories.forEach((categorie, index) => {
      if(categorie.name == nameCateg)
        indexFound = index
    })

    if(indexFound || indexFound== 0 ) {
      let _2this = this
      setTimeout(function(){
          _2this.removeCategorie(+indexFound)
      }, 10);

    } else {
      this.fetchedVideo.categories.push({name:nameCateg, type:type})
      this.addCategorie()
    }
  }


  goBack() {
    this.location.back();
  }
  openDialogWhereVideo(){
    let dialogRefDelete = this.dialog.open(VideoWhereDialogComponent)
    dialogRefDelete.afterClosed().subscribe(result => {
      // if(result) {
      //   this.onDelete(this.fetchedVideo._id)
      //   this.router.navigate(['video']);
      // }
    })
  }
  openDialog(positionImage) {
    let dialogRef = this.dialog.open(EditOptionsComponentDialog)
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.fetchedVideo[positionImage] = result
      }
    })
  }
  openDialogDelete(){
    let dialogRefDelete = this.dialog.open(VideoDeleteDialog)
    dialogRefDelete.afterClosed().subscribe(result => {
      if(result) {
        this.onDelete(this.fetchedVideo._id)
        this.router.navigate(['video']);
      }
    })
  }

  save(video : Video) {
    if(video._id) {
      this.videoService.updateVideo(video)
        .subscribe(
          res => {
            this.toastr.success('Great!', res.message)
            this.router.navigate(['video']);
          },
          error => {console.log(error)}
        );
    } else {
      this.videoService.saveVideo(video)
        .subscribe(
          res => {
            this.toastr.success('Great!', res.message)
            this.router.navigate(['video']);
          },
          error => {console.log(error)}
        );
    }
  }


  refreshHardCategories(){
    this.categoriesHard2.forEach((HardCategorie, indexHard) => {
      this.categoriesHard2[indexHard].selected = false
    })

    this.categoriesHard2.forEach((HardCategorie, indexHard) => {
      this.fetchedVideo.categories.forEach((fetchedCategorie, indexFetched) => {
        if(HardCategorie.name == fetchedCategorie.name) {
          this.categoriesHard2[indexHard].selected = true
        }
      })
    })

    this.categoriesHard1.forEach((HardCategorie, indexHard) => {
      this.categoriesHard1[indexHard].selected = false
    })

    this.categoriesHard1.forEach((HardCategorie, indexHard) => {
      this.fetchedVideo.categories.forEach((fetchedCategorie, indexFetched) => {
        if(HardCategorie.name == fetchedCategorie.name) {
          this.categoriesHard1[indexHard].selected = true
        }
      })
    })
  }




  getVideo(id : string) {
    this.videoService.getVideo(id)
      .subscribe(
        res => {
          this.fetchedVideo = <Video>res
          this.fetchedVideo.embedSecure = this.sanitizer.bypassSecurityTrustResourceUrl('//fast.wistia.net/embed/iframe/' + res.embed)
          this.fetchedVideo.categories.forEach((categorie) => {
            this.addCategorie()
          })
          this.refreshHardCategories()
        },
        error => {
          console.log(error);
        }
      )
  }

  onDelete(id: string) {
    this.videoService.deleteVideo(id)
      .subscribe(
        res => {
          this.toastr.success('Great!', res.message);
        },
        error => {
          console.log(error);
        }
      )
  }
}
