import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'presentation-asilocalstorage',
  templateUrl: './presentation-asilocalstorage.component.html',
})
export class PresentationAsiLocalStorageComponent {

  @HostBinding('class') class = 'page';

  constructor() {
  }

}
