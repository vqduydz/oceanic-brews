import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Menu } from 'src/app/interface';

@Component({
  selector: 'app-menu-card',
  templateUrl: './menu-card.component.html',
  styleUrls: ['./menu-card.component.scss'],
})
export class MenuCardComponent implements OnInit {
  @Input() menu!: Menu;
  @Input() imgPath!: string;
  @Output() menuCardClicked = new EventEmitter();
  constructor() {}

  ngOnInit() {}
}
