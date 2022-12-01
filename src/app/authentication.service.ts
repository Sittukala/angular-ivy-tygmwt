import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { ApiService, User } from './api.service';
import { first } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private user$ = new BehaviorSubject<User>(null);
apiSubs: any;

  constructor(private apiService: ApiService, private router: Router) {}

  login(username: string, password: string): Observable<User | null> {
    // your code here
    let loggedInUser : User = null;
     this.apiSubs = this.apiService.login(username,password).subscribe(
      user => { 
      loggedInUser = user
      this.user$.next(user)
    })
    
    return of(loggedInUser);
    
  }

  getLoginStatus = this.user$.asObservable();

  logout(): void {
    this.user$.next(null);
    this.apiSubs.unsubscribe()
    this.router.navigateByUrl('/login');
  }

  get isAuthenticated(): Observable<boolean> {
    return this.user$
      .asObservable()
      .pipe(map((u: User) => u?.isAuthenticated ?? false));
  }
}
