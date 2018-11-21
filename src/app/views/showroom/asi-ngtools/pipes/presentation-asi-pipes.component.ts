import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'presentation-asi-pipes',
  templateUrl: './presentation-asi-pipes.component.html',
})
export class PresentationAsiPipes {

  @HostBinding('class') class = 'flex';

  constructor() {
  }
}
