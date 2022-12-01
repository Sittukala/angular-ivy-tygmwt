import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isAuth = false;

  private onDestroy$ = new Subject<void>();

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.authenticationService.isAuthenticated
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((isAuth) => {
        this.isAuth = isAuth;
      });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  onLogout() {
    this.authenticationService.logout();
  }
}
