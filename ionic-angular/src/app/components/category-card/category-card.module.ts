import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryCardComponent } from './category-card.component';
import { IonicModule } from '@ionic/angular';
import { ImageModule } from '../image/image.module';

@NgModule({
  declarations: [CategoryCardComponent],
  imports: [CommonModule, IonicModule, ImageModule],
  exports: [CategoryCardComponent],
  providers: [],
})
export class CategoryCardModule {}
