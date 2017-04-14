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

@Component({
  selector: 'app-videos',
  templateUrl: './videoSingle.component.html',
  styleUrls: ['./video.component.css'],

})

export class VideoSingleComponent implements OnInit {
  //fetchedVideo = new Video()
  //fetchedVideo: Video;
  //fetchedVideo._id='';

  fetchedVideo = {
    _id: '',
    title: '',
    embed: '',
    categories: [{
      name:''
    }],
    owner: {
      _id:''
    }
  }

  public myForm: FormGroup;

  constructor(
    private videoService: VideoService,
    private toastr: ToastsManager,
    public dialog: MdDialog,
    private router: Router,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private _fb: FormBuilder,
  ) {
  }



  ngOnInit() {
    this.myForm = this._fb.group({
      _id: [''],
      title: [''],
      embed: ['', [Validators.required, Validators.minLength(5)]],
      categories: this._fb.array([])
    });

    //this.addAddress();

    this.activatedRoute.params.subscribe((params: Params) => {
      if(params['id'])
       this.getVideo(params['id'])
    })
  }


  removeCategorie(i: number) {
      this.fetchedVideo.categories.splice(i, 1)
      const control = <FormArray>this.myForm.controls['categories'];
      control.removeAt(i);
  }
  addCategorie() {
    const control = <FormArray>this.myForm.controls['categories'];
    const addrCtrl = this._fb.group({
        name: ['']
    });
    control.push(addrCtrl);
  }


  // removeAddress(i: number) {
  //     const control = <FormArray>this.myForm.controls['addresses'];
  //     control.removeAt(i);
  // }
  //
  // addAddress() {
  //   const control = <FormArray>this.myForm.controls['addresses'];
  //   const addrCtrl = this._fb.group({
  //       street: ['', Validators.required],
  //       postcode: ['']
  //   });
  //   control.push(addrCtrl);
  // }

  // removeForm(i: number) {
  //     this.fetchedVideo.forms.splice(i, 1)
  //     const control = <FormArray>this.myForm.controls['forms'];
  //     control.removeAt(i);
  // }

  // addForm(form: Form) {
  //
  //   const control = <FormArray>this.myForm.controls['forms'];
  //   const addrCtrl = this._fb.group({
  //       _id: ['', Validators.required],
  //   });
  //   control.push(addrCtrl);
  // }


  goBack() {
    this.location.back();
  }

  openDialog(positionImage) {
    let dialogRef = this.dialog.open(EditOptionsComponentDialog)




    //    this.fetchedObj.design.mainPage[positionImage][0] = result


    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.fetchedVideo[positionImage] = result
      }
    })
  }

  save(video) {
    if(video._id) {
      console.log(video)
      this.videoService.updateVideo(video)
        .subscribe(
          res => {
            this.toastr.success('Great!', res.message)
          },
          error => {console.log(error)}
        );
    } else {
      this.videoService.saveVideo(video)
        .subscribe(
          res => {
            this.toastr.success('Great!', res.message)
          },
          error => {console.log(error)}
        );
    }
  }




  getVideo(id) {

    this.videoService.getVideo(id)
      .subscribe(
        res => {
          this.fetchedVideo = res
          this.fetchedVideo.categories.forEach((categorie) => {
            this.addCategorie()
          })
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
      );
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
