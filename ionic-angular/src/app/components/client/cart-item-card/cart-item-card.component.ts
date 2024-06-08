import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartItem, Menu } from 'src/app/interface';
import { HttpService } from 'src/app/services/clients/http/http.service';
interface ShowCartItem extends CartItem {
  menu: Menu;
}
@Component({
  selector: 'app-cart-item-card',
  templateUrl: './cart-item-card.component.html',
  styleUrls: ['./cart-item-card.component.scss'],
})
export class CartItemCardComponent implements OnInit {
  @Input() cartItem!: ShowCartItem;
  @Input() imgPath!: string;
  @Input() userId!: number;
  @Output() cartItemCardClicked = new EventEmitter();
  constructor(private http: HttpService) {}

  ngOnInit() {}
  changeQuantity(item: ShowCartItem, action: 'increase' | 'decrease') {
    let quantity;
    const { id } = item;
    if (action === 'increase') {
      quantity = item.quantity + 1;
    } else if (action === 'decrease') {
      quantity = item.quantity - 1;
    }
    this.updateCartItem(id, { quantity });
  }

  updateCartItem(id: number, payload: any) {
    this.http
      .updateCartItem(id, payload)
      .subscribe(() => this.http.initCartItems(this.userId));
  }
  deleteCartItem(item: ShowCartItem) {
    this.http
      .deleteCartItem(item.id)
      .subscribe(() => this.http.initCartItems(this.userId));
  }
}
