import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from 'src/app/interface';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss'],
})
export class CategoryCardComponent implements OnInit {
  @Input() category!: Category;
  @Input() imgPath!: string;
  @Output() categoryClicked = new EventEmitter();
  constructor() {}

  ngOnInit() {}
}
