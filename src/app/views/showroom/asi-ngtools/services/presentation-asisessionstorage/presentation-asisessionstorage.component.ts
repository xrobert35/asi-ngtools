import { Component, HostBinding } from '@angular/core';

const _apiDoc = require('./asiSessionStorage-api.json');

@Component({
  selector: 'presentation-asisessionstorage',
  templateUrl: './presentation-asisessionstorage.component.html',
})
export class PresentationAsiSessionStorageComponent {

  @HostBinding('class') class = 'flex';

  apiDoc = _apiDoc;

  constructor() {}

}
