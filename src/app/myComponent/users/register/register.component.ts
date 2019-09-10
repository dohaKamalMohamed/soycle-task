import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import {UserService} from '../../../_Services/user.service'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ '../style.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  submitted: boolean = false;
  errorMsg:string='';
  roles=['admin','shopAdmin','customer'];
  values=['admin','shopAdmin','customer'];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService:UserService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      userName: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required],
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

    this.userService.register(this.form.value)
      .subscribe(
        data => {
          this.router.navigate(['/login']);
        },
        error => {
          this.errorMsg=error.error || error.statusText;
          console.log(error);
        });
  }

}
