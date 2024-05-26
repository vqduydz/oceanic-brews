import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Menu } from 'src/app/interface';

@Component({
  selector: 'app-menu-card',
  templateUrl: './menu-card.component.html',
  styleUrls: ['./menu-card.component.scss'],
})
export class MenuCardComponent {
  @Input() menu!: Menu;
  @Input() imgPath!: string;
  @Output() menuCardClicked = new EventEmitter();
  ImageCss: Partial<CSSStyleDeclaration> = {};

  ngOnInit() {
    this.ImageCss = {
      display: 'block',
      overflow: 'hidden',
      borderRadius: '0.5rem',
    };
  }
}
