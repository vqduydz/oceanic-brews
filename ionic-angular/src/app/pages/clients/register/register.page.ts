import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm = this.formBuilder.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', [Validators.required]],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
  });

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit() {}

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  goTo(path: string) {
    this.router.navigate([path]);
  }
  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }
    console.log(this.registerForm.value);
  }
}
