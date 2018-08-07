import { DefaultControlValueAccessor } from './../common/default-control-value-accessor';
import { Component, Input, forwardRef, HostBinding, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'asi-checkbox',
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

  @HostBinding('class') class = 'asi-component asi-checkbox';

  @Input() label: string;
  @Input() labelPosition: 'top' | 'left' | 'right' | 'bottom' | 'bottom-center' | 'top-center' = 'top';

  @Input() type: 'checkbox' | 'radio' = 'checkbox';

  constructor() {
    super();
  }

  ngOnInit() {
    this.class += ' label-' + this.labelPosition;
  }

  toggleCheck() {
    this.value = !this.value;
  }
}
