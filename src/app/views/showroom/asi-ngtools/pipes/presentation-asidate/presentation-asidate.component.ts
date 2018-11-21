import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'presentation-asidate',
  templateUrl: './presentation-asidate.component.html',
})
export class PresentationAsiDateComponent {

  @HostBinding('class') class = 'flex';

  today = new Date();

  constructor() {

  }

}
