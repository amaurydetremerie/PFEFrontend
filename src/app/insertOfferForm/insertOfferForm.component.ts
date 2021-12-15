import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {InsertOfferModel} from '../home/shared/insertOffer.model';
import {InsertOfferService} from '../home/shared/insertOffer.service';
import {Observable} from 'rxjs';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {ImageVideoModel} from '../home/shared/imageVideo.model';
import {CategoryService} from '../home/shared/category.service';
import {MimeVerify} from '../home/shared/mimeVerify';
import {CategoryModel} from '../home/shared/category.model';
import {HttpClient} from '@angular/common/http';



@Component({
  selector: 'app-insert-offer-form',
  templateUrl: './offer-form.html',
  styleUrls: ['./offer.component.scss'],
})
export class InsertOfferFormComponent implements OnInit {

  files = [];

  // @ts-ignore
  categories!: CategoryModel[];

  constructor(public service: InsertOfferService, private toastr: ToastrService,
              public serviceCategory: CategoryService, private http: HttpClient, private mime: MimeVerify) {
  }

  readonly baseURL = 'https://localhost:7252';

  // image

  // tslint:disable-next-line:typedef
  get f() {
    return this.myForm.controls;
  }

  // @ts-ignore
  frmDataImage: FormData = new FormData();
  frmDataVideo: FormData = new FormData();


  // image
  images: {url: any, idImages: any, idFiles: any} [] = [];
  myForm = new FormGroup({
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });

  // video
  myFiles: { path: any , idVideos: any, idFiles: any } [] = [];
  myVideos: Observable<ImageVideoModel[]> | undefined;

  @ViewChild('videoPlayer') videoplayer: ElementRef | undefined;


  ngOnInit(): void {
    this.getAllCategories();
  }

  // image
  // tslint:disable-next-line:typedef
  onFileChange(event: Event) {
  console.log(this.files);
    // @ts-ignore
    // tslint:disable-next-line:prefer-for-of
  for (let i = 0; i < event.target.files.length; i++){
      // @ts-ignore
      if (!this.mime.imageCheck(event.target.files[i].type)) {
        this.toastr.error('Vous pouvez seulement mettre des images');
        return;
      }
    }
    // @ts-ignore
  if (event.target.files && event.target.files[0]) {
      // tslint:disable-next-line:prefer-const
      // @ts-ignore
      const filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          console.log(e.target);
          // @ts-ignore
          console.log(this.images.length, this.myFiles.length);
          this.images.push({
            // @ts-ignore
            url: e.target.result,
            // @ts-ignore
           idImages : this.images.length,
            // @ts-ignore
            idFiles : this.images.length + this.myFiles.length
          });

          this.myForm.patchValue({
            fileSource: this.images
          });
        };
        // @ts-ignore
        reader.readAsDataURL(event.target.files[i]);
      }
    }
    // @ts-ignore
    // tslint:disable-next-line:prefer-for-of
  for (let index = 0; index < event.target.files.length; index++) {
      // @ts-ignore
      const file = event.target.files[index];
      // @ts-ignore
      this.files.push(file);
      console.log(this.files);
    }
  }

  // video
  // tslint:disable-next-line:typedef
  toggleVideo(event: any) {
    // @ts-ignore
    this.videoplayer?.nativeElement.play();
  }

  // tslint:disable-next-line:typedef
  getvideos() {
    this.myVideos = this.VediosList();
  }

  VediosList(): Observable<ImageVideoModel[]> {
    // tslint:disable-next-line:no-unused-expression
    const myVideosBis = new Observable<ImageVideoModel[]>();
    for (let i = 0; i < this.myFiles.length ; i++) {
      // @ts-ignore
      myVideosBis[i] = this.myFiles[i];
    }
    console.log(myVideosBis);
    return myVideosBis;
  }

  // tslint:disable-next-line:typedef
  getFileDetails(e: Event) {
    // @ts-ignore
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < e.target.files.length; i++){
      // @ts-ignore
      if (!this.mime.videoCheck(e.target.files[i].type)) {
        this.toastr.error('Vous pouvez seulement mettre des vidéos');
        return;
      }
    }
    // @ts-ignore
    if (e.target.files && e.target.files[0]) {
      // tslint:disable-next-line:prefer-const
      // @ts-ignore
      const filesAmount = e.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        const reader = new FileReader();

        reader.onload = (er: any) => {
          console.log(er.target);
          // @ts-ignore
          this.myFiles.push({
            // @ts-ignore
            path: er.target.result,
            // @ts-ignore
            idVideos: this.myFiles.length,
            // @ts-ignore
            idFiles : this.images.length + this.myFiles.length
          });
          // @ts-ignore
          console.log(er.target.result);
        };
        // @ts-ignore
        reader.readAsDataURL(e.target.files[i]);
      }
    }
    // tslint:disable-next-line:prefer-for-of
    // @ts-ignore
    // tslint:disable-next-line:prefer-for-of
    for (let index = 0; index < e.target.files.length; index++) {
      // @ts-ignore
      const file = e.target.files[index];
      // @ts-ignore
      this.files.push(file);
    }
    console.log(this.files);
  }


// tslint:disable-next-line:typedef
  uploadFiles() {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.myFiles.length; i++) {
      // @ts-ignore
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
    this.http.post(this.baseURL + '/offers', formData).subscribe(res => {
        this.toastr.success('Votre annonce a bien été envoyée');
        this.resetForm(form);
      }, err => {
        this.toastr.error('Une erreur est survenue');
        console.log(err);
      }
    );
  }

// tslint:disable-next-line:typedef
  resetForm(form: NgForm) {
      this.images = [];
      this.myFiles = [];
      this.files = [];
      form.form.reset();
      this.service.formData = new InsertOfferModel();
      console.log(this.files, this.images, this.myFiles);
  }

  // tslint:disable-next-line:typedef
  onDelete(img: any) {
   // console.log(this.images);
    // console.log(this.files);
    // tslint:disable-next-line:prefer-for-of
    console.log(img.idImages);
    console.log(img.idFiles);

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.myFiles.length; i++) {
      if (this.myFiles[i].idFiles > img.idFiles){
        this.myFiles[i].idFiles -= 1;
      }
    }
    for (let i = img.idImages + 1; i < this.images.length; i++) {
      this.images[i].idImages  -=  1;
      this.images[i].idFiles -= 1;
    }


    this.images.splice(img.idImages, 1);
    this.files.splice(img.idFiles, 1);
  }

    // tslint:disable-next-line:typedef
    onDeleteVideo(video: any) {

      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.images.length; i++) {
        if (this.images[i].idFiles > video.idFiles){
          this.images[i].idFiles -= 1;
        }
      }
      for (let i = video.idVideos + 1; i < this.myFiles.length; i++) {
        this.myFiles[i].idVideos  -=  1;
        this.myFiles[i].idFiles -= 1;
      }
    // tslint:disable-next-line:prefer-for-of
      this.myFiles.splice(video.idImages, 1);
      this.files.splice(video.idFiles, 1);
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
/* goToChilds(id: string): void {
   // tslint:disable-next-line:radix
   const parentId = parseInt(id);
   this.serviceCategory.getChildsCategory(parentId)
     .subscribe((categories: CategoryModel[]) => {
       this.categoriesChild = categories;
     });
 } */


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
