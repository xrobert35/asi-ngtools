import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'asi-tab-element',
  templateUrl: 'asi-tab-element.component.html',
  host: { 'class': 'asi-component asi-tab-element' },
})
export class AsiTabElement {

  @Input() template: TemplateRef<any>;
  @Input() index: Number;

  constructor() {
  }
}