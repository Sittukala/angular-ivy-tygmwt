import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { first, map, Observable, of } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  isAuth: boolean = false;
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    // your code here
    this.authenticationService.isAuthenticated.subscribe((isAuth) => {
        this.isAuth = isAuth;
      });
    if (this.isAuth) {
      return of(true);
    }
    this.router.navigate(['/login'])
    return of(false);
  }
}
