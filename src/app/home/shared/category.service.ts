import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CategoryModel} from './category.model';
import * as auth from 'src/app/auth-config.json';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  url = auth.resources.todoListApi.resourceUri;

  constructor(private http: HttpClient) {
  }

  // tslint:disable-next-line:typedef
  getCategoryById(id: number) {
    return this.http.get<CategoryModel[]>(this.url + '/categories/' + id);
  }

  // tslint:disable-next-line:typedef
  getAllCategories() {
    return this.http.get<CategoryModel[]>(this.url + '/categories');
  }


  // tslint:disable-next-line:typedef
  getChildsCategory(id: number) {
    return this.http.get<CategoryModel[]>(this.url + '/categories/childs/' + id);
  }



}
