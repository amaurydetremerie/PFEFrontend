import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import {Category} from '../../models/category';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  categories: Category[] = [];

  categoryToAdd: Category = {id: '', name: '', parentId: ''};

  idCategoryToModify = '';

  nameCategoryToModify = '';

  constructor(private service: CategoryService, private router: Router, private route: ActivatedRoute, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(param => {
      this.idCategoryToModify = param.id;
    });
    this.getAllCategories();
  }

  getAllCategories(): void {
    this.service.getAllCategories()
      .subscribe((categories: Category[]) => {
        this.categories = categories;
      },
        err => {
          this.toastr.error(err);
        });
  }

  // tslint:disable-next-line:typedef
  onSubmit(){
    // tslint:disable-next-line:triple-equals
    if(this.idCategoryToModify != '' && this.idCategoryToModify != undefined){
      this.categoryToAdd.id = this.idCategoryToModify;
      this.service.updateCategory(this.categoryToAdd).subscribe(result => this.router.navigateByUrl('/admin/categories'));
      console.log(this.idCategoryToModify);
    }else{
      this.service.addCategory(this.categoryToAdd)
      .subscribe(result => this.router.navigateByUrl('/admin/categories'));
    }
  }
}
