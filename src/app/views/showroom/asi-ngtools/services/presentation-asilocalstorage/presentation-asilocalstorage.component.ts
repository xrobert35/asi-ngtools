import { Component, HostBinding } from '@angular/core';

const _apiDoc = require('./asiLocalStorage-api.json');

@Component({
  selector: 'presentation-asilocalstorage',
  templateUrl: './presentation-asilocalstorage.component.html',
})
export class PresentationAsiLocalStorageComponent {

  @HostBinding('class') class = 'page';

  apiDoc = _apiDoc;

  constructor() {
  }

}
