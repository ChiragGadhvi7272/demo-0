import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  headers!: HttpHeaders;
  ngOnInit() {}

  constructor(private http: HttpClient) {}

  //To get all the User Details on Login
  getUserDetails(userName: string): Observable<any> {
    let parameters = { userName: userName };
    let queryParams = new HttpParams({ fromObject: parameters });
    let url: string = `${environment.apiUrl}/login?`;
    this.headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
      .append('correlationId', userName);
    return this.http.get(url + queryParams, { headers: this.headers });
  }

  //To Validate the credentials and to get Token value
  validateUserDetails(userName: string, emailId: string): Observable<any> {
    let parameters = { userName: userName, emailId: emailId };
    let queryParams = new HttpParams({ fromObject: parameters });
    let url: string = `${environment.apiUrl}/validateUser?`;
    this.headers = new HttpHeaders().set('correlationId', userName);
    return this.http.get(url + queryParams, { headers: this.headers });
  }

  //To Reset the Password
  resetUserPassword(token: string, newPassword: string) {
    let parameters = { token: token, password: newPassword };
    let queryParams = new HttpParams({ fromObject: parameters });
    let url: string = `${environment.apiUrl}/resetPassword?`;
    return this.http.get(url + queryParams);
  }

  //To Change the Password
  changePassword(userName: string, oldPassword: string, newPassword: string) {
    let parameters = {
      userName: userName,
      oldPassword: oldPassword,
      newPassword: newPassword,
    };
    let queryParams = new HttpParams({ fromObject: parameters });
    let url: string = `${environment.apiUrl}/changePassword?`;
    return this.http.post(url, queryParams);
  }
}
