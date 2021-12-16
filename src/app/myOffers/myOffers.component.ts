import {Component, OnInit} from '@angular/core';
import {OffersService} from '../../services/offers.service';
import {Offers} from '../../models/offers.model';
import {Category} from '../../models/category';

@Component({
  selector: 'app-offers',
  templateUrl: './myOffers.component.html',
  styleUrls: ['./myOffers.component.css'],
  styles: [],
})
export class MyOffersComponent implements OnInit {
  offers: Offers[] = [];
  categories: Category[] = [];

  displayedColumns = ['title', 'description', 'place', 'sellerEMail'];

  constructor(private service: OffersService) {
  }

  ngOnInit(): void {
    this.getOffers();
  }

  getOffers(): void {
    this.service.getByMy().subscribe((offers: Offers[]) => {
      this.offers = offers;
    });
  }

  // tslint:disable-next-line:typedef
  getOfferByCategory(id: string) {
    // tslint:disable-next-line:radix
    this.service.getOfferByCategory(parseInt(id)).subscribe((offers: Offers[]) => {
      this.offers = offers;
      console.log(this.offers);
    });
  }

  // tslint:disable-next-line:typedef
  getByPriceFilter(minPrice: string, maxPrice: string) {
    this.service.getByPriceFilter(parseFloat(minPrice), parseFloat(maxPrice)).subscribe((offers: Offers[]) => {
      this.offers = offers;
    });
  }

  // tslint:disable-next-line:typedef
  getByPlace(value: any) {
    this.service.getByPlace(value.place).subscribe((offers: Offers[]) => {
      this.offers = offers;
    });
  }

  getCategory(id: string): void {
    // tslint:disable-next-line:radix
    const idToGet = parseInt(id);
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

  // tslint:disable-next-line:typedef
  signalerOffer(id: string) {
    // tslint:disable-next-line:radix
    this.service.signalerOffer(parseInt(id)).subscribe(result => alert('Annonce signale'));
  }

  goToChilds(id: string): void {
    // tslint:disable-next-line:radix
    const parentId = parseInt(id);
    this.service
      .getChildsCategory(parentId)
      .subscribe((categories: Category[]) => {
        this.categories = categories;
      });
  }
}
