import { DefaultControlValueAccessor } from './../common/default-control-value-accessor';
import { Component, Input, OnInit, forwardRef, Renderer2, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'asi-icon-checkbox',
  templateUrl: 'asi-icon-checkbox.component.html',
  host: { 'class': 'asi-component asi-icon-checkbox' },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AsiIconCheckboxComponent),
      multi: true
    }
  ]
})
export class AsiIconCheckboxComponent extends DefaultControlValueAccessor implements OnInit {

  @Input() label: string;
  @Input() labelPosition: 'top' | 'left' | 'right' | 'bottom' | 'bottom-center' | 'top-center' = 'top';

  @Input() disabled = false;
  @Input() icon = 'fa fa-question';
  @Input() size = '2x';

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {
    super();
  }

  ngOnInit() {
    this.renderer.addClass(this.elementRef.nativeElement, 'label-' + this.labelPosition);
  }

  toggleCheck() {
    if (!this.disabled) {
      this.value = !this.value;
    }
  }
}
