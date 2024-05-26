import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateUserComponent } from './create-user.component';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CreateUserComponent],
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
  exports: [CreateUserComponent],
  providers: [],
})
export class CreateUserModule {}
