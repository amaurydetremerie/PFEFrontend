import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Offers } from './offers.model';
import { Category } from './category.model';
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

  getById(id: number) {
    return this.http.get<Offers>(this.url + '/offers/' + id);
  }

  getCategoryById(id: number) {
    return this.http.get<Category[]>(this.url + '/categories/' + id);
  }

  getAllCategories() {
    return this.http.get<Category[]>(this.url + '/categories');
  }

  getChildsCategory(id: number) {
    return this.http.get<Category[]>(this.url + '/categories/childs/' + id);
  }

  getAllSignale(){
      return this.http.get<Offers[]>(this.url + '/offers/report');
  }
  
  resetSignalements(id:number){
    return this.http.put<Offers>(this.url + '/offers/report/'+ id,{});
  }
  
  deleteOffer(id:number){
    return this.http.delete<Offers>(this.url + '/offers/' + id)
  }

  signalerOffer(id:number){
    return this.http.post<Offers>(this.url + '/offers/report/'+ id, id)
  }
}
