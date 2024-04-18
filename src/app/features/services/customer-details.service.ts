import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ClientInfo } from '../models/client-info.model';

@Injectable({
  providedIn: 'root',
})
export class CustomerDetailsService {
  constructor(private http: HttpClient) {}

  getCustomerDetails(): Observable<ClientInfo[]> {
    let url = `${environment.apiUrl}/getCustomers`;
    return this.http.get<ClientInfo[]>(url);
  }

  //save and update the customers data//
  saveCustomerDetails(payload: ClientInfo) {
    let url = `${environment.apiUrl}/createOrUpdateCustomer`;
    return this.http.post<ClientInfo>(url, payload);
  } 

  getCustomerLookups() {
    let url = `${environment.apiUrl}/getCustomerLookupValues`;
    return this.http.get(url);
  }
}
