import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StocksService {

  constructor( private httpClient:HttpClient) { 


  }

  getTickers():Observable<any>{

    return this.httpClient.get(`./assets/Data/Tickers.json`)
 }
}
