import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { first } from 'rxjs/operators';
import { catchError, Observable, of, throwError } from 'rxjs';
import { bootstrapApplication } from '@angular/platform-browser';
import { CustomValidators } from '../customvalidators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit , OnDestroy{
  loginForm: FormGroup;
  submitted: boolean = false;
  authSubs: any;
  showError: Boolean = false;
  error : string; 
  constructor(
    private authService: AuthenticationService,
    private route: Router
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.email, CustomValidators.required('This Field is required')]),
      password: new FormControl('',CustomValidators.required('This Field is required')),
    });
  }

  get getForm() {
    return this.loginForm.controls;
  }
  ngOnInit() {}

  submit() {
    this.submitted = true;

    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.showError = false
      this.authSubs = this.authService
        .login(this.loginForm.value.email, this.loginForm.value.password)
        .subscribe({
          
          next : (user) => {
            (user) ? this.route.navigate(['/dashboard'])  : this.showError = true;
          
          },
          error: (error) => {console.log("error", error) },
          
          complete : () => {console.log("completed") },
          
        });
    
    }
  }


  ngOnDestroy() {
    if (this.authSubs != null){
      this.authSubs.unsubscribe()
    }
  }
}
