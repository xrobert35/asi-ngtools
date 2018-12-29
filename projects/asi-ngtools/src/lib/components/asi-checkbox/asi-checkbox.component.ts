import { DefaultControlValueAccessor } from './../common/default-control-value-accessor';
import { Component, Input, forwardRef, OnInit, Renderer2, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'asi-checkbox',
  host: { 'class': 'asi-component asi-checkbox' },
  templateUrl: 'asi-checkbox.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AsiCheckboxComponent),
      multi: true
    }
  ]
})
export class AsiCheckboxComponent extends DefaultControlValueAccessor implements OnInit {

  /** Label (is translated) */
  @Input() label: string;
  /** Label position */
  @Input() labelPosition: 'top' | 'left' | 'right' | 'bottom' | 'bottom-center' | 'top-center' = 'top';

  /** design : checkbox (square) or radio (round) */
  @Input() type: 'checkbox' | 'radio' = 'checkbox';

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {
    super();
  }

  ngOnInit() {
    this.renderer.addClass(this.elementRef.nativeElement, 'label-' + this.labelPosition);
  }

  toggleCheck() {
    this.value = !this.value;
  }
}
