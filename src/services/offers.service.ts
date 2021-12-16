import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Offers } from '../models/offers.model';
import { Category } from '../models/category';
import * as auth from '../app/auth-config.json';

@Injectable({
  providedIn: 'root',
})
export class OffersService {
  url = auth.resources.todoListApi.resourceUri;
  constructor(private http: HttpClient) {}

  // tslint:disable-next-line:typedef
  getByPrice() {
    return this.http.get<Offers[]>(this.url + '/offers');
  }
  // tslint:disable-next-line:typedef
  getById(id: number) {
    return this.http.get<Offers>(this.url + '/offers/' + id);
  }
  // tslint:disable-next-line:typedef
  getCategoryById(id: number) {
    return this.http.get<Category[]>(this.url + '/categories/' + id);
  }
  // tslint:disable-next-line:typedef
  getAllCategories() {
    return this.http.get<Category[]>(this.url + '/categories');
  }
  // tslint:disable-next-line:typedef
  getChildsCategory(id: number) {
    return this.http.get<Category[]>(this.url + '/categories/childs/' + id);
  }
  // tslint:disable-next-line:typedef
  getAllSignale(){
      return this.http.get<Offers[]>(this.url + '/offers/report');
  }
  // tslint:disable-next-line:typedef
  resetSignalements(id: number){
    return this.http.put<Offers>(this.url + '/offers/report/' + id, {});
  }
  // tslint:disable-next-line:typedef
  deleteOffer(id: number){
    return this.http.delete<Offers>(this.url + '/offers/' + id);
  }
  // tslint:disable-next-line:typedef
  signalerOffer(id: number){
    return this.http.post<Offers>(this.url + '/offers/report/' + id, id);
  }
  // tslint:disable-next-line:typedef
  getOfferByCategory(id: number) {
    return this.http.get<Offers[]>(this.url + '/offers/category/' + id);
  }
  // tslint:disable-next-line:typedef
  getByPriceFilter(minPrice: number, maxPrice: number) {
    if (!isNaN(minPrice) && !isNaN(maxPrice)) {
      return this.http.get<Offers[]>(
        this.url + '/offers?minPrice=' + minPrice + '&maxPrice=' + maxPrice
      );
    }

    if (!isNaN(minPrice)) {
      return this.http.get<Offers[]>(this.url + '/offers?minPrice=' + minPrice);
    }

    if (!isNaN(maxPrice)) {
      return this.http.get<Offers[]>(this.url + '/offers?maxPrice=' + maxPrice);
    }

    return this.getByPrice();
  }
  // tslint:disable-next-line:typedef
  getByPlace(place: number) {
    return this.http.get<Offers[]>(this.url + '/offers/campus/' + place);
  }
}
