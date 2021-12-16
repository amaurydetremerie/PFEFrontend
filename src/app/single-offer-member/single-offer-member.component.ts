import {Component, OnInit} from '@angular/core';
import {OffersService} from '../../services/offers.service';
import {Offers} from '../../models/offers.model';
import {Router, ActivatedRoute} from '@angular/router';
import * as auth from '../auth-config.json';
import {Medias} from '../../models/medias.models';
import {MediaService} from '../../services/medias.service';
import { NgbCarouselConfig  } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-single-offer-member',
  templateUrl: './single-offer-member.component.html',
  styleUrls: ['./single-offer-member.component.css'],
  styles: [],
})

export class SingleOfferMemberComponent implements OnInit {
  // @ts-ignore
  offers: Offers;
  isAdmin = false;
  id;
  medias: Medias[] = [];
  url = auth.resources.todoListApi.resourceUri + '/';

  displayedColumns = ['title', 'description', 'place', 'sellerEMail'];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private offerService: OffersService,
    private mediaService: MediaService,
    config: NgbCarouselConfig
  ) {
    config.interval = 5000;
    config.keyboard = true;
    config.pauseOnHover = true;
    config.showNavigationArrows = false;
    config.showNavigationIndicators = false;
    config.pauseOnFocus = true;
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params.id;
    this.getOffersById(this.id);
    this.getMediaByOffer(this.id);
    this.isAdmin = localStorage.getItem('isAdmin') === 'true';
  }

  getOffersById(id: string): void {
    // tslint:disable-next-line:radix
    this.offerService.getById(parseInt(id)).subscribe((offers: Offers) => {
      this.offers = offers;
    });
  }

  getMediaByOffer(id: string): void {
    // tslint:disable-next-line:radix
    this.mediaService.getByOffer(parseInt(id)).subscribe((medias: Medias[]) => {
      this.medias = medias;
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
