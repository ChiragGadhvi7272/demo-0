import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoadFreight } from '../models/load-freight.model';
import { ClientOrgProfileOptionsInfo } from '../models/client-org-profile-options-info.model';
import { ClientInfo } from '../models/client-info.model';
import { Observable } from 'rxjs';
import { FreightCostTypesInfo } from '../models/freight-cost-types-info.model';
import { ShipperNameLookupInfo } from '../models/shipper-name-lookup-info.model';
@Injectable({
  providedIn: 'root',
})
export class ProfileOptionsService {
  constructor(private http: HttpClient) {}

  getProfileOptions(
    orgId: string,
    invOrgId: string,
    id: number
  ): Observable<ClientOrgProfileOptionsInfo> {
    let parameters = { clientId: id, orgId: orgId, invOrgId: invOrgId };
    let queryParams = new HttpParams({ fromObject: parameters });
    let url = `${environment.apiUrl}/getProfileOptionDetails`;
    return this.http.get<ClientOrgProfileOptionsInfo>(url, {
      params: queryParams,
    });
  }

  saveProfileOptions(
    payload: ClientOrgProfileOptionsInfo
  ): Observable<ClientOrgProfileOptionsInfo> {
    let url = `${environment.apiUrl}/createOrUpdateProfileOptions`;
    return this.http.post<ClientOrgProfileOptionsInfo>(url, payload);
  }

  loadFreightCostTypes(payload: LoadFreight): Observable<LoadFreight> {
    let url = `${environment.apiUrl}/loadFreightCostTypes`;
    return this.http.post<LoadFreight>(url, payload);
  }

  getFreightCostNamesList(
    clientId: number
  ): Observable<FreightCostTypesInfo[]> {
    let parameters = { clientId: clientId };
    let queryParams = new HttpParams({ fromObject: parameters });
    let url = `${environment.apiUrl}/getFreightCostNamesList`;
    return this.http.get<FreightCostTypesInfo[]>(url, { params: queryParams });
  }

  getProfileOptionsLookupValues(
    erpType: string,
    clientId: number
  ): Observable<any> {
    let parameters = {
      erpType: erpType,
      clientId: clientId,
    };
    let queryParams = new HttpParams({ fromObject: parameters });
    let url = `${environment.apiUrl}/getProfileOptionsLookupValues?`;
    return this.http.get<any>(url + queryParams);
  }

  getCustomerDetails(): Observable<ClientInfo[]> {
    let url = `${environment.apiUrl}/getCustomers`;
    return this.http.get<ClientInfo[]>(url);
  }

  saveShipperName(payload: ShipperNameLookupInfo) {
    let url = `${environment.apiUrl}/addShipperName`;
    return this.http.post<ShipperNameLookupInfo>(url, payload);
  }
}
