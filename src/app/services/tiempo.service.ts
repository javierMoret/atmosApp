import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TiempoService {

  apiKey = 'd54deded2e1b3905c00bcc67701d0487';

  constructor(private http: HttpClient) { }


  getTiempoPorLatLon(lat: number, lon: number): Observable<any> {
    return this.http.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=es&units=metric&appid=${this.apiKey}`, { responseType: 'json' })
      .pipe(
        map((response: any) => {
          return response
        })
      )

  }
  getTiempoPorId(id: number): Observable<any> {
    return this.http.get(`https://api.openweathermap.org/data/2.5/weather?id=${id}&lang=es&units=metric&appid=${this.apiKey}`, { responseType: 'json' })
      .pipe(
        map((response: any) => {
          return response
        })
      )
  }
  getTiempoPorNombre(query: string,pais:string): Observable<any> {
    return this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${query},${pais}&lang=es&units=metric&appid=${this.apiKey}`, { responseType: 'json' })
      .pipe(
        map((response: any) => {
          return response
        })
      )
  }

  getPronosticoPorNombre(query: string,pais:string): Observable<any> {
    return this.http.get(`https://api.openweathermap.org/data/2.5/forecast?q=${query},${pais}&lang=es&units=metric&appid=${this.apiKey}`, { responseType: 'json' })
      .pipe(
        map((response: any) => {
          return response
        })
      )
  }
  getPronosticoPorId(id: number): Observable<any> {
    return this.http.get(`https://api.openweathermap.org/data/2.5/forecast?id=${id}&lang=es&units=metric&appid=${this.apiKey}`, { responseType: 'json' })
      .pipe(
        map((response: any) => {
          return response
        })
      )
  }


  getCiudades() {
    return this.http.get(`../../assets/docs/city.list.json`, { responseType: 'json' })
      .pipe(
        map((response: any) => {
          return response
        })
      )
  }
}

