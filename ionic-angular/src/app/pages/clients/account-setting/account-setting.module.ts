import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AvatarModule } from 'src/app/components/avatar/avatar.module';
import { ImageModule } from 'src/app/components/image/image.module';
import { AccountSettingPageRoutingModule } from './account-setting-routing.module';
import { AccountSettingPage } from './account-setting.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccountSettingPageRoutingModule,
    AvatarModule,
    ReactiveFormsModule,
    ImageModule,
    AvatarModule,
  ],
  declarations: [AccountSettingPage],
})
export class AccountSettingPageModule {}
