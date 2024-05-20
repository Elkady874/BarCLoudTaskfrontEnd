import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor( private httpClient:HttpClient) { 
  }

  getUsers():Observable<any>{

    return this.httpClient.get(`./assets/Data/Users.json`)
 }
}
