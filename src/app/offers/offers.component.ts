import { Component, OnInit } from '@angular/core';
import { OffersService } from '../shared/offers.service';
import { Offers } from '../shared/offers.model';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';
import { Router } from '@angular/router';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css'],
  styles: [],
})
export class OffersComponent implements OnInit {
  offers: Offers[] = [];
  categories: Category[] = [];

  displayedColumns = ['title', 'description', 'place', 'sellerEMail'];

  constructor(private service: OffersService, private _router: Router) {}

  ngOnInit(): void {
    this.getOffers();
  }

  getOffers(): void {
    this.service.getByPrice().subscribe((offers: Offers[]) => {
      this.offers = offers;
    });
  }

  getCategory(id: string): void {
    let idToGet = parseInt(id);
    this.service
      .getCategoryById(idToGet)
      .subscribe((categories: Category[]) => {
        this.categories = categories;
      });
  }

  getAllCategories(): void {
    this.service.getAllCategories().subscribe((categories: Category[]) => {
      this.categories = categories;
    });
  }

  signalerOffer(id:string){
    let idToGet = parseInt(id);
    this.service.signalerOffer(idToGet).subscribe(result=>alert("Annonce signale"));
  }

  goToChilds(id: string): void {
    let parentId = parseInt(id);
    this.service
      .getChildsCategory(parentId)
      .subscribe((categories: Category[]) => {
        this.categories = categories;
      });
  }
}
