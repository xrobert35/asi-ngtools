import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'presentation-asiconcattranslate',
  templateUrl: './presentation-asiconcattranslate.component.html',
})
export class PresentationAsiConcatTranslateComponent {

  @HostBinding('class') class = 'flex';
}
