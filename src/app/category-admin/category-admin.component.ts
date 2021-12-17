import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-category-admin',
  templateUrl: './category-admin.component.html',
  styleUrls: ['./category-admin.component.css'],
})
export class CategoryAdminComponent implements OnInit {
  categories: Category[] = [];

  displayedColumns = ['id', 'name'];

  constructor(
    private service: CategoryService,
    private router: Router,
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

  deleteCategory(id: string): void {
    // tslint:disable-next-line:radix
    this.service.deleteCategory(parseInt(id)).subscribe(
      (result) => window.location.reload(),
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

  editCategory(category: Category): void {
    this.router.navigateByUrl('/admin/addCategory' + '?id=' + category.id);
  }

  addCategory(): void {
    this.router.navigateByUrl('/admin/addCategory');
  }
}
