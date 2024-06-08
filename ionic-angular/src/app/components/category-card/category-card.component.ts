import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from 'src/app/interface';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss'],
})
export class CategoryCardComponent {
  @Input() category!: Category;
  @Input() imgPath!: string;
  @Output() categoryClicked = new EventEmitter();
  ImageCss: Partial<CSSStyleDeclaration> = {};

  ngOnInit() {
    this.ImageCss = {
      display: 'block',
      overflow: 'hidden',
      borderRadius: '0.5rem',
    };
  }
}
