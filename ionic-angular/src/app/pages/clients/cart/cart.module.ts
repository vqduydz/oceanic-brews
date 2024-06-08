import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CartItemCardModule } from 'src/app/components/client/cart-item-card/cart-item-card.module';
import { ImageModule } from 'src/app/components/image/image.module';
import { CartPageRoutingModule } from './cart-routing.module';
import { CartPage } from './cart.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CartPageRoutingModule,
    ImageModule,
    CartItemCardModule,
  ],
  declarations: [CartPage],
})
export class CartPageModule {}
