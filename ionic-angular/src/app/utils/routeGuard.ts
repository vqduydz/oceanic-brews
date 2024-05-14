import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/clients/auth/auth.service';

export const canActivate: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const url = state.url;

  if (inject(AuthService).IsLoggedIn()) {
    if (
      url.includes('/login') ||
      url.includes('/register') ||
      url.includes('/fogot-password') ||
      url.includes('/resetpassword')
    ) {
      inject(Router).navigate(['/profile']);
      return false;
    }
    return true;
  } else {
    if (
      url.includes('/login') ||
      url.includes('/register') ||
      url.includes('/fogot-password') ||
      url.includes('/resetpassword')
    ) {
      return true;
    } else {
      inject(Router).navigate(['/login']);
      return false;
    }
  }
};
