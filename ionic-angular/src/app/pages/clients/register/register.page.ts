import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/clients/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss', '../auth.scss'],
})
export class RegisterPage implements OnInit {
  registerForm = this.formBuilder.group({
    firstName: ['Client', [Validators.required]],
    lastName: ['Demo', [Validators.required]],
    email: ['client@gmail.com', [Validators.required, Validators.email]],
    phoneNumber: [909090909, [Validators.required]],
    password: ['123456', Validators.required],
    confirmPassword: ['123456', Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authServices: AuthService
  ) {}

  ngOnInit() {}
  get f() {
    return this.registerForm.controls;
  }
  goTo(path: string) {
    this.router.navigate([path]);
  }
  //
  register() {
    if (this.registerForm.valid) {
      const formValue = this.registerForm.value;
      this.authServices.register(formValue).subscribe((data) => {
        console.log(data);
      });
    }
  }
}
