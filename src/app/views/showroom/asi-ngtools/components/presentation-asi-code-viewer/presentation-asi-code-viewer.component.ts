import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'presentation-asi-code-viewer',
  templateUrl: './presentation-asi-code-viewer.component.html',
})
export class PresentationAsiCodeViewerComponent {

  @HostBinding('class') class = 'flex';

  constructor() {
  }
}
