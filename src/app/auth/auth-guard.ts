import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { LocalStorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor( 
    private routes: Router,
    private localStorage: LocalStorageService
  ){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
      if (this.localStorage.get('logged-user-email') != null) {
        return true;
      }
      else {
        this.routes.navigate(['/sign-in']);
        return false;
      }
  }
  
}