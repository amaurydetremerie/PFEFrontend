import { Component, OnInit } from '@angular/core';
import { OffersService } from '../shared/offers.service';
import { Offers } from '../shared/offers.model';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';
import { Router } from '@angular/router';
import { off } from 'process';

@Component({
  selector: 'app-annonce-signale',
  templateUrl: './annonce-signale.component.html',
  styleUrls: ['./annonce-signale.component.css']
})

export class AnnonceSignaleComponent implements OnInit {
  offers: Offers[] = [];
  categories: Category[] = [];
  isAdmin:boolean = false;
  displayedColumns = ['title', 'description', 'place', 'sellerEMail'];

  constructor(private service: OffersService, private _router: Router) {}

  ngOnInit(): void {
    this.isAdmin=localStorage.getItem("isAdmin")==="true";
    this.getSignaledOffers();
  }

  getSignaledOffers(): void {
    console.log("je suis ici")
    this.service.getAllSignale().subscribe((offers: Offers[]) => {
      this.offers = offers;
    });
    console.log(this.offers)
  }

  resetSignalements(id:string){
    let idToGet = parseInt(id);
    this.service.resetSignalements(idToGet).subscribe(result=>window.location.reload());
  }

  deleteOffer(id:string): void {
    let idToGet = parseInt(id);
    this.service.deleteOffer(idToGet).subscribe(result=>window.location.reload());
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

  goToChilds(id: string): void {
    let parentId = parseInt(id);
    this.service
      .getChildsCategory(parentId)
      .subscribe((categories: Category[]) => {
        this.categories = categories;
      });
  }
}
