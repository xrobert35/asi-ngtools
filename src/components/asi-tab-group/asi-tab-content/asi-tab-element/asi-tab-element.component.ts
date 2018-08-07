import { Component, Input, TemplateRef, HostBinding } from '@angular/core';

@Component({
  selector: 'asi-tab-element',
  templateUrl: 'asi-tab-element.component.html'
})
export class AsiTabElement {

  @HostBinding('class') class = 'asi-component asi-tab-element';

  @Input() template: TemplateRef<any>;
  @Input() index: Number;

  constructor() {
  }
}
