import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {InsertOfferModel} from './insertOffer.model';

@Injectable({
  providedIn: 'root'
})

export class InsertOfferService {

  constructor(private http: HttpClient) {
  }

  formData: InsertOfferModel = new InsertOfferModel();
  readonly baseURL = '';

  // tslint:disable-next-line:typedef
  postFormOffer() {
    return this.http.post(this.baseURL, this.formData);
  }

  // tslint:disable-next-line:typedef
  getAllOffer() {
    // @ts-ignore
    return this.http.get(this.baseURL, '');
  }
}



