import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {InsertOfferModel} from '../home/shared/insertOffer.model';
import {InsertOfferService} from '../home/shared/insertOffer.service';
import {UploadFilesService} from '../home/shared/image.service';
import {any} from 'codelyzer/util/function';
import {Observable} from 'rxjs';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {ReactiveFormsModule} from '@angular/forms';
import {ImageVideoModel} from '../home/shared/imageVideo.model';
import {ImageVideoService} from '../home/shared/imageVideo.service';


@Component({
  selector: 'app-insert-offer-form',
  templateUrl: './offer-form.html',
  styleUrls: ['./offer.component.scss'],
})
export class InsertOfferFormComponent implements OnInit {

  // video
  title = 'fileupload';
  remark = '';

  constructor(public service: InsertOfferService, public serviceImage: UploadFilesService, private toastr: ToastrService,
              public serviceVideo: ImageVideoService) {
  }

  // image
  // tslint:disable-next-line:typedef
  get f() {
    return this.myForm.controls;
  }


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

  // image

  // tslint:disable-next-line:typedef
  onFileChange(event: Event) {
    // @ts-ignore
    if (event.target.files && event.target.files[0]) {
      // tslint:disable-next-line:prefer-const
      // @ts-ignore
      const filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        const reader = new FileReader();

        // tslint:disable-next-line:no-shadowed-variable
        reader.onload = (event: any) => {
          console.log(event.target.result);
          // @ts-ignore
          this.images.push(event.target.result);

          this.myForm.patchValue({
            fileSource: this.images
          });
        };

        // @ts-ignore
        reader.readAsDataURL(event.target.files[i]);
      }
    }
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
    const frmData = new FormData();
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.myFiles.length; i++) {
      frmData.append('fileUpload', this.myFiles[i]);
    }
    // @ts-ignore
    // @ts-ignore
    this.serviceVideo.postImageVideo('http://localhost:50401/api/FileUpload/UploadFiles', frmData).subscribe(
      data => {
        // SHOW A MESSAGE RECEIVED FROM THE WEB API.
        this.sMsg = data as string;
        console.log(this.sMsg);
      }
    );
  }


  ngOnInit(): void {
    console.log('tesfgrgbf');
    /* this.fileInfos = this.serviceImage.getFiles(); */
    /* this.getvideos(); */
  }

  // tslint:disable-next-line:typedef
  onSubmit(form: NgForm) {
    this.service.postFormOffer().subscribe(
      res => {
        this.serviceVideo.postImageVideo();
        this.serviceImage.postImage();
        this.resetForm(form);
        this.toastr.success('Envoi confirmé');
      },
      err => {
        console.log('err');
      }
    );
  }

  // tslint:disable-next-line:typedef
  resetForm(form: NgForm) {
    form.form.reset();
    this.service.formData = new InsertOfferModel();
  }


}
