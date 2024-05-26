import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResCategoriesWithMenus, ResMenus } from 'src/app/interface';
import { HttpService } from 'src/app/services/clients/http/http.service';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.page.html',
  styleUrls: ['./menus.page.scss', '../client.scss'],
})
export class MenusPage {
  origin!: string;

  constructor(private httpService: HttpService, private router: Router) {
    this.origin = this.router.url;
  }

  categories!: ResCategoriesWithMenus;
  menus!: ResMenus;
  categoriesLoaded: boolean = false;
  menusLoaded: boolean = false;

  getCategories() {
    this.httpService.getCategories().subscribe((data) => {
      this.categories = data.data;
      this.categoriesLoaded = true;
    });
  }

  getMenus() {
    this.httpService.getMenus().subscribe((data) => {
      this.menus = data.data;
      this.menusLoaded = true;
    });
  }

  goToDetail(slug: string) {
    this.router.navigate(['menu', slug], {
      queryParams: { origin: this.origin },
    });
  }

  ngOnInit() {
    this.getCategories();
    this.getMenus();
  }
}
