import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { Category, Menu } from 'src/app/interface';
import { HttpService } from 'src/app/services/clients/http/http.service';
import { checkImage, dateTimeFormate, strHandling } from 'src/app/utils';

interface ExtendedMenu extends Menu {
  category: Category;
}

@Component({
  selector: 'app-menu-management',
  templateUrl: './menu-management.component.html',
  styleUrls: ['./menu-management.component.scss'],
})
export class MenuManagementComponent {
  @Output() userEditing = new EventEmitter();
  @Output() userDeleting = new EventEmitter();
  @ViewChild(DatatableComponent) table!: DatatableComponent;
  ImageCss: Partial<CSSStyleDeclaration> = {
    height: '80px',
  };
  ColumnMode = ColumnMode;
  loading!: boolean;
  rows: any[] = [];
  menus!: ExtendedMenu[];
  imgPath!: string;
  categories!: Category[];

  constructor(private http: HttpService) {}

  ngOnInit() {
    this.loading = true;
    this.http.initMenus();
    this.http.menus$.subscribe(async (data) => {
      if (data && data.menus) {
        this.imgPath = data.imgPath;
        this.http.getCategories().subscribe(
          (d) => {
            this.categories = d.data.categories;
            this.checkImageValidity(data.menus as ExtendedMenu[]).then(
              (menus) => {
                this.menus = menus;
                this.rows = [...this.menus] as ExtendedMenu[];
                this.loading = false;
              }
            );
          },
          (e) => console.log(e)
        );
      }
    });
  }

  updateFilter(event: any) {
    const val = strHandling.rmVNTones(event.detail.value.toLowerCase());
    const temp = this.menus.filter((d: any) => {
      return (
        strHandling.rmVNTones(d.name.toLowerCase()).indexOf(val) !== -1 || !val
      );
    });
    this.rows = temp;
    this.table.offset = 0;
  }

  date(value: Date) {
    return dateTimeFormate(value);
  }

  private async checkImageValidity(
    menus: ExtendedMenu[]
  ): Promise<ExtendedMenu[]> {
    return Promise.all(
      menus.map(async (menu) => ({
        ...menu,
        categoryName: this.categories.find(
          (item) => item.id === menu.categoryId
        )?.name as string,
        imgUrl: await checkImage(this.imgPath + menu.imgUrl),
      }))
    );
  }
}
