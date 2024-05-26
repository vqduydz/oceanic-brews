import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainManagePage } from './main-manage.page';
import { ManagePage } from '../admin/manage/manage.page';

const routes: Routes = [
  {
    path: '',
    component: MainManagePage,
    children: [
      {
        path: '',
        redirectTo: 'users',
        pathMatch: 'full',
      },
      {
        path: ':pathname',
        loadChildren: () =>
          import('../admin/manage/manage.module').then(
            (m) => m.ManagePageModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainManagePageRoutingModule {}
