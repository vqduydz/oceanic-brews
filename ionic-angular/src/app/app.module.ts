import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, Router } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './services/clients/auth/auth.service';
import {
  RequestInterceptor,
  ResponseInterceptor,
} from './services/clients/http/interceptor';
import { HttpService } from './services/clients/http/http.service';

export function initializeApp(
  authService: AuthService,
  http: HttpService,
  router: Router
) {
  return () =>
    new Promise<void>(async (resolve, reject) => {
      if (authService.isLoggedIn()) {
        await authService.initCurrentUser();
        authService.currentUser$.subscribe((user) => {
          if (user && user.user) {
            http.initCartItems(user.user.id);
          }
        });
        resolve();
      } else {
        resolve();
      }
    });
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true },
    AuthService,
    HttpService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AuthService, HttpService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
