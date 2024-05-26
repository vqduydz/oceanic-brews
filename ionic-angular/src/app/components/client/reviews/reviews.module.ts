import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewsComponent } from './reviews.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [ReviewsComponent],
  imports: [CommonModule, IonicModule],
  exports: [ReviewsComponent],
  providers: [],
})
export class ReviewsModule {}
