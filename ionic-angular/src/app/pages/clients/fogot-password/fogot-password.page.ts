import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/clients/auth/auth.service';

@Component({
  selector: 'app-fogot-password',
  templateUrl: './fogot-password.page.html',
  styleUrls: ['./fogot-password.page.scss', '../auth.scss'],
})
export class FogotPasswordPage implements OnInit {
  loginForm = this.formBuilder.group({
    email: ['vqduydz.learn@gmail.com', [Validators.required, Validators.email]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit() {}

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
    this.auth.forgotPassword(this.loginForm.value).subscribe(
      (res) => {
        console.log(res);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
