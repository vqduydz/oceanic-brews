import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainClientPageRoutingModule } from './main-client-routing.module';

import { MainClientPage } from './main-client.page';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainClientPageRoutingModule,
    HttpClientModule,
  ],
  declarations: [MainClientPage],
})
export class MainClientPageModule {}
