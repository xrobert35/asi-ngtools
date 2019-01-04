import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'presentation-asi-fa-icon',
  templateUrl: './presentation-asi-fa-icon.component.html'
})
export class PresentationAsiFaIconComponent {

  @HostBinding('class') class = 'flex';

}
