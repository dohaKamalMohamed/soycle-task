import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import {  AuthenticationService } from '../../../_Services/authentication.service'
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: [ '../style.css']
})
export class LogInComponent implements OnInit {

  form: FormGroup;
  submitted: boolean = false;
  errorMsg: string = '';
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get f() {
    return this.form.controls;
  }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    this.authenticationService.login(this.f.email.value, this.f.password.value)
      .subscribe(
        data => {
          this.router.navigate(['/home']);
        },
        error => {
          this.errorMsg = error.error || error.statusText;
          console.log(error);
        });
  }

}
