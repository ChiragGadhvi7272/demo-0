import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DownloadFilesInfo } from '../models/download-files-info.model';

@Injectable({
  providedIn: 'root',
})
export class DownloadFilesService {
  constructor(private http: HttpClient) {}

  getDowloadFiles(payload: DownloadFilesInfo): Observable<any> {
    let url = `${environment.apiUrl}/downloadFiles`;
    return this.http.post(url, payload);
  }
  getDownloadFileContentUrl(fileName: string): string {
    return `${environment.apiUrl}/downloadFileContent/${fileName}`;
  }
}
