import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagementComponent } from './user-management.component';
import { IonicModule } from '@ionic/angular';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  declarations: [UserManagementComponent],
  imports: [CommonModule, IonicModule, NgxDatatableModule],
  exports: [UserManagementComponent],
  providers: [],
})
export class UserManagementModule {}
