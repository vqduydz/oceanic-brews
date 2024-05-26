import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProfilePageRoutingModule } from './profile-routing.module';
import { ProfileItemModule } from 'src/app/components/profile-item/profile-item.module';
import { ProfilePage } from './profile.page';
import { AvatarModule } from 'src/app/components/avatar/avatar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule,
    ProfileItemModule,
    AvatarModule,
  ],
  declarations: [ProfilePage],
})
export class ProfilePageModule {}
