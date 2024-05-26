import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { checkImage } from 'src/app/utils';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent {
  @Input() height: number = 120;
  @Input() width: number = 120;
  @Input() border: number = 3;
  @Input() name!: string;
  @Input() imgUrl!: string;
  @ViewChild('avatar', { static: true }) avatarElement!: ElementRef;
  src: string | null = null;
  avatarCss: any;
  containerCss: any;

  ngOnInit() {
    const avatarWidth = this.width - this.border * 2;
    const avatarHeight = this.height - this.border * 2;
    this.containerCss = {
      border: `${this.border}px solid #fff`,
      'min-height': `${this.height}px`,
      'min-width': `${this.width}px`,
      'border-radius': '50%',
      position: `relative`,
    };
    this.avatarCss = {
      width: avatarWidth + 'px',
      height: avatarHeight + 'px',
      'min-height': avatarWidth + 'px',
      'min-width': avatarWidth + 'px',
      'border-radius': '50%',
      position: 'absolute',
    };
    checkImage(this.imgUrl).then((url) => {
      this.src = url;
      if (!this.src) {
        this.generateAvatar();
      }
    });
  }

  generateAvatar(): void {
    if (!this.name || !this.height || !this.width) return;
    const colors = [
      '#1abc9c',
      '#2ecc71',
      '#3498db',
      '#9b59b6',
      '#34495e',
      '#16a085',
      '#27ae60',
      '#2980b9',
      '#8e44ad',
      '#2c3e50',
      '#f1c40f',
      '#e67e22',
      '#e74c3c',
      '#95a5a6',
      '#f39c12',
      '#d35400',
      '#c0392b',
      '#bdc3c7',
      '#7f8c8d',
    ];
    const avatarWidth = this.width - this.border * 2;
    const avatarHeight = this.height - this.border * 2;
    const initials =
      this.name.split(' ')[0].charAt(0).toUpperCase() +
      this.name.split(' ')[1].charAt(0).toUpperCase();
    const charIndex = initials.charCodeAt(0) - 65;
    const colorIndex = charIndex % 19;
    this.avatarCss = {
      ...this.avatarCss,
      'background-color': colors[colorIndex],
      'font-size': avatarWidth / 2 + 'px',
      'font-weight': 700,
      color: '#FFF',
      'text-align': 'center',
      'line-height': avatarHeight + 'px',
    };
    const avatarElement = this.avatarElement.nativeElement;
    avatarElement.innerHTML = initials;
  }
}
