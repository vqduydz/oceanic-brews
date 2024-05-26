import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomModalComponent } from './custom-modal.component';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { EditUserModule } from './edit-user/edit-user.module';
import { CreateUserModule } from './create-user/create-user.module';

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
