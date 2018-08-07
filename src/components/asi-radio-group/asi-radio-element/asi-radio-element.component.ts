import { AsiRadioComponent } from './../asi-radio/asi-radio.component';
import { Component, Input, Output, EventEmitter, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'asi-radio-element',
  templateUrl: 'asi-radio-element.component.html'
})
export class AsiRadioElement implements OnInit {

  @HostBinding('class') class = 'asi-component asi-radio-element';

  @Input() radio: AsiRadioComponent;

  @Input() value = false;
  @Output() onValueChange = new EventEmitter<{ index: number, value: boolean }>();

  constructor() {
  }

  ngOnInit() {
    this.class += ' asi-template-' + this.radio.templatePosition;
  }

  onRadioChecked(checked: boolean) {
    this.onValueChange.emit({ index: this.radio.index, value: checked });
  }
}
