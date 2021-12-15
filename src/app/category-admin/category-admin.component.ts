import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import {Category} from '../../models/category';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-admin',
  templateUrl: './category-admin.component.html',
  styleUrls: ['./category-admin.component.css']
})
export class CategoryAdminComponent implements OnInit {

  categories: Category[] = [];

  displayedColumns = ['id', 'name'];

  constructor(private service: CategoryService, private _router: Router) { }

  ngOnInit(): void {
    this.getAllCategories();
  }

  getCategory(id:string): void {
    let idToGet = parseInt(id);
    this.service.getCategoryById(idToGet)
      .subscribe((categories: Category[]) => {
        this.categories = categories;
      });
  }

  getAllCategories(): void {
    this.service.getAllCategories()
      .subscribe((categories: Category[]) => {
        this.categories = categories;
      });
  }

  deleteCategory(id:string): void {
    let idToDelete = parseInt(id);
    this.service.deleteCategory(idToDelete)
      .subscribe(result=>window.location.reload());
      
  }
  goToChilds(id:string): void {
    let parentId = parseInt(id);
    this.service.getChildsCategory(parentId)
      .subscribe((categories: Category[]) => {
        this.categories = categories;
      });
  }

  editCategory(category:Category): void {
    this._router.navigateByUrl('/admin/addCategory' + '?id=' + category.id);
  }

  addCategory(): void {
    this._router.navigateByUrl('/admin/addCategory');
  }
}
