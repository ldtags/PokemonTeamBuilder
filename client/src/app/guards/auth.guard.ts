import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor( private authService: AuthService, private router: Router ) {}

  canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot ) : boolean {
    return this.authService.isAuthenticated();
  }
}