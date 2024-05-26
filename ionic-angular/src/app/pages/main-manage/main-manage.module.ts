import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainManagePageRoutingModule } from './main-manage-routing.module';

import { MainManagePage } from './main-manage.page';
import { AvatarModule } from 'src/app/components/avatar/avatar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainManagePageRoutingModule,
    AvatarModule,
  ],
  declarations: [MainManagePage],
})
export class MainManagePageModule {}
