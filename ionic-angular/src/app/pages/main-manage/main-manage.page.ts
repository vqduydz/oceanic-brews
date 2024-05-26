import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CurrentUser } from 'src/app/interface';
import { AuthService } from 'src/app/services/clients/auth/auth.service';

@Component({
  selector: 'app-main-manage',
  templateUrl: './main-manage.page.html',
  styleUrls: ['./main-manage.page.scss'],
})
export class MainManagePage {
  currentUser!: CurrentUser;
  imgPath!: string;
  public managePages = [
    { title: 'Manage Users', url: '/manage/users', icon: 'people' },
    { title: 'Manage Categories', url: '/manage/categories', icon: 'copy' },
    { title: 'Manage Menus', url: '/manage/menus', icon: 'grid' },
    { title: 'Manage Orders', url: '/manage/orders', icon: 'reorder-three' },
    { title: 'Manage Bookings', url: '/manage/bookings', icon: 'bookmark' },
    { title: 'Logout', url: null, icon: 'log-out' },
  ];
  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit() {
    this.authService.currentUser$.subscribe((user) => {
      if (user && user.user) {
        this.currentUser = user.user as CurrentUser;
        this.imgPath = user.imgPath;
      }
    });
  }
  logout() {
    this.authService.logout().subscribe(() => {
      this.authService.removeItemToLocalStorage('access-token');
      if (!this.authService.isLoggedIn()) {
        this.router.navigate(['/login']);
      }
    });
  }
}
