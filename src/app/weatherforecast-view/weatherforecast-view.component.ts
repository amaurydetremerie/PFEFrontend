import { Component, OnInit } from '@angular/core';
import { WeatherforecastService } from '../weatherforecast.service';
import {Weatherforecast} from '../weatherforecast';

@Component({
  selector: 'app-weatherforecast-view',
  templateUrl: './weatherforecast-view.component.html',
  styleUrls: ['./weatherforecast-view.component.css']
})
export class WeatherforecastViewComponent implements OnInit {

  weatherforecasts: Weatherforecast[] = [];
  weatherforecastsFree: Weatherforecast[] = [];
  weatherforecastsAdministrator: Weatherforecast[] = [];

  displayedColumns = ['date', 'temperatureC', 'temperatureF', 'summary'];

  constructor(private service: WeatherforecastService) { }

  ngOnInit(): void {
    this.getWeatherforecast();
    this.getWeatherforecastFree();
    this.getWeatherforecastAdministrator();
  }

  getWeatherforecast(): void {
    this.service.getWeatherforecast()
      .subscribe((weatherforecasts: Weatherforecast[]) => {
        this.weatherforecasts = weatherforecasts;
      });
  }

  getWeatherforecastFree(): void {
    this.service.getWeatherforecastFree()
      .subscribe((weatherforecasts: Weatherforecast[]) => {
        this.weatherforecastsFree = weatherforecasts;
      });
  }

  getWeatherforecastAdministrator(): void {
    this.service.getWeatherforecastAdministrator()
      .subscribe((weatherforecasts: Weatherforecast[]) => {
        this.weatherforecastsAdministrator = weatherforecasts;
      });
  }
}
