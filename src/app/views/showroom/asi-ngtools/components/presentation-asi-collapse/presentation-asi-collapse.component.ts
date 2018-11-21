import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'presentation-asi-collapse',
  templateUrl: './presentation-asi-collapse.component.html',
})
export class PresentationAsiCollapseComponent {

  @HostBinding('class') class = 'flex';

  constructor() {
  }
}
