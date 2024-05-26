import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageComponent } from './image.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [ImageComponent],
  imports: [CommonModule, IonicModule],
  exports: [ImageComponent],
  providers: [],
})
export class ImageModule {}
