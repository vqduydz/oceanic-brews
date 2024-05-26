import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MenuManagementComponent } from './menu-management.component';

@NgModule({
  declarations: [MenuManagementComponent],
  imports: [CommonModule, IonicModule],
  exports: [MenuManagementComponent],
  providers: [],
})
export class MenuManagementModule {}
