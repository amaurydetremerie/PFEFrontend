import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {InsertOfferModel, Places, States} from './insertOffer.model';

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

  readonly baseURL = 'https://localhost:7252';

  // tslint:disable-next-line:typedef
  postFormOffer(formImage: FormData, formVideo: FormData) {
    this.formData.Title = 'salut';
    this.formData.seller = 'cfvr115ded';
    this.formData.sellerEMail = 'bf45vd';
    console.log(this.formData);
    const form = new FormData();
    // @ts-ignore
    form.append('title', this.formData.Title);
    console.log(form);
    // @ts-ignore
    this.http.post(this.baseURL + '/offers', form/*, formImage, formVideo*/).subscribe(result => console.log(result));
    // @ts-ignore
    // return this.http.post(this.baseURL, this.formData, formImage, formVideo);

  }

  // tslint:disable-next-line:typedef
  getAllOffer() {
    // @ts-ignore
    return this.http.get(this.baseURL, '');
  }
}



