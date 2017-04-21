import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Response, Headers, Http, RequestOptions} from '@angular/http';
import {ErrorService} from '../errorHandler/error.service';
import {Video} from './video.model';
import {ToastsManager} from 'ng2-toastr';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class VideoService {

  private url: string = '/';
//  private token: string = localStorage.getItem('id_token');
//  private videoId: string = localStorage.getItem('videoId');
  private videos = [];
  private singleVideo = Object;

  constructor(
    private http: Http,
    private errorService: ErrorService,
    private toastr: ToastsManager,
    private authService: AuthService) {}


  // get video forms from backend in order to display them in the front end
  getVideos(page: number, search) {
    let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.token);
    let options = new RequestOptions({ headers: headers, search: search});
//    console.log(options)
    return this.http.get(this.url + 'video/page/' + page , options)
      .timeout(9000)
      .map((response: Response) => {

        const videos = response.json();

        return videos;
      })
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

  //getVideo(id: string) : Observable<Video> {
  getVideo(id: string) {
    let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.token);
    return this.http.get(this.url + 'video/' + id, {headers: headers})
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




  deleteVideo(id: string) {
    let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.token);
    return this.http.delete(this.url + 'video/' + id, {headers: headers})
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

  saveVideo(video) {
  //  console.log("this.authService.token",this.authService.token);
  //  delete video._id;
  delete video._id
  console.log(video)
    const body = JSON.stringify(video);
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.token);
    return this.http.post(this.url + 'video/',body, {headers: headers})
      .map(response => response.json())
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

  updateVideo(video) {
    const body = JSON.stringify(video);
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.token);
    return this.http.put(this.url + 'video/' + video._id, body, {headers: headers})
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
  //   headers.append('Authorization', '' + this.authService.token);
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
  //   headers.append('Authorization', '' + this.authService.token);
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
