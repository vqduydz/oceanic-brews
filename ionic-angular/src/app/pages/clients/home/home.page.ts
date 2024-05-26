import { Component, OnInit } from '@angular/core';
import { ResCurrentUser } from 'src/app/interface';
import { AuthService } from 'src/app/services/clients/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss', '../client.scss'],
})
export class HomePage {
  currentUser!: ResCurrentUser;
  constructor(private authService: AuthService) {}
}
