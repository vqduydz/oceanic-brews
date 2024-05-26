import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonInput } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { CurrentUser } from 'src/app/interface';
import { AuthService } from 'src/app/services/clients/auth/auth.service';
import { checkImage } from 'src/app/utils';

@Component({
  selector: 'app-account-setting',
  templateUrl: './account-setting.page.html',
  styleUrls: ['./account-setting.page.scss'],
})
export class AccountSettingPage {
  currentUser!: CurrentUser;
  imgPath!: string;
  imgUrl!: string | null;
  updateForm!: FormGroup;
  noneEditForm!: FormGroup;
  form!: FormGroup;
  updateFormInit!: {
    label: string;
    controlName: string;
    type: 'text' | 'number' | 'tel';
  }[];
  private subscription!: Subscription;
  constructor(private authService: AuthService, private fb: FormBuilder) {}

  ngOnInit() {
    this.subscription = this.authService.currentUser$.subscribe((user) => {
      console.log('AccountSettingPage subscribe');
      if (user && user.user) {
        this.imgPath = user.imgPath;
        this.currentUser = user.user;
        (async () => {
          this.imgUrl = await checkImage(
            ((this.imgPath as string) + this.currentUser.avatar) as string
          );
        })();
        this.updateForm = this.fb.group({
          firstName: [this.currentUser.firstName, Validators.required],
          lastName: [this.currentUser.lastName, Validators.required],
          phoneNumber: [this.currentUser.phoneNumber, Validators.required],
          gender: [this.currentUser.gender, Validators.required],
        });
        this.noneEditForm = this.fb.group({
          active: [this.currentUser.active ? '✅' : '❌'],
          verified: [this.currentUser.verified ? '✅' : '❌'],
        });
        this.updateFormInit = [
          { label: 'First name', controlName: 'firstName', type: 'text' },
          { label: 'Last name', controlName: 'lastName', type: 'text' },
          { label: 'Tel.', controlName: 'phoneNumber', type: 'number' },
        ];
      }
    });
  }

  editEnable(element: IonInput) {
    //set readOnly = false

    element.getInputElement().then((element) => {
      element.readOnly = false; // Set readonly to false
      element.focus(); // Set focus
    });
  }

  onSubmit() {
    console.log(this.updateForm.value);
  }
  ngOnDestroy() {
    console.log('menu ngOnDestroy');
    this.subscription.unsubscribe();
    console.log('AccountSettingPage unsubscribe');
  }
}
