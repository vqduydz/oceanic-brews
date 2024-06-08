import { CommonModule } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
  NgModule,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CategoryCardModule } from 'src/app/components/category-card/category-card.module';
import { MenuCardModule } from 'src/app/components/client/menu-card/menu-card.module';
import { ImageModule } from 'src/app/components/image/image.module';
import { SearchbarModule } from 'src/app/components/searchbar/searchbar.module';
import { MenusPageRoutingModule } from './menus-routing.module';
import { MenusPage } from './menus.page';
import { register } from 'swiper/element/bundle';
register();

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenusPageRoutingModule,
    SearchbarModule,
    CategoryCardModule,
    MenuCardModule,
    ImageModule,
  ],
  declarations: [MenusPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class MenusPageModule {}
