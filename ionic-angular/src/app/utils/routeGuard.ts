import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { HttpService } from '../services/clients/http/http.service';

export const canActivate: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const url = state.url;
  if (inject(HttpService).hasUser) {
    if (
      url.includes('/login') ||
      url.includes('/register') ||
      url.includes('/forgotpassword') ||
      url.includes('/resetpassword')
    ) {
      inject(Router).navigate(['/home']);
      return false;
    }
    return true;
  } else {
    if (
      url.includes('/login') ||
      url.includes('/register') ||
      url.includes('/forgotpassword') ||
      url.includes('/resetpassword')
    ) {
      return true;
    } else {
      inject(Router).navigate(['/login']);
      return false;
    }
  }
};
