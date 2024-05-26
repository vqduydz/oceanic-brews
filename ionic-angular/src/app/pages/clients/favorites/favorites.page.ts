import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResCurrentUser, ResMenus } from 'src/app/interface';
import { AuthService } from 'src/app/services/clients/auth/auth.service';
import { HttpService } from 'src/app/services/clients/http/http.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage {
  menusLoaded: boolean = false;
  liked: boolean = false;
  currentUser!: ResCurrentUser;
  menus!: ResMenus;
  favorites: number[] = [];
  origin!: string;

  constructor(
    private http: HttpService,
    private authService: AuthService,
    private router: Router
  ) {
    this.origin = this.router.url;
  }

  ionViewWillEnter() {
    this.authService.currentUser$.subscribe((user) => {
      if (user && user.user) {
        this.currentUser = user;
        this.favorites = JSON.parse(this.currentUser.user.favorites as string);
        this.getMenus();
      }
    });
  }

  getMenus() {
    this.http.getMenusByIds(this.favorites).subscribe((data) => {
      const menus = data.data as ResMenus;
      this.menus = menus;
      this.menusLoaded = true;
    });
  }

  goToDetail(slug: string) {
    this.router.navigate(['menu', slug], {
      queryParams: { origin: this.origin },
    });
  }
  ionViewDidLeave() {
    console.log('FavoritesPage ngOnDestroy');
  }
}
