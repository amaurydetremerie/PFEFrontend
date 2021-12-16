import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as auth from '../app/auth-config.json';
import {Medias} from '../models/medias.models';

@Injectable({
  providedIn: 'root',
})
export class MediaService {
  url = auth.resources.todoListApi.resourceUri;

  constructor(private http: HttpClient) {}

  // tslint:disable-next-line:typedef
  getByOffer(id: number) {
    return this.http.get<Medias[]>(this.url + '/medias/offer/' + id);
  }
}
