import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Response, Headers, Http} from '@angular/http';
import {ErrorService} from '../errorHandler/error.service';
import {Press} from './press.model';
import {ToastsManager} from 'ng2-toastr';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class PressService {

  private url: string = '/';
  private token: string = localStorage.getItem('id_token');
  private pressId: string = localStorage.getItem('pressId');
  private presses = [];
  private singlePress = Object;

  constructor(private http: Http, private errorService: ErrorService, private toastr: ToastsManager) {}

  // get press forms from backend in order to display them in the front end
  getPresses(page: number) {

    let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.token);
    return this.http.get(this.url + 'press/page/' + page , {headers: headers})
      .timeout(9000)
      .map((response: Response) => {

        const presses = response.json();

        return presses;
      })
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

  //getPress(id: string) : Observable<Press> {
  getPress(id: string) {
    let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.token);
    return this.http.get(this.url + 'press/' + id, {headers: headers})
      .map((response: Response) => {
        console.log(response.json().item)
        return response.json().item;
      //  this.singleForm = response.json();
        //return this.singleForm;
      })
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }




  deletePress(id: string) {
    let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.token);
    return this.http.delete(this.url + 'press/' + id, {headers: headers})
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

  savePress(press) {
  //  console.log("this.token",this.token);
  //  delete press._id;
  delete press._id
  console.log(press)
    const body = JSON.stringify(press);
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.token);
    return this.http.post(this.url + 'press/',body, {headers: headers})
      .map(response => response.json())
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

  updatePress(press) {
    const body = JSON.stringify(press);
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.token);
    return this.http.put(this.url + 'press/' + press._id, body, {headers: headers})
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
