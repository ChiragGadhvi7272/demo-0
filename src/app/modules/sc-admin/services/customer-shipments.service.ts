import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomerShipmentsInfo } from '../models/customer-shipments-info.model';

@Injectable({
  providedIn: 'root',
})
export class CustomerShipmentsService {
  constructor(private http: HttpClient) {}

  getCustomerShipments(payload: CustomerShipmentsInfo): Observable<any> {
    let url = `${environment.apiUrl}/getCustomerShipments`;
    return this.http.post(url, payload);
  }

}
