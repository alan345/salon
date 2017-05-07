import {Component, OnInit, Input} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {AdminService} from '../../admin/services/admin.service';
import {ProfileService} from '../../user/profile/profile.service';
import {Router} from '@angular/router';
import {CompanieService} from '../../companie/companie.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  @Input() sidenav


  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}


  ngOnInit() {}

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }


}
