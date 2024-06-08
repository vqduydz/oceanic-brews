import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { Category, CurrentUser } from 'src/app/interface';
import { HttpService } from 'src/app/services/clients/http/http.service';
import { checkImage, dateTimeFormate, strHandling } from 'src/app/utils';

@Component({
  selector: 'app-category-management',
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.scss'],
})
export class CategoryManagementComponent {
  @Output() userEditing = new EventEmitter();
  @Output() userDeleting = new EventEmitter();
  @ViewChild(DatatableComponent) table!: DatatableComponent;
  ImageCss: Partial<CSSStyleDeclaration> = {
    height: '80px',
  };
  ColumnMode = ColumnMode;
  loading!: boolean;
  rows: any[] = [];
  categories!: Category[];
  imgPath!: string;

  constructor(private http: HttpService) {}

  ngOnInit() {
    this.loading = true;
    this.http.initAllCategories();
    this.http.allCategories$.subscribe(async (data) => {
      if (data && data.categories) {
        this.imgPath = data.imgPath;
        this.checkImageValidity(data.categories).then((categories) => {
          this.categories = categories;
          this.rows = [...this.categories] as Category[];
          this.loading = false;
        });
      }
    });
  }

  updateFilter(event: any) {
    const val = strHandling.rmVNTones(event.detail.value.toLowerCase());
    const temp = this.categories.filter((d: any) => {
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
    categories: Category[]
  ): Promise<Category[]> {
    return Promise.all(
      categories.map(async (category) => ({
        ...category,
        imgUrl: await checkImage(this.imgPath + category.imgUrl),
      }))
    );
  }
}
