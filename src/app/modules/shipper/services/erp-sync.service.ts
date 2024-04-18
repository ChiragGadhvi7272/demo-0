import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ErpSyncRequest } from '../models/erp-sync-request.model';

@Injectable({
  providedIn: 'root',
})
export class ErpSyncService {
  constructor(private http: HttpClient) {}

  erpSync(erpSyncRequest: ErpSyncRequest): Observable<any> {
    let url: string = `${environment.apiUrl}/erpSync`;
    return this.http.post<any>(url, erpSyncRequest);
  }
}
