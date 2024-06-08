import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, lastValueFrom } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private API_SERVER = 'https://oceanicbrews.com:8080/api';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getCategoriesWithMenu(): Observable<any> {
    const url = `${this.API_SERVER}/categories/menu/all`;
    return this.http.get<any>(url);
  }

  addFavorite(favorites: number[]): Observable<any> {
    return this.authService.selfUpdateUser({
      favorites: JSON.stringify(favorites),
    });
  }

  //user
  private allUsersSubject = new BehaviorSubject<any>(null);
  public allUsers$ = this.allUsersSubject.asObservable();

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

  //category
  private allCategoriesSubject = new BehaviorSubject<any>(null);
  public allCategories$ = this.allCategoriesSubject.asObservable();

  getCategories(): Observable<any> {
    const url = `${this.API_SERVER}/categories`;
    return this.http.get<any>(url);
  }

  async initAllCategories() {
    try {
      const response = await lastValueFrom(this.getCategories());
      this.allCategoriesSubject.next(response.data);
    } catch (error) {
      console.log({ error });
    }
  }

  createCategory(payload: any) {
    const url = `${this.API_SERVER}/category`;
    return this.http.post<any>(url, payload);
  }

  updateCategory(id: number, payload: any) {
    const url = `${this.API_SERVER}/category/${id}`;
    return this.http.patch<any>(url, payload);
  }

  deleteCategoryById(id: number) {
    const url = `${this.API_SERVER}/category/${id}`;
    return this.http.delete<any>(url);
  }

  importMenus(file: FormData) {
    const url = `${this.API_SERVER}/menus/import`;
    return this.http.post<any>(url, file);
  }

  // menu
  private menusSubject = new BehaviorSubject<any>(null);
  public menus$ = this.menusSubject.asObservable();

  getMenus(): Observable<any> {
    const url = `${this.API_SERVER}/menus`;
    return this.http.get<any>(url);
  }

  async initMenus() {
    try {
      const response = await lastValueFrom(this.getMenus());
      this.menusSubject.next(response.data);
    } catch (error) {
      console.log({ error });
    }
  }

  createMenu(payload: any) {
    const url = `${this.API_SERVER}/menu`;
    return this.http.post<any>(url, payload);
  }

  updateMenu(id: number, payload: any) {
    const url = `${this.API_SERVER}/menu/${id}`;
    return this.http.patch<any>(url, payload);
  }

  deleteMenuById(id: number) {
    const url = `${this.API_SERVER}/menu/${id}`;
    return this.http.delete<any>(url);
  }

  importCategories(file: FormData) {
    const url = `${this.API_SERVER}/menus/import`;
    return this.http.post<any>(url, file);
  }

  getMenuBySlug(slug: string): Observable<any> {
    const url = `${this.API_SERVER}/menu/${slug}`;
    return this.http.get<any>(url);
  }

  getCategoryWithMenuById(id: number): Observable<any> {
    const url = `${this.API_SERVER}/category/menu/${id}`;
    return this.http.get<any>(url);
  }

  getMenusByIds(ids: number[]): Observable<any> {
    const url = `${this.API_SERVER}/menuIds`;
    return this.http.get<any>(url, { params: { ids } });
  }

  // Cart

  private cartItemsSubject = new BehaviorSubject<any>(null);
  public cartItems$ = this.cartItemsSubject.asObservable();

  getCartItems(userId: number): Observable<any> {
    const url = `${this.API_SERVER}/cart-item/${userId}`;
    return this.http.get<any>(url);
  }

  async initCartItems(userId: number) {
    try {
      const response = await lastValueFrom(this.getCartItems(userId));
      this.cartItemsSubject.next(response.data);
    } catch (error) {
      console.log({ error });
    }
  }

  addToCart(payload: {
    userId: number;
    menuId: number;
    quantity: number;
  }): Observable<any> {
    const url = `${this.API_SERVER}/cart-item`;
    return this.http.post<any>(url, payload);
  }

  updateCartItem(id: number, payload: any) {
    const url = `${this.API_SERVER}/cart-item/${id}`;
    return this.http.patch<any>(url, payload);
  }

  deleteCartItem(id: number) {
    const url = `${this.API_SERVER}/cart-item/${id}`;
    return this.http.delete<any>(url);
  }
  // upload image

  async uploadImage(formData: FormData): Promise<any> {
    const url = `${this.API_SERVER}/uploads/image`;
    try {
      const response = await lastValueFrom(this.http.post<any>(url, formData));
      return response;
    } catch (error) {
      throw error;
    }
  }
}
