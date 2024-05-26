import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { CurrentUser } from 'src/app/interface';
import { AuthService } from 'src/app/services/clients/auth/auth.service';
import { HttpService } from 'src/app/services/clients/http/http.service';
@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent implements OnInit {
  @Output() userEditing = new EventEmitter();
  @Output() userDeleting = new EventEmitter();
  @ViewChild(DatatableComponent) table!: DatatableComponent;
  ColumnMode = ColumnMode;
  loading!: boolean;
  rows: any[] = [];
  users!: CurrentUser[];
  currentUser!: CurrentUser;
  imgPath!: string;
  constructor(private authService: AuthService, private http: HttpService) {}

  rowSelect!: CurrentUser;
  timer!: any;

  ngOnInit() {
    this.loading = true;
    this.authService.currentUser$.subscribe((user) => {
      if (user && user.user) {
        this.currentUser = user.user;
        this.imgPath = user.imgPath;
      }
    });
    this.http.initAllUser();
    this.http.allUsers$.subscribe((data) => {
      if (data && data.users) {
        this.users = data.users;
        this.rows = [...this.users];
        this.loading = false;
      }
    });
  }

  updateFilter(event: any) {
    const val = event.detail.value.toLowerCase();
    const temp = this.users.filter((d: any) => {
      return d.email.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows = temp;
    this.table.offset = 0;
  }
}
