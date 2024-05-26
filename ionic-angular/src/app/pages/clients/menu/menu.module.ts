import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuPageRoutingModule } from './menu-routing.module';

import { MenuPage } from './menu.page';
import { RatingModule } from 'src/app/components/client/rating/rating.module';
import { MenuCardModule } from 'src/app/components/client/menu-card/menu-card.module';
import { ImageModule } from 'src/app/components/image/image.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuPageRoutingModule,
    RatingModule,
    MenuCardModule,
    ImageModule,
  ],
  declarations: [MenuPage],
})
export class MenuPageModule {}
