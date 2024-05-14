import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/clients/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss', '../auth.scss'],
})
export class LoginPage implements OnInit {
  loginForm = this.formBuilder.group({
    email: ['vqduydz.learn@gmail.com', [Validators.required, Validators.email]],
    password: ['123456', Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authServices: AuthService
  ) {}

  ngOnInit() {}

  get f() {
    return this.loginForm.controls;
  }

  goTo(path: string) {
    this.router.navigate([path]);
  }
  onSubmit() {
    if (this.loginForm.valid) {
      const formValue = this.loginForm.value;
      this.authServices.login(formValue).subscribe((data) => {
        if (data.ok) {
          const accessToken = data.data.accessToken;
          this.authServices.setItemToLocalStorage('access-token', accessToken);
        }
        if (this.authServices.IsLoggedIn()) {
          this.router.navigate(['/']);
        }
      });
    }
  }
}
