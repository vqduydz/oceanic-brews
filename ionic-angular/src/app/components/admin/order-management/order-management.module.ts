import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { OrderManagementComponent } from './order-management.component';

@NgModule({
  declarations: [OrderManagementComponent],
  imports: [CommonModule, IonicModule],
  exports: [OrderManagementComponent],
  providers: [],
})
export class OrderManagementModule {}
