import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResMenu } from 'src/app/interface';
import { HttpService } from 'src/app/services/clients/http/http.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  slug: string;
  menu!: ResMenu;
  menuLoaded: boolean = false;
  src!: string;

  constructor(private activedRoute: ActivatedRoute, private http: HttpService) {
    this.slug = this.activedRoute.snapshot.paramMap.get(
      'slug'
    ) as unknown as string;
  }

  getMenuBySlug() {
    this.http.getMenuBySlug(this.slug).subscribe((data) => {
      const menu = data.data as ResMenu;
      this.menu = menu;
      this.menuLoaded = true;
      this.src = `${menu.imgPath}${menu.menu.imgUrl}`;
    });
  }

  ngOnInit() {
    this.getMenuBySlug();
  }
}
