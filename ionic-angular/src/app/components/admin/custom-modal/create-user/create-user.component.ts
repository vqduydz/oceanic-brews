import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss', '../custom-modal.component.scss'],
})
export class CreateUserComponent implements OnInit {
  @Input() form!: FormGroup;
  formGroup: any;

  constructor() {}
  ngOnInit() {
    this.formGroup = this.form;
  }
  get f() {
    return this.form.controls;
  }
}
