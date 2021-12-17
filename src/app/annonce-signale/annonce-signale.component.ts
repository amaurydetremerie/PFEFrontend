import { Component, OnInit } from '@angular/core';
import { OffersService } from '../../services/offers.service';
import { Offers } from '../../models/offers.model';
import { Category } from '../../models/category';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-annonce-signale',
  templateUrl: './annonce-signale.component.html',
  styleUrls: ['./annonce-signale.component.css'],
})
export class AnnonceSignaleComponent implements OnInit {
  offers: Offers[] = [];
  categories: Category[] = [];
  isAdmin = false;
  displayedColumns = ['title', 'description', 'place', 'sellerEMail'];

  constructor(
    private service: OffersService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.isAdmin = localStorage.getItem('isAdmin') === 'true';
    this.getSignaledOffers();
  }

  getSignaledOffers(): void {
    console.log('je suis ici');
    this.service.getAllSignale().subscribe(
      (offers: Offers[]) => {
        this.offers = offers;
      },
      (err) => {
        this.toastr.error(err.error);
      }
    );
    console.log(this.offers);
  }

  // tslint:disable-next-line:typedef
  resetSignalements(id: string) {
    // tslint:disable-next-line:radix
    this.service.resetSignalements(parseInt(id)).subscribe(
      (result) => window.location.reload(),
      (err) => {
        this.toastr.error(err.error);
      }
    );
  }

  deleteOffer(id: string): void {
    // tslint:disable-next-line:radix
    this.service.deleteOffer(parseInt(id)).subscribe(
      (result) => window.location.reload(),
      (err) => {
        this.toastr.error(err.error);
      }
    );
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
