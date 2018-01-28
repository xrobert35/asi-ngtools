import { AsiRadioComponent } from './../asi-radio/asi-radio.component';
import { Component, Input, Output, EventEmitter, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'asi-radio-element',
  templateUrl: 'asi-radio-element.component.html',
  host: { 'class': 'asi-component asi-radio-element' },
})
export class AsiRadioElement {

  @Input() radio: AsiRadioComponent;

  @Input() value = false;
  @Output() onValueChange = new EventEmitter<{ index: number, value: boolean }>();

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit() {
    this.renderer.addClass(this.elementRef.nativeElement, "asi-template-" + this.radio.templatePosition);
  }

  onRadioChecked(checked: boolean) {
    this.onValueChange.emit({ index: this.radio.index, value: checked });
  }
}