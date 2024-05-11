import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/clients/http/http.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss', '../client.scss'],
})
export class ProfilePage implements OnInit {
  constructor(private http: HttpService, private router: Router) {}
  hasUser: boolean = false;

  ngOnInit() {}
}
