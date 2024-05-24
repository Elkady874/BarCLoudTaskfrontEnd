import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { User } from '../../Types/User';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor( private httpClient:HttpClient) { 
  }

  getUsers():Observable<any>{

    return this.httpClient.get(`${environment.backEnd}/api/BarCloud/AllUsers`)
 }
 updateUsers(user:User):Observable<any>{

  return this.httpClient.put(`${environment.backEnd}/api/BarCloud/UpdateUser`,user)
}
addUsers(user:User):Observable<any>{

  return this.httpClient.post(`${environment.backEnd}/api/BarCloud/User`,user)
}

removeUsers(userId:number):Observable<any>{

  return this.httpClient.delete(`${environment.backEnd}/api/BarCloud/User?user=${userId}`)
}
}
