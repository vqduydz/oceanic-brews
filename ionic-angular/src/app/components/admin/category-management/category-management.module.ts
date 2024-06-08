import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CategoryManagementComponent } from './category-management.component';
import { ImageModule } from '../../image/image.module';

@NgModule({
  declarations: [CategoryManagementComponent],
  imports: [CommonModule, IonicModule, NgxDatatableModule, ImageModule],
  exports: [CategoryManagementComponent],
  providers: [],
})
export class CategoryManagementModule {}
