import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {UserService} from '../user.service';
//import {RegionComponent} from '../region/region.component';
import {User} from '../user.model';
import {ChangeDetectionStrategy, Input} from "@angular/core";
import {ToastsManager} from 'ng2-toastr';
import {Inject, forwardRef} from '@angular/core';
import {Router, ActivatedRoute, Params } from '@angular/router';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { Location } from '@angular/common';



@Component({
  selector: 'app-users',
  templateUrl: './newUser.component.html',
  styleUrls: ['./user.component.css'],

})
export class NewUserComponent implements OnInit {
  fetchedUser = {
    profile: {
      name : '',
      hair: {
        hairDensity : '',
        hairPorosity : '',
        hairTexture : '',
      }
    }
  };
  myForm: FormGroup;


  constructor(
    private userService: UserService,
    private toastr: ToastsManager,
    private router: Router,
    private location: Location,
  ) {}

  goBack() {
    this.location.back();
  }

  save(model: FormGroup, isValid: boolean) {
    console.log(model)
    this.userService.saveUser(model)
      .subscribe(
        res => {
          this.toastr.success('Great!', res.message)
        },
        error => {console.log(error)}
      );
    }

  onDelete(id: string) {
    this.userService.deleteUser(id)
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





  ngOnInit() {
    //this.fetchedUser.profile.name = 'toto'
  }
}
