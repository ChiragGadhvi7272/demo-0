import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddressValidationRequest } from '../models/address-validation-request.model';
import { AddressValidationResponse } from '../models/address-validation-response.model';

@Injectable({
  providedIn: 'root'
})
export class AddOnServicesService {

  constructor(private http: HttpClient) {}

  validateAddress(addressValidationRequest: AddressValidationRequest): Observable<AddressValidationResponse> {
    let url = `${environment.apiUrl}/validateAddress`;
    return this.http.post<AddressValidationResponse>(url, addressValidationRequest);
  }


}
