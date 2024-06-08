import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { Category } from 'src/app/interface';
import { HttpService } from 'src/app/services/clients/http/http.service';
import { capitalize, strHandling } from 'src/app/utils';
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
  file!: File;
  formData = new FormData();
  editCondition = true;
  categories!: Category[];

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

    if (
      props.modalName === 'menu' &&
      (props.action === 'edit' || props.action === 'create')
    ) {
      this.http.initAllCategories();
      this.http.allCategories$.subscribe(async (data) => {
        if (data && data.categories) {
          this.categories = data.categories;
          this.categories.sort((a: any, b: any) =>
            a.name.localeCompare(b.name)
          );
        }
      });
    }

    if (this.modalName === 'Edit User') {
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
    } else if (this.modalName === 'Create User') {
      this.currentForm = this.formBuilder.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        phoneNumber: ['', [Validators.required]],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
        active: [true],
        verified: [false],
        role: ['customer'],
        gender: ['other'],
      });
    } else if (this.modalName === 'Edit Category') {
      this.currentForm = this.formBuilder.group({
        id: [this.currentData.id],
        active: [this.currentData.active],
        name: [this.currentData.name, [Validators.required]],
      });
      this.currentForm.valueChanges.subscribe((newData: any) => {
        this.hasChange = !this.areValuesEqual(this.currentData, newData);
        this.seteditConditionHasImage();
      });
    } else if (this.modalName === 'Create Category') {
      this.currentForm = this.formBuilder.group({
        name: ['', [Validators.required]],
        active: [true],
      });
    } else if (this.modalName === 'Edit Menu') {
      this.currentForm = this.formBuilder.group({
        id: [this.currentData.id],
        name: [this.currentData.name, [Validators.required]],
        slug: [this.currentData.slug],
        price: [this.currentData.price, [Validators.required]],
        categoryId: [this.currentData.categoryId, [Validators.required]],
        imgUrl: [this.currentData.imgUrl],
        active: [this.currentData.active],
      });

      this.currentForm.valueChanges.subscribe((newData: any) => {
        this.hasChange = !this.areValuesEqual(this.currentData, newData);
        this.seteditConditionHasImage();
      });
    } else if (this.modalName === 'Create Menu') {
      this.currentForm = this.formBuilder.group({
        name: ['', [Validators.required]],
        slug: [''],
        price: ['', [Validators.required]],
        categoryId: ['', [Validators.required]],
        imgUrl: [''],
        active: [true],
      });
    } else if (props.action === 'delete') {
      this.currentForm = this.formBuilder.group({
        id: [this.currentData.id],
        email: [this.currentData.email],
        name: [this.currentData.name],
      });
    } else if (props.action === 'import') {
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
          ...data,
          firstName: capitalize(firstName as string),
          lastName: capitalize(lastName as string),
        };
        this.http.createUser(formValue).subscribe(
          async (d) => {
            await this.http.initAllUser();
            this.closeModal();
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
            this.closeModal();
            this.presentToast(`✅ ${d.message}`, 'success');
          },
          (e) => this.presentToast(`⛔ ${e.error.message}`, 'danger')
        );
      } else if (this.modalName === 'Delete User') {
        this.http.deleteUserById(this.currentForm.value.id).subscribe(
          async (d) => {
            await this.http.initAllUser();
            this.closeModal();
            this.presentToast(`✅ ${d.message}`, 'success');
          },
          (e) => this.presentToast(`⛔ ${e.error.message}`, 'danger')
        );
      } else if (this.modalName === 'Import User') {
        this.formData.append('file', this.file);
        this.http.importUsers(this.formData).subscribe(
          async (d) => {
            await this.http.initAllUser();
            this.closeModal();
            this.presentToast(`✅ ${d.message}`, 'success');
          },
          (e) => this.presentToast(`⛔ ${e.error.message}`, 'danger')
        );
      } else if (
        this.modalName === 'Create Category' ||
        this.modalName === 'Edit Category'
      ) {
        const { name, active } = this.currentForm.value;
        const slug = strHandling.generateSlug(name);
        const formData = new FormData();
        formData.append('image', this.file);
        formData.append('name', capitalize(name as string));
        formData.append('slug', slug);
        formData.append('active', active);
        formData.append('imgUrl', `${slug}.png`);
        if (this.modalName === 'Create Category') {
          this.http.createCategory(formData).subscribe(
            () => {
              this.http.initAllCategories();
              this.closeModal();
            },
            (e) => this.presentToast(`⛔ ${e.error.message}`, 'danger')
          );
        }
        if (this.modalName === 'Edit Category') {
          const { id } = this.currentForm.value;
          formData.append('id', id);
          this.http.updateCategory(id, formData).subscribe(
            async (d) => {
              await this.http.initAllCategories();
              this.closeModal();
              this.presentToast(`✅ ${d.message}`, 'success');
            },
            (e) => this.presentToast(`⛔ ${e.error.message}`, 'danger')
          );
        }
      } else if (this.modalName === 'Delete Category') {
        this.http.deleteCategoryById(this.currentForm.value.id).subscribe(
          async (d) => {
            await this.http.initAllCategories();
            this.closeModal();
            this.presentToast(`✅ ${d.message}`, 'success');
          },
          (e) => this.presentToast(`⛔ ${e.error.message}`, 'danger')
        );
      } else if (this.modalName === 'Import Category') {
        this.formData.append('file', this.file);
        this.http.importCategories(this.formData).subscribe(
          async (d) => {
            await this.http.initAllCategories();
            this.closeModal();
            this.presentToast(`✅ ${d.message}`, 'success');
          },
          (e) => this.presentToast(`⛔ ${e.error.message}`, 'danger')
        );
      } else if (
        this.modalName === 'Create Menu' ||
        this.modalName === 'Edit Menu'
      ) {
        const { name, active, price, categoryId } = this.currentForm.value;
        const slug = strHandling.generateSlug(name);
        const formData = new FormData();
        formData.append('image', this.file);
        formData.append('name', capitalize(name as string));
        formData.append('slug', slug);
        formData.append('price', price);
        formData.append('categoryId', categoryId);
        formData.append('active', active);
        formData.append('imgUrl', `${slug}.png`);
        if (this.modalName === 'Create Menu') {
          this.http.createMenu(formData).subscribe(
            async (d) => {
              await this.http.initMenus();
              this.closeModal();
              this.presentToast(`✅ ${d.message}`, 'success');
            },
            (e) => this.presentToast(`⛔ ${e.error.message}`, 'danger')
          );
        }
        if (this.modalName === 'Edit Menu') {
          const { id } = this.currentForm.value;
          formData.append('id', id);
          this.http.updateMenu(id, formData).subscribe(
            async (d) => {
              await this.http.initMenus();
              this.closeModal();
              this.presentToast(`✅ ${d.message}`, 'success');
            },
            (e) => this.presentToast(`⛔ ${e.error.message}`, 'danger')
          );
        }
      } else if (this.modalName === 'Delete Menu') {
        this.http.deleteMenuById(this.currentForm.value.id).subscribe(
          async (d) => {
            await this.http.initMenus();
            this.closeModal();
            this.presentToast(`✅ ${d.message}`, 'success');
          },
          (e) => this.presentToast(`⛔ ${e.error.message}`, 'danger')
        );
      } else if (this.modalName === 'Import Menu') {
        this.formData.append('file', this.file);
        this.http.importMenus(this.formData).subscribe(
          async (d) => {
            console.log({ d });
            await this.http.initMenus();
            this.closeModal();
            this.presentToast(`✅ ${d.message}`, 'success');
          },
          (e) => {
            console.log({ e });
            this.presentToast(`⛔ ${e.error.message}`, 'danger');
          }
        );
      }
    } else {
      console.log(!!this.currentForm.valid);
      console.log('Form is invalid');
    }
  }
  closeModal() {
    this.modalController.dismiss();
  }

  cancle() {
    this.closeModal();
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
    this.file = event.target.files[0];
    this.seteditConditionHasImage();
  }
  seteditConditionHasImage() {
    if (this.hasChange && !this.file) {
      this.editCondition = false;
    } else if (this.file) {
      this.editCondition = false;
    } else {
      this.editCondition = true;
    }
  }
}
