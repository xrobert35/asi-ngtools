import { DefaultControlValueAccessor } from './../common/default-control-value-accessor';
import { Component, Input, forwardRef, Renderer2, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'asi-checkbox',
  templateUrl: 'asi-checkbox.component.html',
  host: { 'class': 'asi-component asi-checkbox' },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AsiCheckboxComponent),
      multi: true
    }
  ]
})
export class AsiCheckboxComponent extends DefaultControlValueAccessor {

  @Input() label : string;
  @Input() labelPosition : 'top' | 'left' | 'right' | 'bottom' | 'bottom-center' | 'top-center' = "top";
  
  @Input() type : 'checkbox' | 'radio' = "checkbox";

  constructor(private elementRef : ElementRef, private renderer : Renderer2) {
    super();
  }

  ngOnInit(){
    this.renderer.addClass(this.elementRef.nativeElement, "label-" + this.labelPosition);
  }

  toggleCheck() {
    this.value = !this.value;
  }
}