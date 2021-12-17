import { Component, OnInit } from '@angular/core';
import { OffersService } from '../../services/offers.service';
import { Offers } from '../../models/offers.model';
import { Router, ActivatedRoute } from '@angular/router';
import * as auth from '../auth-config.json';
import { Medias } from '../../models/medias.models';
import { MediaService } from '../../services/medias.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

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
  medias: Medias[] = [];
  url = auth.resources.todoListApi.resourceUri + '/';

  displayedColumns = ['title', 'description', 'place', 'sellerEMail'];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private offerService: OffersService,
    private mediaService: MediaService,
    private toastr: ToastrService,
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
    this.offerService.getById(parseInt(id)).subscribe(
      (offers: Offers) => {
        this.offers = offers;
      },
      (err) => {
        this.toastr.error(err.error);
      }
    );
  }

  getMediaByOffer(id: string): void {
    // tslint:disable-next-line:radix
    this.mediaService.getByOffer(parseInt(id)).subscribe(
      (medias: Medias[]) => {
        this.medias = medias;
      },
      (err) => {
        this.toastr.error(err.error);
      }
    );
  }

  // tslint:disable-next-line:typedef
  resetSignalements() {
    this.offerService.resetSignalements(this.id).subscribe(
      (result) => this.router.navigateByUrl('/admin/signalements'),
      (err) => {
        this.toastr.error(err.error);
      }
    );
  }

  // tslint:disable-next-line:typedef
  deleteOffer() {
    this.offerService.deleteOffer(this.id).subscribe(
      (result) => this.router.navigateByUrl('/admin/signalements'),
      (err) => {
        this.toastr.error(err.error);
      }
    );
  }

  // tslint:disable-next-line:typedef
  signalerOffer() {
    this.offerService.signalerOffer(this.id).subscribe(
      (result) => this.toastr.success('Annonce signale'),
      (err) => {
        this.toastr.error(err.error);
      }
    );
  }

  onBack(): void {
    this.router.navigate(['offers']);
  }
}
