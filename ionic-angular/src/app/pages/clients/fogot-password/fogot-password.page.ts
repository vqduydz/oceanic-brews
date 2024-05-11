import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fogot-password',
  templateUrl: './fogot-password.page.html',
  styleUrls: ['./fogot-password.page.scss'],
})
export class FogotPasswordPage implements OnInit {
  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
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
