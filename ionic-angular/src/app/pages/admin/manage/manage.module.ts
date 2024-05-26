import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManagePageRoutingModule } from './manage-routing.module';
import { ManagePage } from './manage.page';
import { AvatarModule } from 'src/app/components/avatar/avatar.module';
import { UserManagementModule } from 'src/app/components/admin/user-management/user-management.module';
import { CategoryManagementModule } from 'src/app/components/admin/category-management/category-management.module';
import { BookingManagementModule } from 'src/app/components/admin/booking-management/booking-management.module';
import { OrderManagementModule } from 'src/app/components/admin/order-management/order-management.module';
import { MenuManagementModule } from 'src/app/components/admin/menu-management/menu-management.module';
import { CustomModalModule } from 'src/app/components/admin/custom-modal/custom-modal.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManagePageRoutingModule,
    AvatarModule,
    UserManagementModule,
    CategoryManagementModule,
    BookingManagementModule,
    OrderManagementModule,
    MenuManagementModule,
    CustomModalModule,
  ],
  declarations: [ManagePage],
})
export class ManagePageModule {}
