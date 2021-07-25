import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  Routes,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private _authService: AuthService, private routes: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
   /* if (localStorage.getItem('id') != '1') {
      return true;
    } else {
      this.routes.navigate(['/signin']);
      return false;
    }*/
    if(this._authService.adminLoggedIn()){
      return true;
    }else{
      this.routes.navigate(['/signin']);
      return false;
    }
  }
}
