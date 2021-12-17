import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  categories: Category[] = [];

  displayedColumns = ['id', 'name'];

  constructor(
    private service: CategoryService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllCategories();
  }

  getCategory(id: string): void {
    // tslint:disable-next-line:radix
    this.service.getCategoryById(parseInt(id)).subscribe(
      (categories: Category[]) => {
        this.categories = categories;
      },
      (err) => {
        this.toastr.error(err.error);
      }
    );
  }

  getAllCategories(): void {
    this.service.getAllCategories().subscribe(
      (categories: Category[]) => {
        this.categories = categories;
      },
      (err) => {
        this.toastr.error(err.error);
      }
    );
  }

  goToChilds(id: string): void {
    // tslint:disable-next-line:radix
    this.service.getChildsCategory(parseInt(id)).subscribe(
      (categories: Category[]) => {
        this.categories = categories;
      },
      (err) => {
        this.toastr.error(err.error);
      }
    );
  }
}
