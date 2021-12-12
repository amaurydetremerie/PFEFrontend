import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category';
import * as auth from '../app/auth-config.json';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  url = auth.resources.todoListApi.resourceUri;

  constructor(private http: HttpClient) { }

  getCategoryById(id: number) {
    return this.http.get<Category[]>(this.url + '/categories/' + id);
  }

  getAllCategories() {
    return this.http.get<Category[]>(this.url + '/categories');
  }

  getChildsCategory(id: number) {
    return this.http.get<Category[]>(this.url + '/categories/childs/' + id);
  }

  addCategory(category: Category) {
    var aEnvoyer;
    if(category.parentId!=""){
      aEnvoyer = {
        name:category.name,
        parentId:category.parentId
      }
    }else{
      aEnvoyer = {
        name:category.name
      }
    }
    return this.http.post<Category>(this.url + '/categories', aEnvoyer,{
      headers: { 'Content-Type': 'application/json' }});
  }
  
  deleteCategory(id: number) {
    return this.http.delete<Category>(this.url +'/categories/' + id)
  }

  updateCategory(category: Category) {
    var aEnvoyer;
    if(category.parentId!=""){
      aEnvoyer = {
        id:category.id,
        name:category.name,
        parentId:category.parentId
      }
    }else{
      aEnvoyer = {
        id:category.id,
        name:category.name
      }
    }
    return this.http.put<Category>(this.url +'/categories',aEnvoyer,{
      headers: { 'Content-Type': 'application/json' }})
  }

}
