import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = localStorage.getItem('token');
    var role = localStorage.getItem('role');
    if (role === 'admin' && token) {
      return true;
    } else {
      alert('Unauthorized Access!');
      if (!token) {
        this.router.navigate(['/unAuthorizedAccess']);
      }
      return false;
    }
  }
}
