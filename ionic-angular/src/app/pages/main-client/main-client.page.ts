import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-client',
  templateUrl: './main-client.page.html',
  styleUrls: ['./main-client.page.scss'],
})
export class MainClientPage {
  constructor(private router: Router) {}

  gotoPage(page: string) {
    this.router.navigate([page]);
  }
}
