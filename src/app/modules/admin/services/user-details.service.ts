import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserDetails } from '../models/user-details.model';

@Injectable({
  providedIn: 'root',
})
export class UserDetailsService {

  constructor(private http: HttpClient) {}

  //get all the users based on clientId
  getUserDetails(clientId: number): Observable<UserDetails[]> {
    let url = `${environment.apiUrl}/getUsers/`;
    return this.http.get<UserDetails[]>(url + clientId);
  }

  //save and update the users data
  saveUserDetails(payload: UserDetails) {
    let url = `${environment.apiUrl}/createOrUpdateUser`;
    return this.http.post<UserDetails>(url, payload);
  }

  getUserLookupValues(clientId: number) : Observable<any>{
    let url = `${environment.apiUrl}/getUserLookupValues/`;
    return this.http.get<any>(url + clientId);
  }
}
