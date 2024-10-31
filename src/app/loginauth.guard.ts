import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class loginAuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {

    var isLogged = localStorage.getItem('isLogged') === 'true';
    
    if (isLogged) {
      this.router.navigate(['/main']);
      return true;
    }

    return true;
  }

}