import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { canActivate } from './utils/routeGuard';

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
    canActivate: [canActivate],
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
    canActivate: [canActivate],
    loadChildren: () =>
      import('./pages/clients/menu/menu.module').then((m) => m.MenuPageModule),
  },
  {
    path: 'login',
    canActivate: [canActivate],
    loadChildren: () =>
      import('./pages/clients/login/login.module').then(
        (m) => m.LoginPageModule
      ),
  },
  {
    path: 'register',
    canActivate: [canActivate],
    loadChildren: () =>
      import('./pages/clients/register/register.module').then(
        (m) => m.RegisterPageModule
      ),
  },
  {
    path: 'fogot-password',
    loadChildren: () =>
      import('./pages/clients/fogot-password/fogot-password.module').then(
        (m) => m.FogotPasswordPageModule
      ),
  },
  {
    path: 'reset-password/:token',
    loadChildren: () =>
      import('./pages/clients/reset-password/reset-password.module').then(
        (m) => m.ResetPasswordPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
