import { DefaultControlValueAccessor } from './../common/default-control-value-accessor';
import { Component, Input, forwardRef, Renderer2, ElementRef } from '@angular/core';
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
export class AsiIconCheckboxComponent extends DefaultControlValueAccessor {

  @Input() label: string;
  @Input() labelPosition: 'top' | 'left' | 'right' | 'bottom' | 'bottom-center' | 'top-center' = "top";

  @Input() disabled: boolean = false;
  @Input() icon: string = 'fa-question';
  @Input() size: string = '2x';

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
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