import { Component, HostBinding } from '@angular/core';
import { AsiTab } from '@asi-ngtools/lib/public_api';

@Component({
  selector: 'presentation-asi-tab',
  templateUrl: './presentation-asi-tab-group.component.html',
})
export class PresentationAsiTabGroupComponent {

  @HostBinding('class') class = 'page';

  tabChanged(asiTab: AsiTab) {}
}

