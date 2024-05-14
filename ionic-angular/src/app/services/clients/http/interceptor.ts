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
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.requiresAuth(request.url)) {
      const accessToken = this.getAccessToken();
      if (accessToken) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      } else {
        console.error('Access token is missing');
        this.router.navigate(['/login']);
      }
    }
    return next.handle(request);
  }

  private requiresAuth(url: string): boolean {
    return !(
      url.includes('/login') ||
      url.includes('/register') ||
      url.includes('/fogot-password') ||
      url.includes('/reset-password') ||
      url.includes('/refresh-token')
    );
  }

  private getAccessToken(): string | null {
    const accessToken = localStorage.getItem('access-token');
    return accessToken;
  }
}

export class ResponseInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        const errorData = this.handleError(error);
        return throwError(errorData);
      })
    );
  }

  private handleError(error: HttpErrorResponse): any {
    const errorData = error.error;
    return errorData;
  }
}
