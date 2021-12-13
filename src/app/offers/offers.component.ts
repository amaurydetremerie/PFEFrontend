import { Component, OnInit } from '@angular/core';
import { OffersService } from '../shared/offers.service';
import { Offers } from '../shared/offers.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css'],
  styles: [],
})
export class OffersComponent implements OnInit {
  offers: Offers[] = [];

  displayedColumns = [
    'type',
    'state',
    'title',
    'description',
    'place',
    'seller',
    'category',
  ];

  constructor(private service: OffersService, private _router: Router) {}

  ngOnInit(): void {
    this.getOffers();
  }

  getOffers(): void {
    this.service.getByPrice().subscribe((offers: Offers[]) => {
      this.offers = offers;
    });
  }

  getOffersById(id: string): void {
    let idToGet = parseInt(id);
    this.service.getOffersById(idToGet).subscribe((offers: Offers[]) => {
      this.offers = offers;
    });
  }
}
