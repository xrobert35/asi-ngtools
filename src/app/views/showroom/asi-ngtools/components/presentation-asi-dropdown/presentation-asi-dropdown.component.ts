import { Component, ViewChild, ElementRef, HostBinding} from '@angular/core';

@Component({
  selector: 'presentation-asi-dropdown',
  templateUrl: './presentation-asi-dropdown.component.html',
})
export class PresentationAsiDropdownComponent {

  @HostBinding('class') class = 'flex';

  @ViewChild('testAsiDropdown') elementRefTest: ElementRef;
  public calculateWidth = false;
  public openDropdown = false;

  constructor() {
  }
}
