import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  // private API_SERVER = 'http://192.168.1.112:8080/api';
  private API_SERVER = 'https://oceanicbrews.com:8080/api';
  // private API_SERVER = 'localhost:8080/api';

  hasUser: boolean = false;

  constructor(private http: HttpClient) {}

  getCategories(): Observable<any> {
    const url = `${this.API_SERVER}/categories/menu/all`;
    return this.http.get<any>(url);
  }

  getMenus(): Observable<any> {
    const url = `${this.API_SERVER}/menus`;
    return this.http.get<any>(url);
  }

  getMenuBySlug(slug: string): Observable<any> {
    const url = `${this.API_SERVER}/menu/${slug}`;
    return this.http.get<any>(url);
  }
}
