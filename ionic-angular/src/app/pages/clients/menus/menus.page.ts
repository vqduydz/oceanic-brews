import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { concatMap, of } from 'rxjs';
import { ResCategoriesWithMenus, ResMenus } from 'src/app/interface';
import { HttpService } from 'src/app/services/clients/http/http.service';
import Swiper from 'swiper';
import { register } from 'swiper/element/bundle';
register();

@Component({
  selector: 'app-menus',
  templateUrl: './menus.page.html',
  styleUrls: ['./menus.page.scss', '../client.scss'],
})
export class MenusPage {
  @ViewChild('swiperContainer') swiperContainer!: ElementRef;
  origin!: string;
  categories!: ResCategoriesWithMenus;
  menus!: ResMenus;
  categoriesLoaded: boolean = false;
  menusLoaded: boolean = false;

  constructor(private httpService: HttpService, private router: Router) {
    this.origin = this.router.url;
  }

  getCategories() {
    return this.httpService.getCategories().pipe(
      concatMap((data) => {
        this.categories = data.data;
        this.categoriesLoaded = true;
        return of(data);
      })
    );
  }

  getMenus() {
    return this.httpService.getMenus().pipe(
      concatMap((data) => {
        this.menus = data.data;
        this.menusLoaded = true;
        return of(data);
      })
    );
  }

  ngOnInit() {
    this.getCategories()
      .pipe(concatMap(() => this.getMenus()))
      .subscribe(() => {
        if (this.categoriesLoaded) {
          this.createSwiper();
        }
      });
  }

  goToDetail(slug: string) {
    this.router.navigate(['menu', slug], {
      queryParams: { origin: this.origin },
    });
  }

  sw = {
    breakpoints: {
      0: {
        slidesPerView: 2,
      },
      300: {
        slidesPerView: 3,
        spaceBetween: 2,
      },
      540: {
        slidesPerView: 4,
        spaceBetween: 4,
      },
      768: {
        slidesPerView: 5,
        spaceBetween: 4,
      },
    },
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    on: {
      init() {
        //
      },
    },
  };

  createSwiper() {
    if (this.swiperContainer) {
      const swiperEl = this.swiperContainer.nativeElement;
      Object.assign(swiperEl, this.sw);
    }
  }
}
