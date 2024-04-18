import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CarrierAcctNumbersInfo } from '../models/carrier-acct-numbers-info.model';
import { CarrierOrgAcctDetailsInfo } from '../models/carrier-org-acct-details-info.model';
import { LoadCarriers } from '../models/load-carriers.model';

@Injectable({
  providedIn: 'root',
})
export class CarrierConfigurationsService {
  constructor(private http: HttpClient) {}

  getCarrierConfigurationDetails(
    clientId: number,
    orgId: string,
    invOrgId: string,
    carrierId: number
  ): Observable<any> {
    let parameters = {
      clientId: clientId,
      orgId: orgId,
      invOrgId: invOrgId,
      carrierId: carrierId,
    };
    let queryParams = new HttpParams({ fromObject: parameters });
    let url = `${environment.apiUrl}/getCarrierConfiguration?`;
    return this.http.get<any>(url + queryParams);
  }

  saveDetails(payload: CarrierOrgAcctDetailsInfo) {
    let url = `${environment.apiUrl}/createOrUpdateCarrierConfiguration`;
    return this.http.post<CarrierOrgAcctDetailsInfo>(url, payload);
  }

  getAccountNumbers(
    clientId: number,
    orgId: string,
    invOrgId: string,
    carrierCode: number,
    carrierId: number
  ): Observable<any> {
    let parameters = {
      clientId: clientId,
      orgId: orgId,
      invOrgId: invOrgId,
      carrierCode: carrierCode,
      carrierId: carrierId,
    };
    let queryParams = new HttpParams({ fromObject: parameters });
    let url = `${environment.apiUrl}/getAccountNumbers?`;
    return this.http.get<any>(url + queryParams);
  }

  saveAccountNumbers(payload: CarrierAcctNumbersInfo) {
    let url = `${environment.apiUrl}/createOrUpdateAccountNumber`;
    return this.http.post<CarrierAcctNumbersInfo>(url, payload);
  }

  updateAccountNumbers(payload: CarrierAcctNumbersInfo[]): Observable<any> {
    let url = `${environment.apiUrl}/updateAccountNumberDetails`;
    return this.http.post(url, payload);
  }

  loadCarriers(payload: LoadCarriers) {
    let url = `${environment.apiUrl}/loadCarriers`;
    return this.http.post(url, payload);
  }
}
