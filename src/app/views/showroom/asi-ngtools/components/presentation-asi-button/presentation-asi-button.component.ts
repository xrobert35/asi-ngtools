import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'presentation-asi-button',
  templateUrl: './presentation-asi-button.component.html',
})
export class PresentationAsiButtonComponent {

  @HostBinding('class') class = 'flex';

}
