import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'presentation-asi-components',
  templateUrl: './presentation-asi-components.component.html'
})
export class PresentationAsiComponents {

  @HostBinding('class') class = 'flex';

  constructor() {
  }
}
