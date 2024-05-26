import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CurrentUser } from 'src/app/interface';
import { AuthService } from 'src/app/services/clients/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss', '../client.scss'],
})
export class ProfilePage {
  private subscription!: Subscription;
  currentUser!: CurrentUser;
  imgPath!: string;
  constructor(private authService: AuthService, private router: Router) {}

  profileItems = [
    {
      icon1: 'bookmark-outline',
      icon2: 'chevron-forward-outline',
      title: 'Booking',
      page: 'booking',
    },
    {
      icon1: 'reorder-three-outline',
      icon2: 'chevron-forward-outline',
      title: 'Order',
      page: 'order',
    },
    {
      icon1: 'settings-outline',
      icon2: 'chevron-forward-outline',
      title: 'Account Setting',
      page: 'account-setting',
    },
    {
      icon1: 'help-circle-outline',
      icon2: 'chevron-forward-outline',
      title: 'About',
      page: 'about',
    },
  ];

  ionViewWillEnter() {
    this.subscription = this.authService.currentUser$.subscribe((user) => {
      if (user && user.user) {
        this.currentUser = user.user;
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

  goToPage(page: string) {
    this.router.navigate([page]);
  }

  ionViewDidLeave() {
    if (this.subscription) this.subscription.unsubscribe();
  }

  onClick() {
    console.log(this.currentUser.favorites);
  }
}
