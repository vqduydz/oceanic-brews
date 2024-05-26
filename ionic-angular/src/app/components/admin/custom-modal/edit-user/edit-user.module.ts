import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditUserComponent } from './edit-user.component';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [EditUserComponent],
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
  exports: [EditUserComponent],
  providers: [],
})
export class EditUserModule {}
