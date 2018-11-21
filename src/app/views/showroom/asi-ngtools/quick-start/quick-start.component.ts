import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'presentation-asi-ngtools-quick-start',
  templateUrl: './quick-start.component.html'
})
export class QuickStartComponent {

  @HostBinding('class') class = 'page';

}
