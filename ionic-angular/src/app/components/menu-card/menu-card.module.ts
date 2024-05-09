import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuCardComponent } from './menu-card.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [MenuCardComponent],
  imports: [CommonModule, IonicModule],
  exports: [MenuCardComponent],
  providers: [],
})
export class MenuCardModule {}
