import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainClientPage } from './main-client.page';
import { canActivate } from 'src/app/services/routeGuard';

const routes: Routes = [
  {
    path: '',
    component: MainClientPage,
    children: [
      {
        path: 'home',
        canActivate: [canActivate],
        loadChildren: () =>
          import('../clients/home/home.module').then((m) => m.HomePageModule),
      },
      {
        path: 'menus',
        canActivate: [canActivate],
        loadChildren: () =>
          import('../clients/menus/menus.module').then(
            (m) => m.MenusPageModule
          ),
      },
      {
        path: 'cart',
        canActivate: [canActivate],
        loadChildren: () =>
          import('../clients/cart/cart.module').then((m) => m.CartPageModule),
      },
      {
        path: 'orders',
        canActivate: [canActivate],
        loadChildren: () =>
          import('../clients/orders/orders.module').then(
            (m) => m.OrdersPageModule
          ),
      },
      {
        path: 'profile',
        canActivate: [canActivate],
        loadChildren: () =>
          import('../clients/profile/profile.module').then(
            (m) => m.ProfilePageModule
          ),
      },
      {
        path: 'notifications',
        canActivate: [canActivate],
        loadChildren: () =>
          import('../clients/notifications/notifications.module').then(
            (m) => m.NotificationsPageModule
          ),
      },
      {
        path: 'favorites',
        loadChildren: () =>
          import('../clients/favorites/favorites.module').then(
            (m) => m.FavoritesPageModule
          ),
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainClientPageRoutingModule {}
