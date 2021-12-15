import { Component, OnInit } from '@angular/core';
import { OffersService } from '../shared/offers.service';
import { Offers } from '../shared/offers.model';
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
    private _Activatedroute: ActivatedRoute,
    private _router: Router,
    private _offerService: OffersService
  ) {}

  ngOnInit(): void {
    const id = this._Activatedroute.snapshot.params['id'];
    console.log(id);
    this.getOffersById(id);
  }

  getOffersById(id: string): void {
    let idToGet = parseInt(id);
    this._offerService.getById(idToGet).subscribe((offers: Offers) => {
      this.offers = offers;
    });
  }

  onBack(): void {
    this._router.navigate(['offers']);
  }
}
