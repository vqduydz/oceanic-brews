import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

const requiresAuth = (url: string): boolean => {
  return !(
    url.includes('/login') ||
    url.includes('/register') ||
    url.includes('/fogot-password') ||
    url.includes('/reset-password') ||
    url.includes('/refresh-token')
  );
};

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (requiresAuth(request.url)) {
      const accessToken = this.getAccessToken();
      if (accessToken) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        return next.handle(request);
      } else {
        this.router.navigate(['/login']);
        return throwError({ error: { message: 'Access token is missing' } });
      }
    } else {
      return next.handle(request);
    }
  }
  private getAccessToken(): string | null {
    const accessToken = localStorage.getItem('access-token');
    return accessToken;
  }
}

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  constructor(private router: Router, private authService: AuthService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.sendRequest(request, next);
  }
  sendRequest(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status !== 401 || !requiresAuth(request.url)) {
          return throwError(error);
        } else
          return this.authService.refreshToken().pipe(
            catchError((refreshError: HttpErrorResponse) => {
              this.router.navigate(['/login']);
              return throwError(refreshError);
            }),
            switchMap((data: any) => {
              this.authService.setItemToLocalStorage(
                'access-token',
                data.data.accessToken
              );
              const newRequest = request.clone({
                setHeaders: {
                  Authorization: `Bearer ${data.data.accessToken}`,
                },
              });
              return this.sendRequest(newRequest, next);
            })
          );
      })
    );
  }
}
