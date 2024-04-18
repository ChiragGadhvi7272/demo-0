import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ShipToLocations } from '../models/ship-to-locations.model';

@Injectable({
  providedIn: 'root',
})
export class ShipToLocationsService {
  constructor(private http: HttpClient) {}
  //get all the getShipToLocations based on clientId,orgId and InOrgId
  getShipToLocations(
    clientId: number,
    orgId: string,
    invOrgId: string
  ): Observable<ShipToLocations[]> {
    let parameters = { clientId: clientId, orgId: orgId, invOrgId: invOrgId };
    let queryParams = new HttpParams({ fromObject: parameters });
    let url = `${environment.apiUrl}/getShipToLocations?`;
    return this.http.get<ShipToLocations[]>(url, { params: queryParams });
  }

  saveShipToLocationDetails(payload: ShipToLocations) {
    let url = `${environment.apiUrl}/addOrUpdateShipToLocation`;
    return this.http.post<ShipToLocations>(url, payload);
  }

  getCompanyNames(clientId: number, orgId: string, invOrgId: string) : Observable<any>{
    let parameters = { clientId: clientId, orgId: orgId, invOrgId: invOrgId };
    let queryParams = new HttpParams({ fromObject: parameters });
    let url = `${environment.apiUrl}/shipToLocation/CustomerList?`;
    return this.http.get<any>(url, { params: queryParams });
  }

  uploadFile(
    clientId: number,
    orgId: string,
    invOrgId: string,
    formData: FormData
  ): Observable<any> {
    let parameters = { clientId: clientId, orgId: orgId, invOrgId: invOrgId };
    let queryParams = new HttpParams({ fromObject: parameters });
    let url = `${environment.apiUrl}/uploadShipToLocations?`;
    return this.http.post<any>(url, formData, { params: queryParams });
  }
}
