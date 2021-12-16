import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

// tslint:disable-next-line:class-name
export class userService {
  private baseUrl = 'http://localhost:4200';
  public  user: any;

  constructor(private http: HttpClient) { }


}
