import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ShipFromLocations } from '../models/ship-from-locations.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ShipFromLocationsService {
  constructor(private http: HttpClient) {}

  //get all the getShipFromLocations based on cliendId, orgId, invOrgId
  getShipFromLocations(
    clientId: number,
    orgId: string,
    invOrgId: string
  ): Observable<ShipFromLocations[]> {
    let parameters = { clientId: clientId, orgId: orgId, invOrgId: invOrgId };
    let queryParams = new HttpParams({ fromObject: parameters });
    let url = `${environment.apiUrl}/getShipFromLocations?`;
    return this.http.get<ShipFromLocations[]>(url, {
      params: queryParams,
    });
  }

  //save or update the Ship From Details
  saveShipFromLocationDetails(payload: ShipFromLocations) {
    let url = `${environment.apiUrl}/addOrUpdateShipFromLocation`;
    return this.http.post<ShipFromLocations>(url, payload);
  }

  getShipFromLookupValues(
    clientId: number,
    orgId: string,
    invOrgId: string
  ): Observable<any> {
    let parameters = { clientId: clientId, orgId: orgId, invOrgId: invOrgId };
    let queryParams = new HttpParams({ fromObject: parameters });
    let url = `${environment.apiUrl}/getShipFromLookupValues?`;
    return this.http.get<any>(url, {
      params: queryParams,
    });
  }
}
