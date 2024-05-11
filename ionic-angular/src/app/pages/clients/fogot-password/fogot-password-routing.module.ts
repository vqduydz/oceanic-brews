import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FogotPasswordPage } from './fogot-password.page';

const routes: Routes = [
  {
    path: '',
    component: FogotPasswordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FogotPasswordPageRoutingModule {}
