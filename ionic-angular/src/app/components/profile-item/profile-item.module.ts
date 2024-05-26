import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileItemComponent } from './profile-item.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [ProfileItemComponent],
  imports: [CommonModule, IonicModule],
  exports: [ProfileItemComponent],
  providers: [],
})
export class ProfileItemModule {}
