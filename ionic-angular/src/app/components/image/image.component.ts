import { Component, Input, OnInit } from '@angular/core';
import { checkImage } from 'src/app/utils';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
})
export class ImageComponent {
  @Input() imgUrl!: string;
  @Input() desc!: string;
  @Input() css: Partial<CSSStyleDeclaration> = {};

  url!: string | null;

  ngOnInit() {
    this.getUrl();
  }
  async getUrl() {
    this.url = await checkImage(this.imgUrl);
  }
}
