import { DefaultControlValueAccessor } from './../common/default-control-value-accessor';
import { Component, Input, forwardRef, OnInit, Renderer2, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'asi-switch',
  host: { 'class': 'asi-component asi-switch' },
  templateUrl: 'asi-switch.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AsiSwitchComponent),
      multi: true
    }
  ]
})
export class AsiSwitchComponent extends DefaultControlValueAccessor implements OnInit {

  @Input() label: string;
  @Input() disabled = false;
  @Input() labelPosition: 'top' | 'left' | 'right' | 'bottom' | 'bottom-center' | 'top-center' = 'top';

  constructor(private renderer: Renderer2,
    private elementRef: ElementRef) {
    super();
  }

  ngOnInit() {
    this.renderer.addClass(this.elementRef.nativeElement, 'label-' + this.labelPosition);
  }

  switch() {
    this.value = !this.value;
  }
}
