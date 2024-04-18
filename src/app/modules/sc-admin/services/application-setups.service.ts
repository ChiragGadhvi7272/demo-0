import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApplicationSetupsInfo } from '../models/application-setups-info.model';

@Injectable({
  providedIn: 'root',
})
export class ApplicationSetupsService {
  constructor(private http: HttpClient) {}
  //To Save the logger Details
  saveApplicationSetups(payload: ApplicationSetupsInfo) {
    let url = `${environment.apiUrl}/saveOrUpdateApplicationSetups`;
    return this.http.post<ApplicationSetupsInfo>(url, payload);
  }

  //To get the saved details by client id
  getApplicationSetups(clientId: number): Observable<ApplicationSetupsInfo> {
    let url = `${environment.apiUrl}/getApplicationSetups?clientId=`;
    return this.http.get<ApplicationSetupsInfo>(url + clientId);
  }
}
