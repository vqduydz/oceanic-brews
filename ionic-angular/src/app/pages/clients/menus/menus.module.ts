import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenusPageRoutingModule } from './menus-routing.module';

import { MenusPage } from './menus.page';
import { SearchbarModule } from 'src/app/components/searchbar/searchbar.module';
import { CategoryCardModule } from 'src/app/components/category-card/category-card.module';
import { MenuCardModule } from 'src/app/components/client/menu-card/menu-card.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenusPageRoutingModule,
    SearchbarModule,
    CategoryCardModule,
    MenuCardModule,
  ],
  declarations: [MenusPage],
})
export class MenusPageModule {}
