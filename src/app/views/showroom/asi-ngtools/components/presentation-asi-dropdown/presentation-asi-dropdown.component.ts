import { Component, HostBinding} from '@angular/core';

@Component({
  selector: 'presentation-asi-dropdown',
  templateUrl: './presentation-asi-dropdown.component.html',
})
export class PresentationAsiDropdownComponent {

  @HostBinding('class') class = 'flex';

  public calculateWidth = false;
  public openDropdown = false;

  constructor() {
  }
}
