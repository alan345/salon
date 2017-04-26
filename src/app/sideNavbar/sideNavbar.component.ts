import {Component, OnInit, Input} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {AdminService} from '../admin/services/admin.service';
import {ProfileService} from '../user/profile/profile.service';
import {Router} from '@angular/router';
import {CompanieService} from '../companie/companie.service';


@Component({
  selector: 'app-sideNavbar',
  templateUrl: './sideNavbar.component.html',
  styleUrls: ['./sideNavbar.component.css']
})
export class SideNavbarComponent implements OnInit {
  @Input() sidenav

 // private userId: string = localStorage.getItem('userId');
  // private userId: string;
  fetchedUser={
    _id = ''
  };
  companies=[{
    _id:''
  }]

  constructor(
      private authService: AuthService,
      private adminService: AdminService,
      private profileService: ProfileService,
      private router: Router,
      private companieService:CompanieService) {
  }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      let userId = this.authService.currentUser.userId
      this.companieService.getCompanieByUserId(userId)
      .subscribe(
        (data => {
          this.companies = data
        })
      )
      this.profileService.getUserDetails(userId)
      .subscribe(
        (data => {
          this.fetchedUser = data.user
        })
        )
    }
  }


  // check if user is logged in by asking our authentication service, we use this function in html file *ngIf directive
  isLoggedIn() {
    return this.authService.isLoggedIn();
  }


  goTo(path){
    this.sidenav.close()
    this.router.navigate([path]);
  }
  logout() {
    this.sidenav.close()
    this.authService.logout();
    let this2 = this
    setTimeout(function(){
        this2.router.navigate(['/user/login']);
    }, 150);

  }

  isAdmin() {
    return this.adminService.isAdmin();
  }
}
