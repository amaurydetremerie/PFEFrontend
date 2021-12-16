import {Component, OnInit} from '@angular/core';
import {OffersService} from '../../services/offers.service';
import {Offers} from '../../models/offers.model';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-single-offer',
  templateUrl: './single-offer.component.html',
  styleUrls: ['./single-offer.component.css'],
  styles: [],
})

export class SingleOfferComponent implements OnInit {
  // @ts-ignore
  offers: Offers;
  isAdmin = false;
  id;

  displayedColumns = ['title', 'description', 'place', 'sellerEMail'];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private offerService: OffersService
  ) {
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params.id;
    this.getOffersById(this.id);
    this.isAdmin = localStorage.getItem('isAdmin') === 'true';
  }

  getOffersById(id: string): void {
    // tslint:disable-next-line:radix
    this.offerService.getById(parseInt(id)).subscribe((offers: Offers) => {
      this.offers = offers;
    });
  }

  // tslint:disable-next-line:typedef
  resetSignalements() {
    this.offerService.resetSignalements(this.id).subscribe(result => this.router.navigateByUrl('/admin/signalements'));
  }

  // tslint:disable-next-line:typedef
  deleteOffer() {
    this.offerService.deleteOffer(this.id).subscribe(result => this.router.navigateByUrl('/admin/signalements'));
  }

  // tslint:disable-next-line:typedef
  signalerOffer() {
    this.offerService.signalerOffer(this.id).subscribe(result => alert('Annonce signale'));
  }

  onBack(): void {
    this.router.navigate(['offers']);
  }

}
