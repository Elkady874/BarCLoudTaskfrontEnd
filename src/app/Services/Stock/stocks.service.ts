import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class StocksService {

  constructor( private httpClient:HttpClient) { 


  }

  getTickers():Observable<any>{

    return this.httpClient.get(`${environment.backEnd}/api/BarCloud/AllStocks`)
 }
}
