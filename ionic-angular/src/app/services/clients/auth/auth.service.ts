import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // private API_SERVER = 'http://192.168.1.112:8080/api';
  API_SERVER = 'https://oceanicbrews.com:8080/api';
  // private API_SERVER = 'localhost.com:8080/api';

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

  constructor(private http: HttpClient) {}
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

  IsLoggedIn(): boolean {
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
}
