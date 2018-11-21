import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'presentation-asi-tab',
  templateUrl: './presentation-asi-tab-group.component.html',
})
export class PresentationAsiTabGroupComponent {

  @HostBinding('class') class = 'flex';

}

