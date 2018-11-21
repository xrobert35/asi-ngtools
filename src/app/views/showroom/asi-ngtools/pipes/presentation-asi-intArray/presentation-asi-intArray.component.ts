import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'presentation-asi-intarray',
  templateUrl: './presentation-asi-intArray.component.html',
})
export class PresentationAsiIntArrayComponent {

  @HostBinding('class') class = 'flex';

  myNumber = 10;

  constructor() {
  }

}
