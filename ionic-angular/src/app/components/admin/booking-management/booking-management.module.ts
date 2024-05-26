import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { BookingManagementComponent } from './booking-management.component';

@NgModule({
  declarations: [BookingManagementComponent],
  imports: [CommonModule, IonicModule],
  exports: [BookingManagementComponent],
  providers: [],
})
export class BookingManagementModule {}
