import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ClientInfo } from 'src/app/features/models/client-info.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LookupValuesService {
  constructor(private http: HttpClient) {}

  getAllCustomerNames(): Observable<any> {
    let url = `${environment.apiUrl}/getCustomerNames`;
    return this.http.get(url);
  }

  getLookUps(lookupType: string, erpType: string): Observable<any> {
    let parameters = { lookupType: lookupType, erpType: erpType };
    let queryParams = new HttpParams({ fromObject: parameters });
    let url = `${environment.apiUrl}/getLookUps`;
    return this.http.get(url, {
      params: queryParams,
    });
  }

  getCarrierConfiguration(
    clientId: number,
    orgId: string,
    invOrgId: string,
    carrierId: string
  ): Observable<any> {
    let parameters = { clientId: clientId, orgId: orgId, invOrgId: invOrgId, carrierId: carrierId };
    let queryParams = new HttpParams({ fromObject: parameters });
    let url = `${environment.apiUrl}/getCarrierConfiguration`;
    return this.http.get(url, {
      params: queryParams,
    });
  }
  getCountryCodeValues() {
    let url = `${environment.apiUrl}/getCountryCodes`;
    return this.http.get(url);
  }

  getCurrencyCodeValues() {
    let url = `${environment.apiUrl}/getCurrencyCodes`;
    return this.http.get(url);
  }

  getShipperNames(clientId: number) {
    let url = `${environment.apiUrl}/getShipperNames?clientId=`;
    return this.http.get(url + clientId);
  }

  getInvOrgsList(clientId: number) {
    let url = `${environment.apiUrl}/getInvOrgValues?clientId=`;
    return this.http.get(url + clientId);
  }

  getCarrierModeLookups(
    clientId: number,
    orgId: string,
    invOrgId: string,
    carrierId: number,
    carrierCode: number,
    carrierMode: string
  ): Observable<any> {
    let parameters = {
      clientId: clientId,
      orgId: orgId,
      invOrgId: invOrgId,
      carrierId: carrierId,
      carrierCode: carrierCode,
      carrierMode: carrierMode,
    };
    let queryParams = new HttpParams({ fromObject: parameters });
    let url = `${environment.apiUrl}/getCarrierModeLookups?`;
    return this.http.get(url + queryParams);
  }
  //get all the getShipFromLocations based on cliendId, orgId, invOrgId
  getShipFromLocationsList(
    id: number,
    orgId: string,
    invOrgId: string
  ): Observable<any> {
    let url = `${environment.apiUrl}/getShipFromLocationsList`;
    let parameters = { clientId: id, orgId: orgId, invOrgId: invOrgId };
    let queryParams = new HttpParams({ fromObject: parameters });
    return this.http.get(url, {
      params: queryParams,
    });
  }

  //get operating Unit values based on clientId
  getOrganizationsList(clientId: number): Observable<any> {
    let url = `${environment.apiUrl}/getOrganizationsList?clientId=`;
    return this.http.get(url + clientId);
  }

  //getOrganization values based on clientId and orgId
  getInventoryOrganizationsList(clientId: any, orgId: string): Observable<any> {
    let parameters = { clientId: clientId, orgId: orgId };
    let queryParams = new HttpParams({ fromObject: parameters });
    let url = `${environment.apiUrl}/getInventoryOrganizationsList?`;
    return this.http.get(url + queryParams);
  }
  getCarriersList(
    clientId: number,
    orgId: string,
    invOrgId: string
  ): Observable<any> {
    let parameters = { clientId: clientId, orgId: orgId, invOrgId: invOrgId };
    let queryParams = new HttpParams({ fromObject: parameters });
    let url = `${environment.apiUrl}/getCarrierNames?`;
    return this.http.get(url + queryParams);
  }

  getCarrierCodes(): Observable<any> {
    let url = `${environment.apiUrl}/getCarrierCodes`;
    return this.http.get(url);
  }
  getCarrierLookups(carrierCode: number): Observable<any> {
    let parameters = { carrierCode: carrierCode };
    let queryParams = new HttpParams({ fromObject: parameters });
    let url = `${environment.apiUrl}/getCarrierLookUps?`;
    return this.http.get(url + queryParams);
  }

  getCustomerDetails(): Observable<ClientInfo[]> {
    let url = `${environment.apiUrl}/getCustomers`;
    return this.http.get<ClientInfo[]>(url);
  }

  getCarrierServiceLevelCodes(
    clientId: number,
    carrierCode: number,
    carrierMode: string
  ): Observable<any> {
    let parameters = {
      clientId: clientId,
      carrierCode: carrierCode,
      carrierMode: carrierMode,
    };
    let queryParams = new HttpParams({ fromObject: parameters });
    let url = `${environment.apiUrl}/getCarrierServiceLevelCodes`;
    return this.http.get(url, {
      params: queryParams,
    });
  }
}
