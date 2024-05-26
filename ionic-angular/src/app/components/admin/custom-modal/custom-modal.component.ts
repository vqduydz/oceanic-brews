import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { HttpService } from 'src/app/services/clients/http/http.service';
import { capitalize } from 'src/app/utils';
@Component({
  selector: 'app-custom-modal',
  templateUrl: './custom-modal.component.html',
  styleUrls: ['./custom-modal.component.scss'],
})
export class CustomModalComponent implements OnInit {
  modalName!: string;
  currentData!: any;
  hasChange: boolean = false;
  currentForm!: any;
  fileImport!: File;
  formData = new FormData();

  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private formBuilder: FormBuilder,
    private http: HttpService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    const props = this.navParams.get('props') as {
      action: string;
      currentData: any;
      modalName: string;
    };
    this.modalName = capitalize(props.action + ' ' + props.modalName);
    this.currentData = props.currentData;
    if (props.modalName === 'user' && props.action === 'edit') {
      this.currentForm = this.formBuilder.group({
        id: [this.currentData.id],
        firstName: [this.currentData.firstName, [Validators.required]],
        lastName: [this.currentData.lastName, [Validators.required]],
        email: [
          this.currentData.email,
          [Validators.required, Validators.email],
        ],
        phoneNumber: [this.currentData.phoneNumber, [Validators.required]],
        active: [this.currentData.active],
        verified: [this.currentData.verified],
        role: [this.currentData.role],
        gender: [this.currentData.gender],
      });
      this.currentForm.valueChanges.subscribe((newData: any) => {
        this.hasChange = !this.areValuesEqual(this.currentData, newData);
      });
    } else if (props.modalName === 'user' && props.action === 'create') {
      this.currentForm = this.formBuilder.group({
        firstName: ['test', [Validators.required]],
        lastName: ['create', [Validators.required]],
        email: [
          'testcreate@gmail.com',
          [Validators.required, Validators.email],
        ],
        phoneNumber: ['0909090909', [Validators.required]],
        password: ['123456', Validators.required],
        confirmPassword: ['123456', Validators.required],
        active: [true],
        verified: [false],
        role: ['customer'],
        gender: ['other'],
      });
    } else if (props.modalName === 'user' && props.action === 'delete') {
      this.currentForm = this.formBuilder.group({
        id: [this.currentData.id],
        email: [this.currentData.email],
      });
    } else if (props.modalName === 'user' && props.action === 'import') {
      this.currentForm = this.formBuilder.group({});
    }
  }

  get f() {
    if (this.currentForm) return this.currentForm.controls;
  }

  areValuesEqual(a: any, b: any) {
    return Object.keys(b).every((key) => b[key] === a[key]);
  }

  submit() {
    if (this.currentForm.valid) {
      if (this.modalName === 'Create User') {
        const { firstName, lastName, ...data } = this.currentForm.value;
        const formValue = {
          firstName: capitalize(firstName as string),
          lastName: capitalize(lastName as string),
          ...data,
        };
        this.http.createUser(formValue).subscribe(
          async (d) => {
            await this.http.initAllUser();
            this.modalController.dismiss();
            this.presentToast(`✅ ${d.message}`, 'success');
          },
          (e) => this.presentToast(`⛔ ${e.error.message}`, 'danger')
        );
      } else if (this.modalName === 'Edit User') {
        const { firstName, lastName, ...data } = this.currentForm.value;
        const formValue = {
          firstName: capitalize(firstName as string),
          lastName: capitalize(lastName as string),
          ...data,
        };
        this.http.updateUser(formValue).subscribe(
          async (d) => {
            await this.http.initAllUser();
            this.modalController.dismiss();
            this.presentToast(`✅ ${d.message}`, 'success');
          },
          (e) => this.presentToast(`⛔ ${e.error.message}`, 'danger')
        );
      } else if (this.modalName === 'Delete User') {
        this.http.deleteUserById(this.currentForm.value.id).subscribe(
          async (d) => {
            await this.http.initAllUser();
            this.modalController.dismiss();
            this.presentToast(`✅ ${d.message}`, 'success');
          },
          (e) => this.presentToast(`⛔ ${e.error.message}`, 'danger')
        );
      } else if (this.modalName === 'Import User') {
        this.formData.append('file', this.fileImport);
        this.http.importUsers(this.formData).subscribe(
          async (d) => {
            await this.http.initAllUser();
            this.modalController.dismiss();
            this.presentToast(`✅ ${d.message}`, 'success');
          },
          (e) => console.log(e)
        );
      }
    } else {
      console.log('Form is invalid');
    }
  }
  cancle() {
    this.modalController.dismiss();
  }

  async presentToast(message: string, color?: string, icon?: string) {
    const toast = await this.toastController.create({
      message,
      duration: 1000,
      position: 'middle',
      color,
      cssClass: ['custom-toast'],
      icon,
    });

    await toast.present();
  }

  handleFileChange(event: any) {
    this.fileImport = event.target.files[0];
  }
}
