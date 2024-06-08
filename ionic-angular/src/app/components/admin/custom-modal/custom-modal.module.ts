import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CreateUserModule } from './create-user/create-user.module';
import { CustomModalComponent } from './custom-modal.component';
import { EditUserModule } from './edit-user/edit-user.module';

@NgModule({
  declarations: [CustomModalComponent],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    EditUserModule,
    CreateUserModule,
  ],
  exports: [CustomModalComponent],
  providers: [],
})
export class CustomModalModule {}
