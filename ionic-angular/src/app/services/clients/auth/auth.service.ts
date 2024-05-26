import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, lastValueFrom } from 'rxjs';
import { CurrentUser, ResCurrentUser } from 'src/app/interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  API_SERVER = 'https://oceanicbrews.com:8080/api';
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  getAccessToken(): string | null {
    return localStorage.getItem('access-token');
  }

  private httpOptions = {
    withCredentials: true,
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  private httpOptionsWithAuthorized(token: string | null) {
    return {
      withCredentials: true,
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
  }

  constructor(private http: HttpClient, private router: Router) {}

  register(payload: any) {
    const url = `${this.API_SERVER}/register`;
    return this.http.post<any>(url, payload);
  }

  login(payload: any) {
    const url = `${this.API_SERVER}/login`;
    return this.http.post<any>(url, payload, this.httpOptions);
  }

  logout() {
    const url = `${this.API_SERVER}/logout`;
    return this.http.get<any>(
      url,
      this.httpOptionsWithAuthorized(this.getAccessToken())
    );
  }

  refreshToken() {
    const url = `${this.API_SERVER}/refresh-token`;
    return this.http.get<any>(url, this.httpOptions);
  }

  forgotPassword(payload: any) {
    const url = `${this.API_SERVER}/fogot-password`;
    return this.http.post<any>(url, payload, this.httpOptions);
  }

  resetPassword(payload: any, token: string) {
    const url = `${this.API_SERVER}/reset-password`;
    return this.http.patch<any>(
      url,
      payload,
      this.httpOptionsWithAuthorized(token)
    );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('access-token');
  }

  getNewAccessToken(): string {
    let newAccessToken!: string;
    this.refreshToken().subscribe((data) => {
      console.log({ data });
      if (data.ok) {
        newAccessToken = data.data.accessToken;
      }
    });
    return newAccessToken;
  }

  setItemToLocalStorage(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  removeItemToLocalStorage(key: string) {
    localStorage.removeItem(key);
  }

  getCurrentUser() {
    const url = `${this.API_SERVER}/current-user`;
    return this.http.get<any>(
      url,
      this.httpOptionsWithAuthorized(this.getAccessToken())
    );
  }

  setCurrentUser(user: any) {
    this.currentUserSubject.next(user);
  }

  selfUpdateUser(payload: any): Observable<any> {
    const url = `${this.API_SERVER}/self-update-user`;
    return this.http.patch<any>(
      url,
      payload,
      this.httpOptionsWithAuthorized(this.getAccessToken())
    );
  }

  async initCurrentUser() {
    try {
      const response = await lastValueFrom(this.getCurrentUser());
      this.currentUserSubject.next(response.data);
    } catch (error) {
      if (this.isLoggedIn()) {
        this.removeItemToLocalStorage('access-token');
        this.router.navigate(['/login']);
      }
    }
  }

  async updateUserAndReGetCurrentUser(payload: any) {
    try {
      const response = await lastValueFrom(this.selfUpdateUser(payload));
      this.currentUserSubject.next(response.data);
    } catch (error) {
      if (this.isLoggedIn()) {
        this.removeItemToLocalStorage('access-token');
        this.router.navigate(['/login']);
      }
    }
  }
}
