import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../api.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  userdetails: any;
  constructor(
    private route: ActivatedRoute,
    private authService: AuthenticationService
  ) {}
  user: User;
  ngOnInit() {
    this.userdetails = this.authService.getLoginStatus.subscribe((data) => {
      if (data) {
        this.user = data;
      }
    });
  }

  ngOnDestroy() {
    this.userdetails.unsubscribe();
  }
}
