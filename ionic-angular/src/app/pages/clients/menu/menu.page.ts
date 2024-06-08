import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Menu, ResCurrentUser, ResMenu, ResMenus } from 'src/app/interface';
import { AuthService } from 'src/app/services/clients/auth/auth.service';
import { HttpService } from 'src/app/services/clients/http/http.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage {
  slug: string;
  menu!: ResMenu;
  menuLoaded: boolean = false;
  favorites: number[] = [];
  liked: boolean = false;
  currentUser!: ResCurrentUser;
  suggestedMenus!: ResMenus;
  origin!: string;
  error: boolean = false;
  private subscription!: Subscription;

  constructor(
    private activedRoute: ActivatedRoute,
    private http: HttpService,
    private authService: AuthService,
    private router: Router
  ) {
    this.slug = this.activedRoute.snapshot.paramMap.get(
      'slug'
    ) as unknown as string;
    this.activedRoute.queryParams.subscribe((params) => {
      this.origin = params['origin'];
    });
  }

  ngOnInit() {
    this.subscription = this.authService.currentUser$.subscribe((user) => {
      if (user) {
        this.currentUser = user;
        this.favorites = JSON.parse(user?.user?.favorites as string);
      }
    });
    this.http.getMenuBySlug(this.slug).subscribe(
      (data) => {
        this.menu = data.data;
        this.menuLoaded = true;
        this.setLikedStatus();
        this.getCategoryWithMenuById(this.menu.menu.categoryId);
      },
      (e) => {
        this.error = true;
        this.menuLoaded = true;
      }
    );
  }

  getCategoryWithMenuById(id: number) {
    this.http.getCategoryWithMenuById(id).subscribe((d) => {
      this.suggestedMenus = {
        imgPath: d.data.imgPath,
        menus: d.data.category.menus.filter(
          (menu: Menu) => menu.id !== this.menu.menu.id
        ),
      };
    });
  }

  setLikedStatus() {
    this.liked = this.favorites.includes(this.menu.menu.id);
  }

  async toggleLike(id: number) {
    if (this.favorites.includes(id)) {
      this.favorites = this.favorites.filter((menuId) => menuId !== id);
    } else {
      this.favorites.push(id);
    }
    const payload = { favorites: JSON.stringify(this.favorites) };
    await this.authService.updateUserAndReGetCurrentUser(payload);
    this.setLikedStatus();
  }

  goToDetail(slug: string) {
    this.router.navigate(['menu', slug], {
      queryParams: { origin: this.origin },
    });
  }

  addToCart() {
    if (this.currentUser || this.menuLoaded)
      this.http
        .addToCart({
          menuId: this.menu.menu.id,
          userId: this.currentUser.user.id as number,
          quantity: 1,
        })
        .subscribe(
          () => this.http.initCartItems(this.currentUser.user.id as number),
          (e) => console.log(e)
        );
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
