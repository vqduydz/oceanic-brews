import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingComponent } from './rating.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [RatingComponent],
  imports: [CommonModule, IonicModule],
  exports: [RatingComponent],
  providers: [],
})
export class RatingModule {}
