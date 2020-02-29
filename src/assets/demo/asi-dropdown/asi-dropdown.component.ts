import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'presentation-asi-dropdown',
  templateUrl: './presentation-asi-dropdown.component.html',
  host: { 'class': 'flex' }
})
export class PresentationAsiDropdownComponent {

  @ViewChild('testAsiDropdown', { static: false }) elementRefTest: ElementRef;
  public calculateWidth = false;
  public openDropdown = false;

  constructor() {
  }
}
