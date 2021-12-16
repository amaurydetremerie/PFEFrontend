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
  isAdmin:boolean = false;
  id;

  displayedColumns = ['title', 'description', 'place', 'sellerEMail'];
  constructor(
    private _Activatedroute: ActivatedRoute,
    private _router: Router,
    private _offerService: OffersService
  ) {}

  ngOnInit(): void {
    this.id = this._Activatedroute.snapshot.params['id'];
    this.getOffersById(this.id);
    this.isAdmin=localStorage.getItem("isAdmin")==="true";
  }

  getOffersById(id: string): void {
    let idToGet = parseInt(id);
    this._offerService.getById(idToGet).subscribe((offers: Offers) => {
      this.offers = offers;
    });
  }

  
  resetSignalements(){
    this._offerService.resetSignalements(this.id).subscribe(result=>this._router.navigateByUrl("/admin/signalements"));
  }

  deleteOffer(): void {
    this._offerService.deleteOffer(this.id).subscribe(result=>this._router.navigateByUrl("/admin/signalements"));
  }

  signalerOffer(){
    this._offerService.signalerOffer(this.id).subscribe(result=>alert("Annonce signale"));
  }

  onBack(): void {
    this._router.navigate(['offers']);
  }
}
