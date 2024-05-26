import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-profile-item',
  templateUrl: './profile-item.component.html',
  styleUrls: ['./profile-item.component.scss'],
})
export class ProfileItemComponent {
  @Input() icon1!: string;
  @Input() icon2!: string;
  @Input() title!: string;
  @Output() profileItemClicked = new EventEmitter();
}
