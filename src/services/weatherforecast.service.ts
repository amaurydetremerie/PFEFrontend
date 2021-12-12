import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Weatherforecast } from '../models/weatherforecast';
import * as auth from '../app/auth-config.json';

@Injectable({
  providedIn: 'root'
})
export class WeatherforecastService {
  url = auth.resources.todoListApi.resourceUri;

  constructor(private http: HttpClient) { }

  getWeatherforecast() {
    return this.http.get<Weatherforecast[]>(this.url + '/weatherforecast');
  }

  getWeatherforecastFree() {
    return this.http.get<Weatherforecast[]>(this.url + '/free');
  }

  getWeatherforecastAdministrator() {
    return this.http.get<Weatherforecast[]>(this.url + '/administrator');
  }
}
