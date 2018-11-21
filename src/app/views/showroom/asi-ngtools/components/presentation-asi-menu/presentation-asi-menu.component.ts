import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'presentation-asi-menu',
  templateUrl: './presentation-asi-menu.component.html',
})
export class PresentationAsiMenuComponent {

  @HostBinding('class') class = 'flex';

  constructor() {
  }

}
