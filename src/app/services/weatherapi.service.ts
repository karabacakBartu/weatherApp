import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { WeatherData } from '../models/weather.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherapiService {

  constructor(private http:HttpClient) { }

  getWeather(long:number,lat:number):Observable<WeatherData>{

    const options = {
      headers: new HttpHeaders().set(environment.xRapidAPIKeyName,environment.xRapidAPIKey).set(environment.xRapidAPIHostHeaderName,environment.xRapidAPIHostHeaderValue)
      }
    ;
      
   return this.http.get<WeatherData>("https://api.open-meteo.com/v1/forecast?latitude="+lat+"&longitude="+long+"&hourly=temperature_2m,relativehumidity_2m,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto")
    

  }
}
