import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss', '../custom-modal.component.scss'],
})
export class EditUserComponent implements OnInit {
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
