import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, lastValueFrom } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { ResCurrentUser } from 'src/app/interface';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private API_SERVER = 'https://oceanicbrews.com:8080/api';
  favorites: number[] = [];
  hasUser: boolean = false;

  private allUsersSubject = new BehaviorSubject<any>(null);
  public allUsers$ = this.allUsersSubject.asObservable();

  constructor(private http: HttpClient, private authService: AuthService) {}

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

  addFavorite(favorites: number[]): Observable<any> {
    return this.authService.selfUpdateUser({
      favorites: JSON.stringify(favorites),
    });
  }

  getCategoryWithMenuById(id: number): Observable<any> {
    const url = `${this.API_SERVER}/category/menu/${id}`;
    return this.http.get<any>(url);
  }

  getMenusByIds(ids: number[]): Observable<any> {
    const url = `${this.API_SERVER}/menuIds`;
    return this.http.get<any>(url, { params: { ids } });
  }

  //user

  getAllUsers() {
    const url = `${this.API_SERVER}/users`;
    return this.http.get<any>(url);
  }

  async initAllUser() {
    try {
      const response = await lastValueFrom(this.getAllUsers());
      this.allUsersSubject.next(response.data);
    } catch (error) {
      console.log({ error });
    }
  }
  createUser(payload: any) {
    const url = `${this.API_SERVER}/user`;
    return this.http.post<any>(url, payload);
  }

  updateUser(payload: any) {
    const url = `${this.API_SERVER}/update-user`;
    return this.http.patch<any>(url, payload);
  }

  deleteUserById(id: number) {
    const url = `${this.API_SERVER}/user/${id}`;
    return this.http.delete<any>(url);
  }

  importUsers(file: FormData) {
    const url = `${this.API_SERVER}/users/import`;
    return this.http.post<any>(url, file);
  }
}
