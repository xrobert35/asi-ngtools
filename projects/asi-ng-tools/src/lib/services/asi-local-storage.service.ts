import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class AsiLocalStorageService {

  private localStorage: Storage;

  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    if (isPlatformBrowser(this.platformId)) {
      this.localStorage = window.localStorage;
    }
  }

  setItem(key: string, value: string): void {
    this.localStorage.setItem(key, value);
  }

  getItem(key: string): string {
    return this.localStorage.getItem(key);
  }

  setObjectItem(key: string, value: string): void {
    let strValue: string = null;
    if (value != null) {
      strValue = JSON.stringify(value);
    }
    this.localStorage.setItem(key, strValue);
  }

  getObjectItem(key: string): any {
    let strValue = this.localStorage.getItem(key);
    let value = null;
    if (strValue != null) {
      value = JSON.parse(strValue);
    }
    return value;
  }

  removeItem(key: string): void {
    this.localStorage.removeItem(key);
  }

  clear() {
    this.localStorage.clear();
  }
}
