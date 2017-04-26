import { Component, OnInit} from '@angular/core';
import { AuthService} from '../auth/auth.service';
import { PressService} from './press.service';
//import {RegionComponent} from '../region/region.component';

import { ChangeDetectionStrategy, Input} from "@angular/core";
import { ToastsManager} from 'ng2-toastr';
import { Inject, forwardRef} from '@angular/core';
import { MdDialog, MdDialogRef} from '@angular/material';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { Press } from './press.model'
import { EditOptionsComponentDialog } from '../modalLibrary/modalLibrary.component'
import { FormBuilder, FormGroup, FormArray, FormControl, Validators} from '@angular/forms';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser'

@Component({
  selector: 'pressDeleteDialog',
  templateUrl: './pressDeleteDialog.component.html',
})
export class PressDeleteDialog {
  constructor(public dialogRefDelete: MdDialogRef<PressDeleteDialog>) {}

  // deletePress(){
  //   console.log("delete")
  // }
}
