import { DefaultControlValueAccessor } from './../common/default-control-value-accessor';
import { Component, Input, forwardRef, ElementRef, Renderer2 } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'asi-switch',
  templateUrl: 'asi-switch.component.html',
  host: { 'class': 'asi-component asi-switch' },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AsiSwitchComponent),
      multi: true
    }
  ]
})
export class AsiSwitchComponent extends DefaultControlValueAccessor {

  @Input() label : string;
  @Input() disabled = false;
  @Input() labelPosition : 'top' | 'left' | 'right' | 'bottom' | 'bottom-center' | 'top-center' = "top";

  constructor(private elementRef : ElementRef, private renderer : Renderer2) {
    super();
  }

  ngOnInit(){
    this.renderer.addClass(this.elementRef.nativeElement, "label-" + this.labelPosition);
  }

  switch() {
    this.value = !this.value;
  }
}