import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { roundToHalf } from 'src/app/utils';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent {
  @Input() initialRating: number = 1;
  @Input() space: number = 5;
  @Input() readonly: boolean = false;
  @Input() alignment: string = 'center';
  @Input() size: string = '2rem';
  @Output() ratingChange = new EventEmitter();

  stars: { icon: string; color: string }[] = [
    { icon: 'star-outline', color: 'medium' },
    { icon: 'star-outline', color: 'medium' },
    { icon: 'star-outline', color: 'medium' },
    { icon: 'star-outline', color: 'medium' },
    { icon: 'star-outline', color: 'medium' },
  ];

  rate(point: number) {
    if (!this.readonly) this.setRating(point);
  }

  setRating(rating: number) {
    const point = roundToHalf(rating);
    for (let i = 0; i < this.stars.length; i++) {
      if (point >= i + 1) {
        this.stars[i].icon = 'star';
        this.stars[i].color = 'warning';
      } else if (point > i) {
        this.stars[i].icon = 'star-half-outline';
        this.stars[i].color = 'warning';
      } else {
        this.stars[i].icon = 'star-outline';
        this.stars[i].color = 'medium';
      }
    }
    this.ratingChange.emit(point);
  }

  ngOnInit() {
    this.setRating(this.initialRating);
  }
}
