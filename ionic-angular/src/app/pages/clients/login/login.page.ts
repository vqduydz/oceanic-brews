import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit() {}

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  goTo(path: string) {
    this.router.navigate([path]);
  }
  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    console.log(this.loginForm.value);
  }
}
