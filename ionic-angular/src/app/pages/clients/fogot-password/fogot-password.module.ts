import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FogotPasswordPageRoutingModule } from './fogot-password-routing.module';

import { FogotPasswordPage } from './fogot-password.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FogotPasswordPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [FogotPasswordPage],
})
export class FogotPasswordPageModule {}
