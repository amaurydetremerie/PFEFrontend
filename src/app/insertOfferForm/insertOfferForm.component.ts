import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {InsertOfferModel} from '../home/shared/insertOffer.model';
import {InsertOfferService} from '../home/shared/insertOffer.service';
import {UploadFilesService} from '../home/shared/image.service';
import {Observable} from 'rxjs';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {ImageVideoModel} from '../home/shared/imageVideo.model';
import {ImageVideoService} from '../home/shared/imageVideo.service';
import {CategoryService} from '../home/shared/category.service';
import {CategoryModel} from '../home/shared/category.model';
import {HttpClient} from '@angular/common/http';



@Component({
  selector: 'app-insert-offer-form',
  templateUrl: './offer-form.html',
  styleUrls: ['./offer.component.scss'],
})
export class InsertOfferFormComponent implements OnInit {


  files  = [];


  // @ts-ignore
  categories!: CategoryModel[];


  // video
  title = 'fileupload';
  remark = '';

  constructor(public service: InsertOfferService, public serviceImage: UploadFilesService, private toastr: ToastrService,
              public serviceVideo: ImageVideoService, public serviceCategory: CategoryService, private http: HttpClient) {
  }

  // image
  // tslint:disable-next-line:typedef
  get f() {
    return this.myForm.controls;
  }

  readonly baseURL = 'https://localhost:7252';

  // @ts-ignore
  frmDataImage: FormData = new FormData();
  frmDataVideo: FormData = new FormData();


  // image
  images = [];
  myForm = new FormGroup({
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });

  // video
  myFiles: string[] = [];
  myVideos: Observable<ImageVideoModel[]> | undefined;

  @ViewChild('videoPlayer') videoplayer: ElementRef | undefined;

  sMsg = '';

  ngOnInit(): void {
    console.log('tesfgrgbf');
    // @ts-ignore
    this.getAllCategories();
  }


  // image

  // tslint:disable-next-line:typedef
  onFileChange(event: Event) {
    // @ts-ignore
    // tslint:disable-next-line:prefer-for-of
    for (let index = 0; index < event.target.files.length; index++)
    {
      // @ts-ignore
      const file = event.target.files[index];
      // @ts-ignore
      this.files.push(file);
      console.log(this.files);
    }
/*



    // @ts-ignore
    if (event.target.files) {
      // @ts-ignore
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < event.target.files.length; i++) {
        const reader = new FileReader();
        // tslint:disable-next-line:no-shadowed-variable
        reader.onload = (e: any) => {
          console.log(e);
          // console.log(event.target.result);
          // @ts-ignore
          this.images.push(e.target.result);

          this.myForm.patchValue({
            fileSource: this.images
          });
        };

        // @ts-ignore
        reader.readAsDataURL(event.target.files[i]);
      }
    }*/
  }

  // video
  // tslint:disable-next-line:typedef
  toggleVideo() {
    // @ts-ignore
    this.videoplayer.nativeElement.play();
  }

  // tslint:disable-next-line:typedef
  getvideos() {
    // tslint:disable-next-line:no-debugger
    debugger;
    this.myVideos = this.VediosList();
  }

  VediosList(): Observable<ImageVideoModel[]> {
    // @ts-ignore
    return this.serviceVideo.postImageVideo();
  }

  // tslint:disable-next-line:typedef
  getFileDetails(e: Event) {
    // console.log (e.target.files);
    // tslint:disable-next-line:prefer-for-of
    // @ts-ignore
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < e.target.files.length; i++) {
      // @ts-ignore
      this.myFiles.push(e.target.files[i]);
    }
  }

  // tslint:disable-next-line:typedef
  uploadFiles() {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.myFiles.length; i++) {
      this.frmDataVideo.append('fileUpload', this.myFiles[i]);
    }
  }

  // tslint:disable-next-line:typedef
  uploadFilesImage() {
    // tslint:disable-next-line:prefer-for-of
    // @ts-ignore
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.myForm.value.fileSource.length; i++) {
      this.frmDataImage.append('file', this.myForm.value.fileSource[i]);
    }

  }

  getAllCategories(): void {
    this.serviceCategory.getAllCategories()
      .subscribe((categories: CategoryModel[]) => {
        this.categories = categories;
      });
  }

 /* goToChilds(id: string): void {
    // tslint:disable-next-line:radix
    const parentId = parseInt(id);
    this.serviceCategory.getChildsCategory(parentId)
      .subscribe((categories: CategoryModel[]) => {
        this.categoriesChild = categories;
      });
  } */

  // tslint:disable-next-line:typedef
  onSubmit(form: NgForm) {
    console.log(this.service.formData);
    console.log(form);
    console.log(this.files);
    const formData = new FormData();
    formData.append('offerJson', JSON.stringify(this.service.formData));
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.files.length; i++) {
      console.log(this.files[i]);
      formData.append('files', this.files[i]);
    }
    this.http.post(this.baseURL + '/offers', formData).subscribe(
      result => console.log(result));
  }

  // tslint:disable-next-line:typedef
  resetForm(form: NgForm) {
    form.form.reset();
    this.service.formData = new InsertOfferModel();
  }
}

/* this.fileInfos = this.serviceImage.getFiles(); */
/* this.getvideos(); */
/*  this.authService.instance.acquireTokenSilent({
scopes: ['user.read'],
account: this.authService.instance.getAllAccounts()[0]
}).then(result => {
console.log(result);
this.http.get(GRAPH_ENDPOINT, {
  headers: {
    Authorisation: ['Bearer ' + result.idToken]
  }
}).subscribe(profile => {
  console.log(profile);
  // @ts-ignore
  this.profile = profile;
});
});

// const GRAPH_ENDPOINT = 'https://graph.microsoft.com/v1.0/me';

 type ProfileType = {
  givenName?: string,
  surname?: string,
  userPrincipalName?: string,
  id?: string
};
// profile!: ProfileType;
*/
