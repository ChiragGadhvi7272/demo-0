import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { InventoryOrganization } from '../models/inventory-organization.model';

@Injectable({
  providedIn: 'root',
})
export class InventoryOrganizationService {
  getInvDetailsId = `${environment.apiUrl}/getAllInventoryOrgsDetails?clientId=`;
  createUpdateInvOrg = `${environment.apiUrl}/createOrUpdateInvOrgDetails`;
  constructor(private http: HttpClient) {}

  //get inventory organization details based on clientId
  getInvOrgList(clientId: number): Observable<InventoryOrganization[]> {
    return this.http.get<InventoryOrganization[]>(
      this.getInvDetailsId + clientId
    );
  }

  //save and update the inventory org details
  createUpdateInvOrgDetails(
    payload: InventoryOrganization,
    actionType: string
  ) {
    let parameter = { actionType: actionType };
    let queryParams = new HttpParams({ fromObject: parameter });
    return this.http.post<InventoryOrganization>(
      this.createUpdateInvOrg,
      payload,
      { params: queryParams }
    );
  }
}
