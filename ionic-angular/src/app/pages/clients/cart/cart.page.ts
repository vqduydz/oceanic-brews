import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem, Menu, ResCurrentUser } from 'src/app/interface';
import { AuthService } from 'src/app/services/clients/auth/auth.service';
import { HttpService } from 'src/app/services/clients/http/http.service';

interface ShowCartItem extends CartItem {
  menu: Menu;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss', '../client.scss'],
})
export class CartPage implements OnInit {
  cartItems!: ShowCartItem[];
  currentUser!: ResCurrentUser;
  imgPath!: string;
  cartItemsSelect: ShowCartItem[] = [];
  total: number = 0;
  origin!: string;
  itemDelete!: ShowCartItem | null;
  // item!: TrackByFunction<ShowCartItem>;

  constructor(
    private http: HttpService,
    private authService: AuthService,
    private router: Router
  ) {
    this.origin = this.router.url;
  }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user) => {
      if (user && user.user) this.currentUser = user;
    });
    this.http.cartItems$.subscribe((data) => {
      this.cartItems = data.cartItems;
      this.imgPath = data.imgPath;
    });
  }

  changeQuantity(
    item: ShowCartItem,
    action: 'increase' | 'decrease',
    checked: boolean
  ) {
    let quantity;
    const { id } = item;
    if (action === 'increase') {
      quantity = item.quantity + 1;
    } else if (action === 'decrease') {
      quantity = item.quantity - 1;
    }
    this.updateCartItem(id, { quantity }, checked);
  }

  updateCartItem(id: number, payload: any, checked: boolean) {
    this.http.updateCartItem(id, payload).subscribe(async (d) => {
      await this.http.initCartItems(this.currentUser.user.id as number);
      if (checked) {
        const preData = this.cartItemsSelect.filter((i) => i.id !== d.data.id);
        this.cartItemsSelect = [...preData, d.data];
        this.calcTotal();
      }
    });
  }
  deleteCartItem(item: ShowCartItem) {
    this.isModalOpen = false;
    this.itemDelete = null;
    this.http.deleteCartItem(item.id).subscribe(async () => {
      await this.http.initCartItems(this.currentUser.user.id as number);
      this.cartItemsSelect = this.cartItemsSelect.filter(
        (i) => i.id !== item.id
      );
      this.calcTotal();
    });
  }
  setCartItemsSelect(e: CustomEvent, item?: ShowCartItem) {
    if (e.detail.checked && item) {
      this.cartItemsSelect = [...this.cartItemsSelect, item];
    } else {
      this.cartItemsSelect = this.cartItemsSelect.filter(
        (i) => i.id !== item?.id
      );
    }
    this.calcTotal();
  }
  setAllCartItemsSelect(e: CustomEvent) {
    if (e.detail.checked) {
      this.cartItemsSelect = this.cartItems;
    } else {
      this.cartItemsSelect = [];
    }
    this.calcTotal();
  }

  goToDetail(slug: string) {
    this.router.navigate(['menu', slug], {
      queryParams: { origin: this.origin },
    });
  }
  setChecked(item: ShowCartItem): boolean {
    return this.cartItemsSelect.some((i) => i.id === item.id);
  }

  calcTotal() {
    this.total = this.cartItemsSelect.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.menu.price * currentValue.quantity;
    }, 0);
  }

  //

  setItemDelete(item: ShowCartItem) {
    this.itemDelete = item;
  }

  isModalOpen = false;

  setOpen(isOpen: boolean) {
    if (!isOpen) {
      this.itemDelete = null;
    }
    this.isModalOpen = isOpen;
  }

  // checkout
  checkout() {
    const orderItems = this.cartItemsSelect.map((item) => ({
      menu: item.menu,
      quantity: item.quantity,
      total: item.quantity * item.menu.price,
    }));

    console.log({ orderItems });
  }
}
