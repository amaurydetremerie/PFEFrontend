import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {InsertOfferModel, Places, States, Types} from '../models/insertOffer.model';

// @ts-ignore
@Injectable({
  providedIn: 'root'
})


export class InsertOfferService {

  constructor(private http: HttpClient) {
  }


  formData: InsertOfferModel = new InsertOfferModel();
  // @ts-ignore
  state = States;
  place = Places;
  type = Types;

  readonly baseURL = 'https://localhost:7252';

  // tslint:disable-next-line:typedef
  postFormOffer(formImage: FormData, formVideo: FormData) {
    let form: FormData;
    // @ts-ignore
    form = this.formData;

    formImage.forEach((value, key) => {
      console.log('key %s: value %s', key, value);
    });
    // @ts-ignore
    // tslint:disable-next-line:max-line-length
    // @ts-ignore
    formImage.append('offer', form);
    this.http.post(this.baseURL + '/offers', formImage, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }, }).subscribe(
      result => console.log(result));
    // @ts-ignore
    // return this.http.post(this.baseURL, this.formData, formImage, formVideo);

  }

  // tslint:disable-next-line:typedef
  getAllOffer() {
    // @ts-ignore
    return this.http.get(this.baseURL, '');
  }
}



