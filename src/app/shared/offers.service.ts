import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Offers } from './offers.model';
import * as auth from '../auth-config.json';

@Injectable({
  providedIn: 'root',
})
export class OffersService {
  url = auth.resources.todoListApi.resourceUri;
  constructor(private http: HttpClient) {}

  getByPrice() {
    return this.http.get<Offers[]>(this.url + '/offers');
  }

  getOffersById(id: number) {
    return this.http.get<Offers[]>(this.url + '/offers/' + id);
  }
}
