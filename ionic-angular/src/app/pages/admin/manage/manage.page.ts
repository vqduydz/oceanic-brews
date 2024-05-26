import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { BookingManagementComponent } from 'src/app/components/admin/booking-management/booking-management.component';
import { CategoryManagementComponent } from 'src/app/components/admin/category-management/category-management.component';
import { CustomModalComponent } from 'src/app/components/admin/custom-modal/custom-modal.component';
import { MenuManagementComponent } from 'src/app/components/admin/menu-management/menu-management.component';
import { OrderManagementComponent } from 'src/app/components/admin/order-management/order-management.component';
import { UserManagementComponent } from 'src/app/components/admin/user-management/user-management.component';
import { CurrentUser } from 'src/app/interface';
import { AuthService } from 'src/app/services/clients/auth/auth.service';
import { HttpService } from 'src/app/services/clients/http/http.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.page.html',
  styleUrls: ['./manage.page.scss'],
})
export class ManagePage {
  public pathname!: string;
  currentUser!: CurrentUser;
  imgPath!: string;
  component!: any;
  headerTitle!: string;
  currentShow!: string;
  action!: string;
  currentData!: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private modalController: ModalController,
    private http: HttpService
  ) {}

  ngOnInit() {
    this.pathname = this.activatedRoute.snapshot.paramMap.get(
      'pathname'
    ) as string;

    switch (this.pathname) {
      case 'users':
        this.component = UserManagementComponent;
        this.headerTitle = 'User Management';
        this.currentShow = 'user';
        break;
      case 'menus':
        this.component = MenuManagementComponent;
        this.headerTitle = 'Menu Management';
        this.currentShow = 'menu';

        break;
      case 'categories':
        this.component = CategoryManagementComponent;
        this.headerTitle = 'Category Management';
        this.currentShow = 'category';

        break;
      case 'orders':
        this.component = OrderManagementComponent;
        this.headerTitle = 'Category Management';
        this.currentShow = 'order';

        break;
      case 'bookings':
        this.component = BookingManagementComponent;
        this.headerTitle = 'Category Management';
        this.currentShow = 'booking';

        break;
      default:
        this.component = UserManagementComponent;
        this.headerTitle = 'User Management';
        this.currentShow = 'user';

        break;
    }
    this.authService.currentUser$.subscribe((user) => {
      if (user && user.user) {
        this.currentUser = user.user;
        this.imgPath = user.imgPath;
      }
    });
  }

  import() {}
  create() {}
  closeModal() {}

  async presentModal(payload: any) {
    this.action = payload?.action || null;
    this.currentData = payload?.currentData || null;
    const modal = await this.modalController.create({
      component: CustomModalComponent,
      componentProps: {
        props: {
          currentData: this.currentData,
          modalName: this.currentShow,
          action: this.action,
        },
      },
      animated: true,
      cssClass: ['custom-modal', `${this.action}-${this.currentShow}`],
    });
    return await modal.present();
  }

  //toats

  isToastOpen = false;

  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }
}
