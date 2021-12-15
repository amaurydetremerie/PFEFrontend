import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import {Category} from '../../models/category';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

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

  goToChilds(id:string): void {
    let parentId = parseInt(id);
    this.service.getChildsCategory(parentId)
      .subscribe((categories: Category[]) => {
        this.categories = categories;
      });
  }
}
