import {Component, OnInit, Input} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {AdminService} from '../../admin/services/admin.service';
import {ProfileService} from '../../user/profile/profile.service';
import {Router} from '@angular/router';
import {CompanieService} from '../../companie/companie.service';
import {Companie} from '../../companie/companie.model'

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
    _id: ''
  };
  companies=[]
  userBelongToHQ : boolean = false

  HQCompanie: Companie = {
    _id:'',
    forms:[],
    name:'',
    typeCompanie:'',
    phoneNumber:'',
    address: {
      address : '',
      city :  '',
      state :  '',
      zip :  ''
    },
    _users:[]
  }

  search = {
    orderBy : 'name',
    search:'',
    typeCompanie:'HQ',
  }
  constructor(
      private authService: AuthService,
      private adminService: AdminService,
      private profileService: ProfileService,
      private router: Router,
      private companieService:CompanieService) {
  }

  ngOnInit() {
    //console.log('alan')
    this.refresh()
  }

  refresh() {
    //console.log(this.authService.isLoggedIn())
    if (this.authService.isLoggedIn()) {
      // let userId = this.authService.currentUser.userId
      // this.companieService.getCompanieByUserId(userId)
      this.companieService.getCompanieForCurrentUser()
      .subscribe(
        (data => {
          this.companies = data
          this.companies.forEach(companie => {
            if(companie.typeCompanie === 'HQ')
              this.userBelongToHQ = true
          })
        })
      )
      this.profileService.getUserDetails(userId)
      .subscribe(
        (data => {
          this.fetchedUser = data.user
        })
        )


      this.companieService.getCompanies(1, this.search)
        .subscribe(
          res => {
          //  console.log("companies");
            //console.log(res);
            if(res.data.length)
              this.HQCompanie =  res.data[0]

          },
          error => {
            console.log(error);
          }
        );


    }
  }
  isHQcompanie(companie: Companie){
    if(companie.typeCompanie === 'HQ')
      return true
    return false
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
    return this.authService.isAdmin();
  }
  isSalesRep() {
    return this.authService.isSalesRep();
  }
}
