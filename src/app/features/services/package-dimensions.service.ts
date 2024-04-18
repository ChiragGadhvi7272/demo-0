import {
  HttpClient,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DimensionsInfo } from '../models/dimensions-info.model';

@Injectable({
  providedIn: 'root',
})
export class PackageDimensionsService {
  updatePackageDimensionsURL = `${environment.apiUrl}/updatePackageDimension`;
  constructor(private http: HttpClient) {}
  //get getPackageDimension details
  getPackageDimensions(
    clientId: number,
    orgId: string,
    invOrgId: string
  ): Observable<DimensionsInfo[]> {
    let parameters = { clientId: clientId, orgId: orgId, invOrgId: invOrgId };
    let queryParams = new HttpParams({ fromObject: parameters });
    let url = `${environment.apiUrl}/getPackageDimensions`;
    return this.http.get<DimensionsInfo[]>(url, { params: queryParams });
  }

  getAllPackageDimensions(clientId: number): Observable<DimensionsInfo[]> {
    let url = `${environment.apiUrl}/getAllPackageDimensions?clientId=`;
    return this.http.get<DimensionsInfo[]>(url + clientId);
  }

  createOrEditPackageDimensions(payload: DimensionsInfo) {
    let url = `${environment.apiUrl}/createOrEditPackageDimensions`;
    return this.http.post(url, payload);
  }

  updatePackageDimensions(data: any): Observable<any> {
    console.log('Api');

    return this.http.post(this.updatePackageDimensionsURL, data);
  }
}
