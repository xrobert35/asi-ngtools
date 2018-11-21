import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'presentation-asi-bind-html',
  templateUrl: './presentation-asi-bind-html.component.html',
})
export class PresentationAsiBindHtmlComponent {

  @HostBinding('class') class = 'flex';

  myTemplate = '<div *ngFor=\'let test of [0,1,2]\'><span> {{test}} </span></div>';

  constructor() {
  }
}
