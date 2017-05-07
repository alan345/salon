import {Component, ViewContainerRef} from '@angular/core';
import {ToastsManager} from 'ng2-toastr';
import {AuthService} from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  constructor(
    private authService: AuthService,
    public toastr: ToastsManager,
    public vRef: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vRef);
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }
}
