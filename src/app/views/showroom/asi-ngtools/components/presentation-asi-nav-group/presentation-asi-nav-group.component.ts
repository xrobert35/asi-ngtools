import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'presentation-asi-nav-group',
  templateUrl: './presentation-asi-nav-group.component.html',
})
export class PresentationAsiNavGroupComponent {

  @HostBinding('class') class = 'flex';

}

