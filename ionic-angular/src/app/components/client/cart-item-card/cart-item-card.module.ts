import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ImageModule } from '../../image/image.module';
import { CartItemCardComponent } from './cart-item-card.component';

@NgModule({
  declarations: [CartItemCardComponent],
  imports: [CommonModule, IonicModule, ImageModule, FormsModule, RouterLink],
  exports: [CartItemCardComponent],
  providers: [],
})
export class CartItemCardModule {}
