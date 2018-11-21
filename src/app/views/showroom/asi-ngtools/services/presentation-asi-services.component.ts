import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'presentation-asi-services',
  templateUrl: './presentation-asi-services.component.html',
})
export class PresentationAsiServices {

  @HostBinding('class') class = 'flex';

  constructor() {
  }
}
