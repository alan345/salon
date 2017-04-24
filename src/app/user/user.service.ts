import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Response, Headers, Http, RequestOptions} from '@angular/http';
import {ErrorService} from '../errorHandler/error.service';
import {User} from './user.model';
import {ToastsManager} from 'ng2-toastr';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { AuthService } from '../auth/auth.service';


@Injectable()
export class UserService {

  private url: string = '/';
  //private token: string = localStorage.getItem('id_token');
  //private userId: string = localStorage.getItem('userId');
  private users = [];
  private singleUser = Object;

  constructor(
    private http: Http,
    private errorService: ErrorService,
    private toastr: ToastsManager,
    private authService: AuthService
  ) {}

  // get user forms from backend in order to display them in the front end
  getUsers(page: number, search) {
    let headers = new Headers({'Content-Type': 'application/json'})
    headers.append('Authorization', '' + this.authService.currentUser.token)

    let options = new RequestOptions({ headers: headers, search: search});

    return this.http.get(this.url + 'user/page/' + page , options)
      .timeout(9000)
      .map((response: Response) => {

        const users = response.json();

        return users;
      })
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      })
  }


  // get user forms from backend in order to display them in the front end
  getUsersByEmail(search) {
    let headers = new Headers({'Content-Type': 'application/json'})
    headers.append('Authorization', '' + this.authService.currentUser.token)

    let options = new RequestOptions({ headers: headers, search: search});

    return this.http.get(this.url + 'profile/getUsersByEmail/'  , options)
      .timeout(9000)
      .map((response: Response) => {

        const users = response.json();

        return users;
      })
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      })
  }


  getUser(id: string) {
    let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.currentUser.token);
    return this.http.get(this.url + 'profile/' + id, {headers: headers})
      .map((response: Response) => {
        return response.json();
      //  this.singleForm = response.json();
        //return this.singleForm;
      })
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }
  deleteUser(id: string) {
    let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.currentUser.token);
    return this.http.delete(this.url + 'user/' + id, {headers: headers})
      .map((response: Response) => {
      //  console.log("delete",response)
        return response.json();
      //  this.singleForm = response.json();
        //return this.singleForm;
      })
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

  saveUser(user) {
    user.profile.parentUser=[]
    user.profile.parentUser.push(this.authService.currentUser.userId)
    const body = JSON.stringify(user);
    const headers = new Headers({'Content-Type': 'application/json'});
  //  let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.currentUser.token);
    return this.http.post(this.url + 'profile/',body, {headers: headers})
      .map(response => response.json())
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

  updateUser(user) {
    const body = JSON.stringify(user);
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.currentUser.token);
    return this.http.put(this.url + 'profile/' + user._id, body, {headers: headers})
      .map(response => response.json())
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }


  //
  // deleteForm(form: Form) {
  //   this.forms.splice(this.forms.indexOf(form), 1);
  //   let headers = new Headers({'Content-Type': 'application/json'});
  //   headers.append('Authorization', '' + this.token);
  //   return this.http.delete(this.url + 'forms/' + form, {headers: headers})
  //     .map((response: Response) => {
  //       this.toastr.success('Form deleted successfully!');
  //       response.json();
  //     })
  //     .catch((error: Response) => {
  //       this.errorService.handleError(error.json());
  //       return Observable.throw(error.json());
  //     });
  // }
  //
  // getSingleForm(formId) {
  //   let headers = new Headers({'Content-Type': 'application/json'});
  //   headers.append('Authorization', '' + this.token);
  //   return this.http.get(this.url + 'forms/edit/' + formId, {headers: headers})
  //     .map((response: Response) => {
  //       this.singleForm = response.json();
  //       return this.singleForm;
  //     })
  //     .catch((error: Response) => {
  //       this.errorService.handleError(error.json());
  //       return Observable.throw(error.json());
  //     });
  // }
}
