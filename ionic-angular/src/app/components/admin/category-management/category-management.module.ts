import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryManagementComponent } from './category-management.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [CategoryManagementComponent],
  imports: [CommonModule, IonicModule],
  exports: [CategoryManagementComponent],
  providers: [],
})
export class CategoryManagementModule {}
