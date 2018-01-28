import { Injectable } from '@angular/core';

@Injectable()
export class AsiSessionStorageService {

  private sessionStorage: Storage;

  constructor() {
    this.sessionStorage = window.sessionStorage;
  }

  setItem(key: string, value: string): void {
    this.sessionStorage.setItem(key, value);
  }

  getItem(key: string): string {
    return this.sessionStorage.getItem(key);
  }

  setObjectItem(key: string, value: string): void {
    var strValue: string = null;
    if (value != null) {
      strValue = JSON.stringify(value);
    }
    this.sessionStorage.setItem(key, strValue);
  }

  getObjectItem(key: string): any {
    let strValue = this.sessionStorage.getItem(key);
    let value = null;
    if (strValue != null) {
      value = JSON.parse(strValue);
    }
    return value;
  }

  removeItem(key: string): void {
    this.sessionStorage.removeItem(key);
  }

  clear() {
    this.sessionStorage.clear();
  }
}