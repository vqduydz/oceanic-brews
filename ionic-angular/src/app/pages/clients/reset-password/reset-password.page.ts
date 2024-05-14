import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/clients/auth/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss', '../auth.scss'],
})
export class ResetPasswordPage implements OnInit {
  resetPassForm = this.formBuilder.group({
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private activedRoute: ActivatedRoute
  ) {}

  ngOnInit() {}

  get f() {
    return this.resetPassForm.controls;
  }

  goTo(path: string) {
    this.router.navigate([path]);
  }
  onSubmit() {
    if (this.resetPassForm.invalid) {
      return;
    }

    this.auth
      .resetPassword(
        this.resetPassForm.value,
        this.activedRoute.snapshot.paramMap.get('token') as string
      )
      .subscribe(
        (res) => {
          console.log(res);
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
