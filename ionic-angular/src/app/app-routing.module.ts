import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { canActivate } from './services/routeGuard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'manage',
    canActivate: [canActivate],
    loadChildren: () =>
      import('./pages/main-manage/main-manage.module').then(
        (m) => m.MainManagePageModule
      ),
  },
  {
    path: '',
    canActivate: [canActivate],
    loadChildren: () =>
      import('./pages/main-client/main-client.module').then(
        (m) => m.MainClientPageModule
      ),
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
  {
    path: 'account-setting',
    loadChildren: () =>
      import('./pages/clients/account-setting/account-setting.module').then(
        (m) => m.AccountSettingPageModule
      ),
  },
  {
    path: 'main-client',
    loadChildren: () =>
      import('./pages/main-client/main-client.module').then(
        (m) => m.MainClientPageModule
      ),
  },
  {
    path: 'cart',
    canActivate: [canActivate],
    loadChildren: () =>
      import('./pages/clients/cart/cart.module').then((m) => m.CartPageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
