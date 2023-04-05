import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { WeatherData } from '../models/weather.model';
import { LocationData } from '../models/location.model';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http:HttpClient) { }

  getLocation(cityName:string):Observable<LocationData>{

   return this.http.get<LocationData>("https://api.opencagedata.com/geocode/v1/json?q="+cityName+"+Turkey&key=fc0b758da37f45809087a77640ace254")
  }
}
