import { Component, OnInit } from '@angular/core';
import { OffersService } from '../../services/offers.service';
import { Offers } from '../../models/offers.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-offer',
  templateUrl: './single-offer.component.html',
  styleUrls: ['./single-offer.component.css'],
  styles: [],
})
export class SingleOfferComponent implements OnInit {
  // @ts-ignore
  offers: Offers;
  id;

  displayedColumns = ['title', 'description', 'place', 'sellerEMail'];
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private offerService: OffersService
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    console.log(id);
    this.getOffersById(id);
  }

  getOffersById(id: string): void {
    // tslint:disable-next-line:radix
    this.offerService.getById(parseInt(id)).subscribe((offers: Offers) => {
      this.offers = offers;
    });
  }

  onBack(): void {
    this.router.navigate(['offers']);
  }
}
