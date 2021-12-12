import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {InsertOfferModel} from './insertOffer.model';
import {ImageVideoModel} from './imageVideo.model';

@Injectable({
  providedIn: 'root'
})

export class ImageVideoService {

  constructor(private http: HttpClient) {
  }

  formData: ImageVideoModel = new ImageVideoModel();
  readonly baseURL = '';

  // tslint:disable-next-line:typedef
  postImageVideo() {
    return this.http.post(this.baseURL, this.formData);
  }

  // tslint:disable-next-line:typedef
  getAllOffer() {
    // @ts-ignore
    return this.http.get(this.baseURL, '');
  }
}



