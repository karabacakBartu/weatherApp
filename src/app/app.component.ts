import { Component, OnInit } from '@angular/core';
import { WeatherData } from './models/weather.model';
import { WeatherapiService } from './services/weatherapi.service';
import { LocationService } from './services/location.service';
import { LocationData } from './models/location.model';
import { Subscription, timer } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { share } from 'rxjs/internal/operators/share';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private weatherService:WeatherapiService,private locationService:LocationService){
  }

weatherData:WeatherData;
indexOfTemperature:number;
photoBg:string='../assets/sunrise.avif';
location:string;
temperature:number;
windSpeed:number;
humidity:number;
maxTemp:number;
minTemp:number;
locationData:LocationData;
longitude;
latitude;
city:string;
date;
intervalId;
subscription: Subscription;
clock :string;

cities = ['Adana', 'Adiyaman', 'Afyon', 'Ağri', 'Amasya', 'Ankara', 'Antalya', 'Artvin',
'Aydin', 'Balikesir', 'Bilecik', 'Bingöl', 'Bitlis', 'Bolu', 'Burdur', 'Bursa', 'Çanakkale',
'Çankiri', 'Çorum', 'Denizli', 'Diyarbakir', 'Edirne', 'Elaziğ', 'Erzincan', 'Erzurum', 'Eskişehir',
'Gaziantep', 'Giresun', 'Gümüşhane', 'Hakkari', 'Hatay', 'Isparta', 'Mersin', 'İstanbul', 'İzmir', 
'Kars', 'Kastamonu', 'Kayseri', 'Kirklareli', 'Kirşehir', 'Kocaeli', 'Konya', 'Kütahya', 'Malatya', 
'Manisa', 'Kahramanmaraş', 'Mardin', 'Muğla', 'Muş', 'Nevşehir', 'Niğde', 'Ordu', 'Rize', 'Sakarya',
'Samsun', 'Siirt', 'Sinop', 'Sivas', 'Tekirdağ', 'Tokat', 'Trabzon', 'Tunceli', 'Şanliurfa', 'Uşak',
'Van', 'Yozgat', 'Zonguldak', 'Aksaray', 'Bayburt', 'Karaman', 'Kirikkale', 'Batman', 'Şirnak',
'Bartin', 'Ardahan', 'Iğdir', 'Yalova', 'Karabük', 'Kilis', 'Osmaniye', 'Düzce'];


selectedCity:string="Istanbul";




  async ngOnInit(): Promise<void> {
    var hour=new Date();


    //This is for real time clock
    this.intervalId = setInterval(() => {
     hour
    }, 1000);

    this.subscription = timer(0, 1000)
    .pipe(
      map(() => new Date()),
      share()
    ).subscribe(time=>{
      this.clock=time.getHours().toString()+":"+time.getMinutes().toString()+":"+time.getSeconds().toString()

    })

    

    //This is for change background photo when time is pass 19.00
    if(hour.getHours() >=19||hour.getHours()<7){
      this.photoBg="../assets/FreeVector-Night-Vector-Landscape.jpg ";
    }

    
    
    //This is request for weather data
    this.weatherService.getWeather(28.95,41.01).subscribe({
      next: (response)=>{
        
        this.weatherData=response
        this.weatherData.hourly.time.map((element)=>{
            if(new Date(element).getTime()>Date.now()&&!this.indexOfTemperature){
              this.indexOfTemperature=this.weatherData.hourly.time.indexOf(element)-1;
            }
        })
        this.temperature=this.weatherData.hourly.temperature_2m[this.indexOfTemperature]
        this.maxTemp=this.weatherData.daily.temperature_2m_max.sort(function(a, b){return b - a})[0]
        this.minTemp=this.weatherData.daily.temperature_2m_max.sort(function(a, b){return a - b})[0]
        this.humidity=this.weatherData.hourly.relativehumidity_2m[this.indexOfTemperature]
        this.windSpeed=this.weatherData.hourly.windspeed_10m[this.indexOfTemperature]
        this.location=this.weatherData.timezone.split("/")[1]
        
        console.log(response,"resp");
        console.log(this.indexOfTemperature,"now time");
        console.log(this.temperature,"derece");
        console.log(this.longitude,this.latitude,"korr");
        
      
      }
    })
  }



  onCitySelect(city: string) {
    console.log(city,"city");
    
    if (city ) {
      // Yeni bir şehir seçildiğinde buraya girecek kodlar
    this.selectedCity = city;
    this.longitude=this.locationService.getLocation(city).subscribe({next:async(response)=>{

      this.locationData=response
      console.log(this.locationData);
      this.longitude=this.locationData.results[0].geometry.lng;
      this.latitude=this.locationData.results[0].geometry.lat;
      
      console.log(this.longitude);

      //get new weather data
      this.weatherService.getWeather(this.longitude,this.latitude).subscribe({next:async(response)=>{
        

        this.weatherData=response
        this.weatherData.hourly.time.map((element)=>{
            if(new Date(element).getTime()>Date.now()&&!this.indexOfTemperature){
              this.indexOfTemperature=this.weatherData.hourly.time.indexOf(element)-1;
            }
        })
        this.temperature=this.weatherData.hourly.temperature_2m[this.indexOfTemperature]
        this.maxTemp=this.weatherData.daily.temperature_2m_max.sort(function(a, b){return b - a})[0]
        this.minTemp=this.weatherData.daily.temperature_2m_max.sort(function(a, b){return a - b})[0]
        this.humidity=this.weatherData.hourly.relativehumidity_2m[this.indexOfTemperature]
        this.windSpeed=this.weatherData.hourly.windspeed_10m[this.indexOfTemperature]
        this.location=this.weatherData.timezone.split("/")[1]
        
      
      }})

    }})

   

    }
  }



}
