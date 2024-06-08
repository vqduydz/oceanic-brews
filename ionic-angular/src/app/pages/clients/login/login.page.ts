import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/clients/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss', '../auth.scss'],
})
export class LoginPage {
  loginForm = this.formBuilder.group({
    email: ['root@oceanicbrews.com', [Validators.required, Validators.email]],
    password: ['123456', Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  get f() {
    return this.loginForm.controls;
  }

  goTo(path: string) {
    this.router.navigate([path]);
  }
  login() {
    if (this.loginForm.valid) {
      const formValue = this.loginForm.value;
      this.authService.login(formValue).subscribe((data) => {
        if (data.ok) {
          const accessToken = data.data.accessToken;
          this.authService.setItemToLocalStorage('access-token', accessToken);
          this.authService.initCurrentUser();
          this.router.navigate(['/']);
        }
      });
    }
  }
}
