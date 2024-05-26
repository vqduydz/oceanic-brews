import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuCardComponent } from './menu-card.component';
import { IonicModule } from '@ionic/angular';
import { ImageModule } from '../../image/image.module';

@NgModule({
  declarations: [MenuCardComponent],
  imports: [CommonModule, IonicModule, ImageModule],
  exports: [MenuCardComponent],
  providers: [],
})
export class MenuCardModule {}
