import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthResponse } from '../models/auth-response.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  ngOnInit() {}

  constructor(private http: HttpClient) {}

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  login(username: string, password: string): Observable<any> {
    let client_username: string = `${environment.oauthUserName}`;
    let client_password: string = `${environment.oauthPassword}`;
    let url: string = `${environment.authApiUrl}/oauth2/token`;
    var formData: any = new FormData();
    formData.append('grant_type', 'shipconsole_credentials');
    formData.append('username', username);
    formData.append('password', password);
    return this.http.post<AuthResponse>(url, formData, {
      headers: {
        Authorization: 'Basic ' + btoa(client_username + ':' + client_password),
      },
    });
  }
  loginWithClientCredentials(): Observable<any> {
    let client_username: string = `${environment.oauthUserName}`;
    let client_password: string = `${environment.oauthPassword}`;
    let url: string = `${environment.authApiUrl}/oauth2/token`;
    var formData: any = new FormData();
    formData.append('grant_type', 'client_credentials');
    return this.http.post<AuthResponse>(url, formData, {
      headers: {
        Authorization: 'Basic ' + btoa(client_username + ':' + client_password),
      },
    });
  }

}
