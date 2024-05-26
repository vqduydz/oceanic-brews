import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError, EMPTY } from 'rxjs';
import {
  catchError,
  switchMap,
  retryWhen,
  delay,
  mergeMap,
} from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  constructor(private router: Router, private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return this.handle401Error(request, next);
        } else {
          return throwError(error);
        }
      })
    );
  }

  private handle401Error(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.authService.refreshToken().pipe(
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
        return next.handle(newRequest);
      }),
      catchError((refreshError: HttpErrorResponse) => {
        console.log('Refresh token error:', refreshError);
        return throwError(refreshError);
      }),
      retryWhen((errors) =>
        errors.pipe(
          mergeMap((error, index) => {
            if (index >= 2) {
              return throwError(error); // Stop retrying after 3 attempts
            }
            console.log('Retrying after refresh token...');
            return EMPTY.pipe(delay(1000)); // Delay for 1 second before retrying
          })
        )
      )
    );
  }
}
