import { Component, OnInit } from '@angular/core';
import { OffersService } from '../../services/offers.service';
import { Offers } from '../../models/offers.model';
import { Category } from '../../models/category';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private service: OffersService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getOffers();
  }

  getOffers(): void {
    this.service.getByPrice().subscribe(
      (offers: Offers[]) => {
        this.offers = offers;
      },
      (err) => {
        this.toastr.error(err.error);
      }
    );
  }

  // tslint:disable-next-line:typedef
  getOfferByCategory(id: string) {
    // tslint:disable-next-line:radix
    this.service.getOfferByCategory(parseInt(id)).subscribe(
      (offers: Offers[]) => {
        this.offers = offers;
        console.log(this.offers);
      },
      (err) => {
        this.toastr.error(err.error);
      }
    );
  }

  // tslint:disable-next-line:typedef
  getByPriceFilter(minPrice: string, maxPrice: string) {
    this.service
      .getByPriceFilter(parseFloat(minPrice), parseFloat(maxPrice))
      .subscribe(
        (offers: Offers[]) => {
          this.offers = offers;
        },
        (err) => {
          this.toastr.error(err.error);
        }
      );
  }

  // tslint:disable-next-line:typedef
  getByPlace(value: any) {
    this.service.getByPlace(value.place).subscribe(
      (offers: Offers[]) => {
        this.offers = offers;
      },
      (err) => {
        this.toastr.error(err.error);
      }
    );
  }

  getCategory(id: string): void {
    // tslint:disable-next-line:radix
    const idToGet = parseInt(id);
    this.service.getCategoryById(idToGet).subscribe(
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

  // tslint:disable-next-line:typedef
  signalerOffer(id: string) {
    // tslint:disable-next-line:radix
    this.service.signalerOffer(parseInt(id)).subscribe(
      (result) => this.toastr.success('Annonce signale'),
      (err) => {
        this.toastr.error(err.error);
      }
    );
  }

  goToChilds(id: string): void {
    // tslint:disable-next-line:radix
    const parentId = parseInt(id);
    this.service.getChildsCategory(parentId).subscribe(
      (categories: Category[]) => {
        this.categories = categories;
      },
      (err) => {
        this.toastr.error(err.error);
      }
    );
  }
}
