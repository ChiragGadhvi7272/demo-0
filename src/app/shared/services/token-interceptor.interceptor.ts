import { Inject, Injectable, InjectionToken } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError, timeout } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from './local-storage-service';

export const DEFAULT_TIMEOUT = new InjectionToken<number>('defaultTimeout');
@Injectable()
export class TokenInterceptorInterceptor implements HttpInterceptor {
  userData: any = '';
  userName: any;
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private localStorageService: LocalStorageService,
    @Inject(DEFAULT_TIMEOUT) protected defaultTimeout: number
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const timeoutValueNumeric = Number(this.defaultTimeout);
    if (localStorage.getItem('token')) {
      const accessToken = localStorage.getItem('token');
      this.userData = this.localStorageService.getLocalUserData();
      console.log(this.userData);
      if (this.userData != null) {
        this.userName = this.userData.userInfo.userName;
        request = request.clone({
          headers: request.headers
            .set('Authorization', 'Bearer ' + accessToken)
            .append('correlationId', this.userName),
        });
      } else {
        request = request.clone({
          headers: request.headers.set(
            'Authorization',
            'Bearer ' + accessToken
          ),
        });
      }
      return next.handle(request).pipe(
        timeout(timeoutValueNumeric),
        catchError((error: HttpErrorResponse) => {
          if (error.status === 403 || error.status === 401) {
            this.toastr.error('Session Expired');
            localStorage.clear();
            this.router.navigate(['/login']);
          } else if (
            error.status === 400 ||
            error.status === 404 ||
            error.status === 500
          ) {
          } else {
            this.toastr.error(
              'Webservice taking long time to respond, please try after sometime'
            );
          }
          return throwError(error);
        })
      );
    } else {
      return next.handle(request);
    }
  }
}
