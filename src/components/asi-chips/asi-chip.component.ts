import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'asi-chip',
  templateUrl: 'asi-chip.component.html'
})
export class AsiChipComponent {

  @HostBinding('class') class = 'asi-component asi-chip';

  constructor() {
  }
}
