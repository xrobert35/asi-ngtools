import { AsiRadioButtonComponent } from './../asi-radio-button/asi-radio-button.component';
import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';

@Component({
  selector: 'asi-radio-button-element',
  templateUrl: 'asi-radio-button-element.component.html',
  host: { 'class': 'asi-component asi-radio-button-group' },
})
export class AsiRadioButtonElement {

  @HostBinding('class') class = 'asi-component asi-radio-button-element';

  @Input() radio: AsiRadioButtonComponent;
  @Input() disabled = false;

  @Input() value = false;
  @Output() onValueChange = new EventEmitter<{ index: number, value: boolean }>();

  constructor() {
  }

  onButtonClicked() {
    this.value = !this.value;
    this.onValueChange.emit({ index: this.radio.index, value: this.value });
  }
}
