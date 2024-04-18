import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate() {
    let role = localStorage.getItem('role');
    let currentUrl = this.router.url.split('/')[1];
    if (currentUrl === role) {
      return true;
    } else {
      alert('You Are Not Logged In');
      return false;
    }
  }
}
