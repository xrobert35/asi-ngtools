import { Component } from '@angular/core';
import { AsiSessionStorageService } from '@asi-ngtools/lib';

@Component({
  selector: 'presentation-asisessionstorage',
  templateUrl: './presentation-asisessionstorage.component.html',
  host: { 'class': 'page' }
})
export class PresentationAsiSessionStorageComponent {

  constructor(public sessionStorage: AsiSessionStorageService) {
  }

  setItem(key: string, value: string) {
    sessionStorage.setItem(key, value);
  }

  getItem(key: string) {
    sessionStorage.getItem(key);
  }

}
