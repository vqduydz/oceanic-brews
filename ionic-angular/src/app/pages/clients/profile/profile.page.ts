import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/clients/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss', '../client.scss'],
})
export class ProfilePage implements OnInit {
  constructor(private auth: AuthService, private router: Router) {}
  logout() {
    this.auth.logout().subscribe(
      (res) => {
        this.auth.removeItemToLocalStorage('access-token');
        if (!this.auth.IsLoggedIn()) {
          this.router.navigate(['/login']);
        }
      },
      (error) => {
        const { status, ok, message } = error;
        if (status === 401 && ok === false && message === 'Unauthorized') {
          this.auth.refreshToken().subscribe(
            (res) => {
              const accessToken = res.data.accessToken;
              this.auth.setItemToLocalStorage('access-token', accessToken);
              this.auth.logout().subscribe(
                () => {
                  this.auth.removeItemToLocalStorage('access-token');
                  if (!this.auth.IsLoggedIn()) {
                    this.router.navigate(['/login']);
                  }
                },
                (error) => {
                  console.log(error);
                }
              );
            },
            (error) => {
              console.log(error);
            }
          );
        }
      }
    );
  }
  ngOnInit() {}
}
