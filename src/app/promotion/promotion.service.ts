import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Response, Headers, Http} from '@angular/http';
import {ErrorService} from '../errorHandler/error.service';
import {Promotion} from './promotion.model';
import {ToastsManager} from 'ng2-toastr';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class PromotionService {

  private url: string = '/';
  private token: string = localStorage.getItem('id_token');
  private promotionId: string = localStorage.getItem('promotionId');
  private promotions = [];
  private singlePromotion = Object;

  constructor(private http: Http, private errorService: ErrorService, private toastr: ToastsManager) {}

  // get promotion forms from backend in order to display them in the front end
  getPromotions(page: number) {

    let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.token);
    return this.http.get(this.url + 'promotion/page/' + page , {headers: headers})
      .timeout(9000)
      .map((response: Response) => {

        const promotions = response.json();

        return promotions;
      })
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

  getPromotion(id: string) {
    let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.token);
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
  deletePromotion(id: string) {
    let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.token);
    return this.http.delete(this.url + 'promotion/' + id, {headers: headers})
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

  savePromotion(promotion) {
  //  console.log("this.token",this.token);
  //  delete promotion._id;
  //console.log(promotion)
    const body = JSON.stringify(promotion.fetchedPromotion);
    const headers = new Headers({'Content-Type': 'application/json'});
  //  let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.token);
    return this.http.post(this.url + 'profile/',body, {headers: headers})
      .map(response => response.json())
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

  updatePromotion(promotion) {
    const body = JSON.stringify(promotion);
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.token);
    return this.http.put(this.url + 'profile/' + promotion._id, body, {headers: headers})
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
