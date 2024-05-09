import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchbarComponent } from './searchbar.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [SearchbarComponent],
  imports: [CommonModule, IonicModule],
  exports: [SearchbarComponent],
})
export class SearchbarModule {}
