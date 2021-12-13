import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import {Category} from '../../models/category';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  categories: Category[] = [];

  categoryToAdd:Category = {id:"",name:"", parentId:""};

  idCategoryToModify:string = "";

  nameCategoryToModify:string = "";

  constructor(private service: CategoryService, private _router: Router, private route: ActivatedRoute) { 
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(param =>{
      this.idCategoryToModify= param.id;
    });
    this.getAllCategories();
  }

  getAllCategories(): void {
    this.service.getAllCategories()
      .subscribe((categories: Category[]) => {
        this.categories = categories;
      });
  }

  onSubmit(){
    if(this.idCategoryToModify!=""){
      this.categoryToAdd.id=this.idCategoryToModify;
      this.service.updateCategory(this.categoryToAdd).subscribe(result => this._router.navigateByUrl('/categories'));
    }else{
      this.service.addCategory(this.categoryToAdd)
      .subscribe(result => this._router.navigateByUrl('/categories'));
    }
  }
}
