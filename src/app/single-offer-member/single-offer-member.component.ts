import {Component, OnInit} from '@angular/core';
import {OffersService} from '../../services/offers.service';
import {Router, ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Types} from '../../models/types.model';
import {Places} from '../../models/places.model';
import {Category} from '../../models/category';
import {CategoryService} from '../../services/category.service';
import {States} from '../../models/states.model';
import {NgForm} from '@angular/forms';
import {InsertOfferModel} from '../../models/insertOffer.model';

@Component({
  selector: 'app-single-offer-member',
  templateUrl: './single-offer-member.component.html',
  styleUrls: ['./single-offer-member.component.css'],
  styles: [],
})

export class SingleOfferMemberComponent implements OnInit {
  // @ts-ignore
  offer: InsertOfferModel = new InsertOfferModel ();
  categories: Category[] = [];
  id;
  statesModel = States;
  typesModel = Types;
  placesModel = Places;

  displayedColumns = ['title', 'description', 'place', 'sellerEMail'];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private offerService: OffersService,
    private categoryService: CategoryService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params.id;
    this.getMyOffersById(this.id);
    this.getAllCategories();
  }

  getAllCategories(): void {
    this.categoryService.getAllCategories()
      .subscribe((categories: Category[]) => {
          this.categories = categories;
        },
        err => {
          this.toastr.error(err);
        });
  }

  getMyOffersById(id: string): void {
    // tslint:disable-next-line:radix
    this.offerService.getMyById(parseInt(id)).subscribe((offer: InsertOfferModel) => {
      this.offer = offer;
      console.log(offer);
    },
      err => {
        this.toastr.error(err);
      });
  }

  // tslint:disable-next-line:typedef
  deleteOffer() {
    this.offerService.deleteMyOffer(this.id).subscribe(result => this.router.navigateByUrl('/admin/signalements'),
      err => {
        this.toastr.error(err);
      });
  }

  // tslint:disable-next-line:typedef
  onSubmit(form: NgForm) {
    this.offerService.updateOffer(this.offer).subscribe(r => {
        this.toastr.success('votre annonce a bien été mise à jour');
      },
      err => {
        this.toastr.error(err);
        console.log(err);
      });
  }

  onBack(): void {
    this.router.navigate(['offers']);
  }
}
