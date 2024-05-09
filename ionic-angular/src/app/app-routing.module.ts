import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: 'manage',
    loadChildren: () =>
      import('./pages/admin/manage/manage.module').then(
        (m) => m.ManagePageModule
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('./pages/clients/main/main.module').then((m) => m.MainPageModule),
  },
  {
    path: 'notifications',
    loadChildren: () =>
      import('./pages/clients/notifications/notifications.module').then(
        (m) => m.NotificationsPageModule
      ),
  },
  {
    path: 'menu/:slug',
    loadChildren: () =>
      import('./pages/clients/menu/menu.module').then((m) => m.MenuPageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
