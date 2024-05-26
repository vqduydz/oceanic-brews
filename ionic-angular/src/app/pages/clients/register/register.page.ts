import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/clients/auth/auth.service';
import { capitalize } from 'src/app/utils';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss', '../auth.scss'],
})
export class RegisterPage {
  registerForm = this.formBuilder.group({
    firstName: ['Client', [Validators.required]],
    lastName: ['Demo', [Validators.required]],
    email: ['client@gmail.com', [Validators.required, Validators.email]],
    phoneNumber: ['0909090909', [Validators.required]],
    password: ['123456', Validators.required],
    confirmPassword: ['123456', Validators.required],
    active: [true],
    role: ['customer'],
    gender: ['other'],
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  get f() {
    return this.registerForm.controls;
  }
  goTo(path: string) {
    this.router.navigate([path]);
  }
  //
  register() {
    if (this.registerForm.valid) {
      const { firstName, lastName, ...data } = this.registerForm.value;
      const formValue = {
        firstName: capitalize(firstName as string),
        lastName: capitalize(lastName as string),
        ...data,
      };
      this.authService.register(formValue).subscribe((data) => {
        console.log(data);
      });
    }
  }
}
