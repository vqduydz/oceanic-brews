import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MenuManagementComponent } from './menu-management.component';
import { ImageModule } from '../../image/image.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  declarations: [MenuManagementComponent],
  imports: [CommonModule, IonicModule, NgxDatatableModule, ImageModule],
  exports: [MenuManagementComponent],
  providers: [],
})
export class MenuManagementModule {}
