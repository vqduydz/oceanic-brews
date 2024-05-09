import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class PlatformService {
  constructor(private platform: Platform) {}

  currentPlatform = this.platform.platforms();
  isDesktop = this.platform.is('tablet');
}
